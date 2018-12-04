import React, { Component, Fragment } from "react";
import { Innholdstype, Suggest, SuggestElement } from "../../../data/ApiTypes";
import { API_DOMAIN } from "../../../data/config";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import styles from "./SearchBox.module.scss";
import { ReactComponent as Search } from "./SearchIcon.svg";
import { ReactComponent as Times } from "../../../fontawesome/solid/times.svg";
import { objectToQueryString } from "../../../util/querystring";
import Translate, { TranslateString } from "../../app/Translate";
import { Redirect } from "react-router";
import ClickOutsideListener from "../../utils/ClickOutsideListner";

type Props = {
  innholdstype?: Innholdstype;
  className?: string;
  placeholder?: string;
  onUnoIdClick?: (uno_id: string) => void;
};

type State = {
  suggestions: { [type: string]: SuggestElement[] };
  numSuggestions: number;
  searchString: string;
  activeSuggestion: number;
  isFocused: boolean;
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
    isFocused: false,
    error: false,
    redirect: false,
  };
  inputRef = React.createRef<HTMLInputElement>();

  resetState = (value: string) => {
    this.setState({
      suggestions: {},
      numSuggestions: 0,
      searchString: value,
      activeSuggestion: -1,
    });
  };

  handleChange = (event: any) => {
    const { innholdstype } = this.props;
    const value = event.target.value;

    this.resetState(value);

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
    } else if (
      (e.key == "Enter" || e.key == " ") &&
      this.state.activeSuggestion !== -1
    ) {
      const allSuggestions = Object.keys(this.state.suggestions)
        .map(innholdstype => this.state.suggestions[innholdstype])
        .reduce(
          (previousValue, currentValue) => previousValue.concat(currentValue),
          []
        );
      const suggestion = allSuggestions[this.state.activeSuggestion];
      if (suggestion) {
        this.handleUnoIdClick(suggestion.uno_id);
      }
    } else if (e.key === "Escape") {
      this.setState({ suggestions: {}, searchString: "" });
      if (this.inputRef.current) this.inputRef.current.blur();
    } else {
      return;
    }
    e.preventDefault();
  };
  handleUnoIdClick = (uno_id: string) => {
    console.log("clicked");
    if (uno_id) {
      if (this.props.onUnoIdClick) {
        this.props.onUnoIdClick(uno_id);
        return;
      }
      this.props.appState.toggleUnoId(uno_id);
    }
    this.setState({
      redirect: !this.props.innholdstype,
    });
  };
  handleFocus = () => {
    this.setState({
      isFocused: true,
      suggestions: {},
    });
  };

  unMounted = false;
  componentWillUnmount = () => {
    this.unMounted = true;
  };

  handleBlur = () => {
    setTimeout(() => {
      if (!this.unMounted)
        this.setState({
          isFocused: false,
          searchString: "", // TODO: remove after user testing
        });
    }, 100);
  };
  renderSuggestion = (suggestion: SuggestElement, i: number) => {
    const {
      appState: { selected_uno_id },
    } = this.props;
    const { activeSuggestion } = this.state;
    const activeClass = i == activeSuggestion ? `${styles.active}` : "";
    const selectedClass =
      selected_uno_id.indexOf(suggestion.uno_id) !== -1
        ? `${styles.selected}`
        : "";
    return (
      <li key={i}>
        <button
          onClick={() => this.handleUnoIdClick(suggestion.uno_id)}
          data-uno-id={suggestion.uno_id}
          className={activeClass + " " + selectedClass}
        >
          {suggestion.tittel}
        </button>
      </li>
    );
  };
  render() {
    const { suggestions, searchString, isFocused, redirect } = this.state;
    const {
      appState: { selected_uno_id },
      innholdstype,
      className,
      placeholder,
    } = this.props;
    if (redirect) {
      return (
        <Redirect
          push={true}
          to={
            selected_uno_id[selected_uno_id.length - 1][0] == "u"
              ? "sammenligne/utdanning"
              : "sammenligne/yrke"
          }
        />
      );
    }
    const innholdstyper = Object.keys(suggestions);

    let suggestionNumber = 0;
    const suggestionsDom = (
      <div
        className={`${styles.searchbox_dropdown} ${
          isFocused && searchString.length > 2
            ? ""
            : styles.searchbox_dropdown_hide
        }`}
      >
        <div className={`${styles.searchbox_dropdown_help}`}>
          {innholdstyper.length > 0 ? (
            <Translate
              nb="KLIKK PÅ NAVN FOR Å LEGGE TIL %innholdstype%"
              replacements={{
                "%innholdstype%": (innholdstype || "") as string,
              }}
            />
          ) : (
            <Translate nb="Ingen resultater" />
          )}
        </div>
        {innholdstyper.map(type => (
          <Fragment key={type}>
            {!innholdstype ? (
              <h4 className={`${styles.searchbox_dropdown_header}`}>
                {Innholdstyper[type]}
              </h4>
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

    return (
      <ClickOutsideListener
        className={`${styles.searchbox} ${className || ""}`}
        onOutsideClick={this.handleBlur}
      >
        <div className={`${styles.searchbox_container}`}>
          <input
            value={searchString}
            onChange={this.handleChange}
            onKeyDown={this.handleArrowClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            className={`${styles.searchbox_container_input}`}
            ref={this.inputRef}
            placeholder={
              placeholder
                ? placeholder
                : this.props.innholdstype
                ? TranslateString("Søk etter %hva%", {
                    "%hva%": this.props.innholdstype as string,
                  })
                : TranslateString("Søk etter utdanning eller yrke")
            }
          />
          {searchString !== "" ? (
            <Times onClick={() => this.resetState("")} />
          ) : (
            <Search />
          )}
        </div>
        {suggestionsDom}
      </ClickOutsideListener>
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
