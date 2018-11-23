import React, { Component } from "react";
import { Innholdstype, Suggest, SuggestElement } from "../../../data/ApiTypes";
import { API_DOMAIN } from "../../../data/config";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import styles from "./SearchBox.module.scss";
import { ReactComponent as Search } from "../../../fontawesome/solid/search.svg";
import { objectToQueryString } from "../../../util/querystring";

type Props = {
  innholdstype?: Innholdstype;
};

type State = {
  suggestions: SuggestElement[];
  searchString: string;
  activeSuggestion: number;
  error: boolean;
};

class SearchBox extends Component<Props & AppStateProps, State> {
  state = {
    suggestions: [] as SuggestElement[],
    searchString: "",
    activeSuggestion: -1,
    error: false,
  };

  handleChange = (event: any) => {
    const { innholdstype } = this.props;
    const value = event.target.value;

    if (value.length < 3) {
      this.setState({
        suggestions: [],
        searchString: value,
        activeSuggestion: -1,
      });
      return;
    }
    this.setState({ searchString: value, activeSuggestion: -1 });

    fetch(
      API_DOMAIN +
        "/rest/suggest?" +
        objectToQueryString({
          q: value,
          innholdstype:
            innholdstype == "utdanning"
              ? "utdanningsbeskrivelse"
              : innholdstype,
        })
    )
      .then(resp => resp.json())
      .then((data: Suggest) => {
        // Ensure searchString has not changed since the request was sent
        if (this.state.searchString === value) {
          this.setState({
            suggestions: data.response.docs,
            error: false,
          });
        }
      })
      .catch(e => {
        if (this.state.searchString === value)
          this.setState({
            suggestions: [],
            error: true,
          });
      });
  };
  handleArrowClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key == "ArrowUp") {
      this.setState(prevState => {
        if (
          prevState.activeSuggestion < 0 ||
          prevState.activeSuggestion >= prevState.suggestions.length
        )
          return { activeSuggestion: -1 };
        return {
          activeSuggestion: prevState.activeSuggestion - 1,
        };
      });
      e.preventDefault();
    } else if (e.key == "ArrowDown") {
      // DOWN
      this.setState(prevState => {
        if (prevState.activeSuggestion >= prevState.suggestions.length - 1)
          return { activeSuggestion: prevState.suggestions.length - 1 };
        return { activeSuggestion: prevState.activeSuggestion + 1 };
      });
      e.preventDefault();
    } else if (e.key == "Enter") {
      const suggestion = this.state.suggestions[this.state.activeSuggestion];
      if (suggestion) {
        this.props.appState.toggleUnoId(suggestion.uno_id);
      }
    }
  };
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const uno_id = e.currentTarget.getAttribute("data-uno-id");
    if (uno_id) {
      this.props.appState.toggleUnoId(uno_id);
    }
  };

  render() {
    const {
      appState: { selected_uno_id },
    } = this.props;
    const { suggestions, searchString, error, activeSuggestion } = this.state;
    let suggestionsDom;
    if (suggestions.length > 0) {
      suggestionsDom = (
        <ul>
          {suggestions.map((suggestion, i) => {
            const activeClass =
              i == activeSuggestion ? `${styles.active} ` : "";
            const selectedClass =
              selected_uno_id.indexOf(suggestion.uno_id) !== -1
                ? `${styles.selected}`
                : "";
            return (
              <li key={i}>
                <button
                  onClick={this.handleClick}
                  data-uno-id={suggestion.uno_id}
                  className={activeClass + " " + selectedClass}
                >
                  {suggestion.tittel}
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className={styles.searchbox}>
        <div className={styles.searchbox_container}>
          <input
            value={this.state.searchString}
            onChange={this.handleChange}
            onKeyDown={this.handleArrowClick}
            className={styles.searchbox_container_input}
            placeholder={"Søk etter " + this.props.innholdstype}
          />
          <Search />
        </div>
        {suggestionsDom}
        {/* <div
          className={
            this.state.data.length > 0 || this.state.searchString.length > 0
              ? styles.searchbox_dropdown
              : styles.searchbox_dropdown_hidden
          }
        >
          {this.state.data.length > 0 ? (
            <ul>
              {this.state.data.map((d: SuggestElement) => (
                <li
                  className={styles.searchbox_dropdown_selectable}
                  key={d.uno_id}
                  onClick={() => this.onClickItem(d.uno_id)}
                >
                  {d.tittel}
                </li>
              ))}
            </ul>
          ) : this.state.searchString.length > 0 ? (
            <ul>
              <li>{this.state.listText}</li>
            </ul>
          ) : null}
        </div> */}
      </div>
    );
  }
}

export default with_app_state<Props>(SearchBox);
