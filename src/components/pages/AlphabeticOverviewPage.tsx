import React, { Fragment } from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import styles from "./AlphabeticOverviewPage.module.scss";

import PageChrome from "../app/PageChrome";
import { getUtdanning, getYrke, getStudium } from "../../data/main";
import { with_app_state, AppState, AppStateProps } from "../app/AppContext";
import { DataList, MainElement } from "../../data/ApiTypes";
import SyncUrlState from "../app/SyncUrlState";

import InteresserFilter from "../filters/InteresseFilter";
import AlphabeticList from "./AlphabeticList";
import Translate from "../app/Translate";

type State = {
  data: DataList;
  interesserSelected: string[];
};

type Props = RouteComponentProps<{
  innholdstype: "utdanning" | "yrke" | "studie";
}> &
  AppStateProps;

class AlphabeticOverviewPage extends React.Component<Props, State> {
  state = {
    data: { list: [] as MainElement[], interesser: [] as string[] },
    interesserSelected: [] as string[],
  };
  componentDidMount() {
    const { innholdstype } = this.props.match.params;
    console.log("mounted alphabeticOverviewPage");
    switch (innholdstype) {
      case "utdanning":
        getUtdanning(data => this.setState({ data }));
        break;
      case "yrke":
        getYrke(data => this.setState({ data }));
        break;
      case "studie":
        getStudium(data => this.setState({ data }));
        break;
      default:
        console.log("unknown innholdstype: ", innholdstype);
    }
  }
  componentWillUnmount() {
    console.log("closing alphabeticOverviewPage");
  }
  getFilteredList = () => {
    const interesserSelected = this.state.interesserSelected;
    const list = this.state.data.list;
    if (!interesserSelected || interesserSelected.length === 0) return list;
    return list.filter(l => {
      if (!l.interesser) return false;

      return l.interesser.some(i => {
        return interesserSelected.indexOf(i) > -1;
      });
    });
  };
  handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("data-key");
    if (key) this.props.appState.toggleSelection(key);
  };
  toggleSelectedInterests = (interest: string) => {
    const interestIndex = this.state.interesserSelected.indexOf(interest);
    if (interestIndex === -1) {
      var selected = this.state.interesserSelected;
      selected.push(interest);
      this.setState({
        interesserSelected: selected,
      });
    } else {
      var selected = this.state.interesserSelected;
      selected.splice(interestIndex, 1);
      this.setState({
        interesserSelected: selected,
      });
    }
  };

  removeSelectedInterests = () => {
    this.setState({ interesserSelected: [] });
  };

  isInterestSelected = (interests: string[] | undefined) => {
    const interesserSelected = this.state.interesserSelected;
    if (
      !this.state.interesserSelected ||
      this.state.interesserSelected.length === 0
    )
      return true;

    if (!interests) return false;

    return interests.some(i => {
      return interesserSelected.indexOf(i) > -1;
    });
  };

  render() {
    const { innholdstype } = this.props.match.params;
    const selected = this.props.appState.selected;
    const {
      data: { interesser, list },
      interesserSelected: interesserSelected,
    } = this.state;

    let selectedNodes = null;
    if (selected && selected.length > 0) {
      selectedNodes = (
        <>
          <Link
            to={"/sammenligne/" + innholdstype}
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            Sammenlign her
          </Link>
          <ul>
            {selected.map(s => (
              <li>{s}</li>
            ))}
          </ul>
        </>
      );
    }

    return (
      <PageChrome>
        <SyncUrlState />
        <h1>
          <Translate
            nb={"Alfabetisk oversikt " + innholdstype}
            nn={"Alfabetisk oversyn " + innholdstype}
          />
        </h1>
        {selectedNodes}
        {interesser && (
          <div>
            <InteresserFilter
              interesser={interesser}
              selected={interesserSelected}
              toggleSelected={this.toggleSelectedInterests}
              removeSelected={this.removeSelectedInterests}
            />
          </div>
        )}
        <ul className={styles.alphabetic}>
          <AlphabeticList
            list={this.getFilteredList()}
            handleItemClicked={this.handleItemClick}
            selected={selected}
          />
        </ul>
      </PageChrome>
    );
  }
}

export default with_app_state(AlphabeticOverviewPage);
