import React, { Fragment } from "react";

import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./AlphabeticOverviewPage.module.scss";

import PageChrome from "./PageChrome/PageChrome";
import { getUtdanning, getYrke, getStudium } from "../../data/main";
import { with_app_state, AppStateProps } from "../app/AppContext";
import { DataList, MainElement, Innholdstype } from "../../data/ApiTypes";
import SyncUrlState from "../app/SyncUrlState";

import CompareSelection from "./Shared/CompareSelection";
import SelectedCompares from "./Shared/SelectedCompares";

import AlphabeticList from "./AlphabeticList";
import Translate from "../app/Translate";
import SearchBox from "./AlphabeticComparisonPage/SearchBox";
import InterestsHeader from "./AlphabeticComparisonPage/InterestsHeader";
import { ReactComponent as BalanceScale } from "../../fontawesome/solid/balance-scale.svg";
import AlphabetFilter from "../filters/AlphabetFilter";

type State = {
  data: DataList;
  interesserSelected: string[];
  redirectToHomepage: boolean;
  selectedLetters: string[];
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
    selectedLetters: [],
  };
  componentDidMount() {
    const {
      match: {
        params: { innholdstype },
      },
    } = this.props;
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

  removeAllSelectedInterests = () => {
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

  onLetterClicked = (letter?: string, selectAll?: boolean) => {
    if (selectAll) {
      this.setState({ selectedLetters: [] });
      return;
    }
    if (letter) {
      let letters = this.state.selectedLetters as string[];
      var index = letters.indexOf(letter);
      if (index === -1) letters.push(letter);
      else letters.splice(index, 1);

      this.setState({ selectedLetters: letters });
    }
  };

  render() {
    const { innholdstype } = this.props.match.params;
    const { selected_uno_id } = this.props.appState;
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
          <div className={styles.compare_section}>
            <SelectedCompares innholdstype={innholdstype} />

            {selected_uno_id.some(uno_id => uno_id[0] === innholdstype[0]) ? (
              <div className={`${styles.compare_section_row}`}>
                <Link
                  to={"/sammenligne/" + innholdstype}
                  className={`${styles.compare_section_row_item}`}
                >
                  <BalanceScale />
                  <Translate nb="Sammenlign" />
                </Link>
              </div>
            ) : null}
          </div>

          <InterestsHeader
            innholdstype={innholdstype}
            interesser={interesser}
            selected={interesserSelected}
            toggleSelectedInterests={this.toggleSelectedInterests}
            removeAllSelected={this.removeAllSelectedInterests}
          />
          <AlphabetFilter
            list={this.getFilteredList()}
            onLetterClicked={this.onLetterClicked}
            selectedLetters={this.state.selectedLetters}
          />
          <ul className={styles.alphabetic}>
            <AlphabeticList
              list={this.getFilteredList()}
              handleItemClicked={this.handleItemClick}
              selected_uno_id={selected_uno_id}
            />
          </ul>
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(AlphabeticOverviewPage);
