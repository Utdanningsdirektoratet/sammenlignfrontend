import React, { Component } from "react";
import { Innholdstype, MainElement } from "../../../data/ApiTypes";
import { API_DOMAIN } from "../../../data/config";
import { with_lang_props, LanguageProps } from "../../app/TranslateContext";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import styles from "./SearchBox.module.scss";
import { ReactComponent as Search } from "../../../fontawesome/solid/search.svg";

type Props = {
  innholdstype: Innholdstype;
};

type State = {
  data: MainElement[];
  searchString: string;
  error: boolean;
  listText: string;
};

class SearchBox extends Component<
  Props & LanguageProps & AppStateProps,
  State
> {
  state = {
    data: [],
    searchString: "",
    error: false,
    listText: "",
  };

  handleChange = (event: any) => {
    const value = event.target.value;

    if (value.length < 3) {
      this.setState({
        data: [],
        searchString: value,
        listText: "Skriv inn minst tre tegn for å søke...",
      });
      return;
    }
    this.setState({ searchString: value });

    fetch(API_DOMAIN + "/rest/suggest?sprak=" + this.props.lang + "&q=" + value)
      .then(resp => resp.json())
      .then((data: MainElement[]) => {
        if (this.state.searchString === value) {
          if (data && (data as any).numfound === 0) {
            this.setState({ data: [], listText: "Ingen resultater..." });
            return;
          }

          const filterData: MainElement[] = [];
          Object.keys(data).filter((d: any, i: any, n: any) => {
            if (data[d].uno_id[0] === this.props.innholdstype[0])
              filterData.push(data[d]);
          });

          this.setState({
            data: filterData,
            error: false,
            listText: filterData.length > 0 ? "" : "Ingen resultater...",
          });
        }
      })
      .catch(e => {
        if (this.state.searchString === value)
          this.setState({
            data: [],
            error: true,
            listText: "Noe gikk galt...",
          });
      });
  };

  onClickItem = (unoId: any) => {
    this.props.appState.toggleSelection(unoId);
    this.setState({ data: [], searchString: "", listText: "" });
  };

  render() {
    return (
      <div className={styles.searchbox}>
        <div className={styles.searchbox_container}>
          <input
            value={this.state.searchString}
            onChange={this.handleChange}
            className={styles.searchbox_container_input}
            placeholder={"Søk etter " + this.props.innholdstype}
          />
          <Search />
        </div>
        <div className={styles.searchbox_dropdown}>
          {this.state.data.length > 0 ? (
            <ul>
              {this.state.data.map((d: MainElement) => (
                <li
                  className={styles.searchbox_dropdown_selectable}
                  key={d.uno_id}
                  onClick={() => this.onClickItem(d.uno_id)}
                >
                  {d.tittel}
                </li>
              ))}
            </ul>
          ) : this.state.listText !== "" &&
            this.state.searchString.length > 0 ? (
            <ul>
              <li>{this.state.listText}</li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default with_lang_props<Props>(with_app_state(SearchBox));
