import React, { Component, Fragment } from "react";
import { Innholdstype, Suggest, SuggestElement } from "../../../data/ApiTypes";
import { API_DOMAIN } from "../../../data/config";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import styles from "./SearchBox.module.scss";
import { ReactComponent as Search } from "../../../fontawesome/solid/search.svg";
import { objectToQueryString } from "../../../util/querystring";
import Translate from "../../app/Translate";
import { Redirect } from "react-router";

type Props = {
  innholdstype?: Innholdstype;
};

type State = {
  suggestions: { [type: string]: SuggestElement[] };
  numSuggestions: number;
  searchString: string;
  activeSuggestion: number;
  error: boolean;
  redirect: boolean;
};

const Innholdstyper: { [type: string]: JSX.Element } = {
  u: <Translate nb="Utdanninger" />,
  y: <Translate nb="Yrker" />,
};

class SearchBox extends Component<Props & AppStateProps, State> {
  state: State = {
    suggestions: {},
    numSuggestions: 0,
    searchString: "",
    activeSuggestion: -1,
    error: false,
    redirect: false,
  };

  handleChange = (event: any) => {
    const { innholdstype } = this.props;
    const value = event.target.value;

    this.setState({
      suggestions: {},
      numSuggestions: 0,
      searchString: value,
      activeSuggestion: -1,
    });
    if (value.length < 3) {
      return;
    }

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
            suggestions: group_by_innholdstype(data.response.docs),
            numSuggestions: data.response.docs.length,
            activeSuggestion: -1,
            error: false,
          });
        }
      })
      .catch(e => {
        if (this.state.searchString === value)
          this.setState({
            suggestions: {},
            numSuggestions: 0,
            activeSuggestion: -1,
            error: true,
          });
      });
  };
  handleArrowClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "ArrowUp") {
      this.setState(prevState => {
        if (
          prevState.activeSuggestion < 0 ||
          prevState.activeSuggestion >= prevState.numSuggestions
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
        if (prevState.activeSuggestion >= prevState.numSuggestions - 1)
          return { activeSuggestion: prevState.numSuggestions - 1 };
        return { activeSuggestion: prevState.activeSuggestion + 1 };
      });
      e.preventDefault();
    } else if (e.key == "Enter" && this.state.activeSuggestion !== -1) {
      const allSuggestions = Object.keys(this.state.suggestions)
        .map(innholdstype => this.state.suggestions[innholdstype])
        .reduce(
          (previousValue, currentValue) => previousValue.concat(currentValue),
          []
        );
      const suggestion = allSuggestions[this.state.activeSuggestion];
      if (suggestion) {
        this.props.appState.toggleUnoId(suggestion.uno_id);
        if (!this.props.innholdstype) {
          this.setState({ redirect: true });
        }
      }
    }
  };
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const uno_id = e.currentTarget.getAttribute("data-uno-id");
    if (uno_id) {
      this.props.appState.toggleUnoId(uno_id);
    }
    if (!this.props.innholdstype) {
      this.setState({ redirect: true });
    }
  };
  renderSuggestion = (suggestion: SuggestElement, i: number) => {
    const {
      appState: { selected_uno_id },
    } = this.props;
    const { activeSuggestion } = this.state;
    const activeClass = i == activeSuggestion ? `${styles.active} ` : "";
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
  };
  render() {
    const {
      suggestions,
      searchString,
      error,
      activeSuggestion,
      redirect,
    } = this.state;
    const {
      appState: { selected_uno_id },
    } = this.props;
    if (redirect) {
      return (
        <Redirect
          push={true}
          to={
            selected_uno_id[selected_uno_id.length - 1][0] == "u"
              ? "/utdanning"
              : "/yrke"
          }
        />
      );
    }
    const innholdstyper = Object.keys(suggestions);
    let suggestionsDom;
    if (innholdstyper.length > 0) {
      let suggestionNumber = 0;
      suggestionsDom = (
        <div>
          {innholdstyper.map(type => (
            <Fragment key={type}>
              {innholdstyper.length !== 1 ? (
                <h4>{Innholdstyper[type]}</h4>
              ) : null}
              <ul>
                {suggestions[type].map(suggestion =>
                  this.renderSuggestion(suggestion, suggestionNumber++)
                )}
              </ul>
            </Fragment>
          ))}
        </div>
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
      </div>
    );
  }
}

function group_by_innholdstype(suggestions: SuggestElement[]) {
  // In reality group by first character of uno_id
  const groups: { [type: string]: SuggestElement[] } = {};
  suggestions.forEach(suggestion => {
    const type = suggestion.uno_id[0]; // First character of uno_id (u, y or s)
    if (groups[type]) {
      groups[type].push(suggestion);
    } else {
      groups[type] = [suggestion];
    }
  });
  return groups;
}

export default with_app_state<Props>(SearchBox);
