import React, { Fragment } from "react";

import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./AlphabeticOverviewPage.module.scss";

import PageChrome from "./PageChrome/PageChrome";
import { getUtdanning, getYrke, getStudium } from "../../data/main";
import { with_app_state, AppState, AppStateProps } from "../app/AppContext";
import { DataList, MainElement, Innholdstype } from "../../data/ApiTypes";
import SyncUrlState from "../app/SyncUrlState";
import CompareSelection from "./Shared/CompareSelection";
import SelectedCompares from "./Shared/SelectedCompares";

import InteresserFilter from "../filters/InteresseFilter";
import AlphabeticList from "./AlphabeticList";
import Translate from "../app/Translate";
import Api from "../app/Api";

type State = {
  data: DataList;
  interesserSelected: string[];
  redirectToHomepage: boolean;
};

type Props = RouteComponentProps<{
  innholdstype: Innholdstype;
}> &
  AppStateProps;

class AlphabeticOverviewPage extends React.Component<Props, State> {
  state = {
    data: { list: [] as MainElement[], interesser: [] as string[] },
    interesserSelected: [] as string[],
    redirectToHomepage: false,
  };
  componentDidMount() {
    const { innholdstype } = this.props.match.params;
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
        this.setState({ redirectToHomepage: true });
    }
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

  removeSelectedUnoId = () => {
    console.log("Remove uno_id: ");
  };

  render() {
    const { innholdstype } = this.props.match.params;
    const selected = this.props.appState.selected;
    const {
      data: { interesser, list },
      interesserSelected: interesserSelected,
      redirectToHomepage,
    } = this.state;
    if (redirectToHomepage) {
      return <Redirect to="/" />;
    }

    return (
      <PageChrome>
        <SyncUrlState />
        <CompareSelection innholdstype={innholdstype} />
        <div className={styles.container}>
          <h1>
            <Translate
              nb={"Alfabetisk oversikt " + innholdstype}
              nn={"Alfabetisk oversyn " + innholdstype}
            />
          </h1>

          <SelectedCompares innholdstype={innholdstype} />
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
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(AlphabeticOverviewPage);
