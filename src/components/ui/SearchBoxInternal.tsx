import React, { Component, Fragment } from "react";
import { Innholdstype, Suggest, SuggestElement } from "../../data/ApiTypes";
import { API_DOMAIN } from "../../config";
import styles from "./SearchBox.module.scss";
import { ReactComponent as Search } from "./SearchIcon.svg";
import { ReactComponent as Times } from "../../fontawesome/solid/times.svg";
import { objectToQueryString } from "../../util/querystring";
import Translate, { TranslateString } from "../app/Translate";
import ClickOutsideListener from "../utils/ClickOutsideListner";

type Props = {
  innholdstype?: Innholdstype;
  className?: string;
  placeholder?: string;
  onUnoIdClick?: (uno_id: string) => void;
  inlineSuggestions?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  hideUnoIds?: string[];
};

type State = {
  suggestions: { [type: string]: SuggestElement[] };
  numSuggestions: number;
  searchString: string;
  activeSuggestion: number;
  error: boolean;
};

const Innholdstyper: { [type: string]: JSX.Element } = {
  u: <Translate nb="Utdanninger" />,
  y: <Translate nb="Yrker" />,
};

class SearchBoxInternal extends Component<Props, State> {
  state: State = {
    suggestions: {},
    numSuggestions: 0,
    searchString: "",
    activeSuggestion: -1,
    error: false,
  };

  resetState = (value: string) => {
    const state: State = {
      searchString: value,
      activeSuggestion: -1,
    } as any;
    if (value.length < 3) {
      state.numSuggestions = 0;
      state.suggestions = {};
    }
    this.setState(state);
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
          // Do not show suggestions that has already been selected
          let suggestions = data.response.docs;
          if (this.props.hideUnoIds) {
            const hide = this.props.hideUnoIds;
            suggestions = data.response.docs.filter(s => {
              return !hide.some(u => u === s.uno_id);
            });
          }
          this.setState({
            suggestions: group_by_innholdstype(suggestions),
            numSuggestions: suggestions.length,
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
      (e.key == "Enter" && this.state.numSuggestions > 0) ||
      (e.key == " " && this.state.activeSuggestion !== -1)
    ) {
      const activeSuggestion =
        this.state.activeSuggestion !== -1 ? this.state.activeSuggestion : 0;
      const allSuggestions = Object.keys(this.state.suggestions)
        .map(innholdstype => this.state.suggestions[innholdstype])
        .reduce(
          (previousValue, currentValue) => previousValue.concat(currentValue),
          []
        );
      const suggestion = allSuggestions[activeSuggestion];
      if (suggestion) {
        this.handleUnoIdClick(suggestion.uno_id);
      }
      this.setState({ suggestions: {}, searchString: "" });
    } else if (e.key === "Escape") {
      this.setState({ suggestions: {}, searchString: "" });
    } else {
      return;
    }
    e.preventDefault();
  };
  handleUnoIdClick = (uno_id: string) => {
    this.setState({
      searchString: "",
      suggestions: {},
    });
    if (uno_id) {
      if (this.props.onUnoIdClick) {
        this.props.onUnoIdClick(uno_id);
        return;
      }
    }
  };
  handleFocus = () => {
    this.setState({
      suggestions: {},
    });
  };

  handleBlur = () => {
    this.setState({
      searchString: "", // TODO: remove after user testing
    });
  };
  renderSuggestion = (suggestion: SuggestElement, i: number) => {
    const { activeSuggestion } = this.state;
    const activeClass = i == activeSuggestion ? `${styles.active}` : "";
    return (
      <li key={i}>
        <button
          onClick={() => this.handleUnoIdClick(suggestion.uno_id)}
          onMouseDown={(e: any) => e.preventDefault()}
          data-uno-id={suggestion.uno_id}
          className={activeClass}
        >
          {suggestion.tittel}
        </button>
      </li>
    );
  };
  render() {
    const { suggestions, searchString } = this.state;
    const {
      innholdstype,
      className,
      placeholder,
      inlineSuggestions,
      inputRef,
    } = this.props;

    const innholdstyper = Object.keys(suggestions);

    let suggestionNumber = 0;
    let suggestionsDom = null;
    if (searchString.length > 2) {
      suggestionsDom = (
        <div
          className={`${styles.searchbox_dropdown} ${
            inlineSuggestions ? styles.searchbox_dropdown_inline : ""
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
    }
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
            ref={inputRef}
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

export default SearchBoxInternal;
