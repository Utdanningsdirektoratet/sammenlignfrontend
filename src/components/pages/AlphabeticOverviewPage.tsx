import React from "react";

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
import SearchBox from "../ui/SearchBox";
import InterestsHeader from "./AlphabeticComparisonPage/InterestsHeader";
import { ReactComponent as BalanceScale } from "../../fontawesome/solid/balance-scale.svg";
import AlphabetFilter from "../filters/AlphabetFilter";
import ScrollToTop from "../utils/ScrollToTop";
import { num_compare_sizing } from "../utils/NumCompareSizing";
import { MIN_DESKTOP_PX } from "../../util/Constants";
import { isIE } from "../../util/IsIE";
import UnoIdNivaLine from "./Shared/UnoIdNivaLine";

type State = {
  data: DataList;
  redirectToHomepage: boolean;
};

type Props = RouteComponentProps<{
  innholdstype: Innholdstype;
}> &
  AppStateProps;

class AlphabeticOverviewPage extends React.Component<Props, State> {
  state = {
    data: {
      list: [] as MainElement[],
      interesser: [] as string[],
      nivåer: [] as string[],
    },
    redirectToHomepage: false,
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
    const interesserSelected = this.props.appState.selected_interests;
    const nivåerSelected = this.props.appState.selected_nivåer;
    const list = this.state.data.list;
    if (
      (!interesserSelected || interesserSelected.length === 0) &&
      (!nivåerSelected || nivåerSelected.length === 0)
    )
      return list;

    return list.filter(l => {
      if (!l.interesser && !l.utdanningstype) return false;

      let hasInterests = l.interesser
        ? l.interesser.some(i => {
            return interesserSelected.indexOf(i) > -1;
          })
        : false;
      if (
        hasInterests &&
        interesserSelected.length > 0 &&
        (!l.utdanningstype || nivåerSelected.length === 0)
      )
        return hasInterests;

      if (!hasInterests && interesserSelected.length > 0) return false;

      let hasNivåer =
        l.utdanningstype && typeof l.utdanningstype !== "string"
          ? l.utdanningstype.some((u: string) => {
              return nivåerSelected.indexOf(u) > -1;
            })
          : false;

      if (!hasNivåer && nivåerSelected.length > 0) return false;
      return true;
    });
  };
  handleItemClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.getAttribute("data-key");
    if (key) this.props.appState.toggleUnoId(key);
  };

  isInterestSelected = (interests: string[] | undefined) => {
    const interesserSelected = this.props.appState.selected_interests;
    if (!interesserSelected || interesserSelected.length === 0) return true;

    if (!interests) return false;

    return interests.some(i => {
      return interesserSelected.indexOf(i) > -1;
    });
  };

  onLetterClicked = (letter: string) => {
    var domElement = document.querySelector(
      "[data-letter=" + letter + "]"
    ) as any;
    if (domElement && domElement.offsetTop) {
      var ie = isIE();
      if (ie) {
        window.scrollTo(0, domElement.offsetTop);
      } else {
        window.scrollTo({
          top: domElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  render() {
    const { innholdstype } = this.props.match.params;
    const {
      selected_interests: interesserSelected,
      selected_uno_id,
      selected_nivåer: nivåerSelected,
    } = this.props.appState;
    const {
      data: { interesser, list, nivåer },
      redirectToHomepage,
    } = this.state;

    if (redirectToHomepage) {
      return <Redirect to="/" />;
    }

    return (
      <PageChrome>
        <SyncUrlState />
        <CompareSelection innholdstype={innholdstype} />
        <div>
          <div>
            <div className={`${styles.mobile_row}`}>
              <Link to={"/"} className={`${styles.mobile_back_btn}`}>
                <Translate nb="< Start på nytt" />
              </Link>
            </div>
            <div className={`${styles.mobile_search}`}>
              <SearchBox
                innholdstype={innholdstype}
                focusOnMount={innerWidth >= MIN_DESKTOP_PX}
              />
            </div>
          </div>
          <UnoIdNivaLine
            innholdstype={innholdstype}
            data={null}
            nivåer={this.state.data.list}
          />
          <div className={`${styles.sticky_header}`}>
            <SelectedCompares innholdstype={innholdstype} />

            {selected_uno_id.some(uno_id => uno_id[0] === innholdstype[0]) &&
            innerWidth > MIN_DESKTOP_PX ? (
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
            {innerWidth < MIN_DESKTOP_PX ? (
              <div className={`${styles.compare_section_row}`}>
                {selected_uno_id.some(
                  uno_id => uno_id[0] === innholdstype[0]
                ) ? (
                  <Link
                    to={"/sammenligne/" + innholdstype}
                    className={`${styles.mobile_sammenlign_btn} `}
                  >
                    <BalanceScale />
                    <Translate nb="Sammenlign" />
                  </Link>
                ) : (
                  <div
                    className={`${styles.mobile_sammenlign_btn} ${
                      styles.mobile_sammenlign_btn_disabled
                    }`}
                  >
                    <BalanceScale />
                    <Translate nb="Sammenlign" />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <InterestsHeader
            innholdstype={innholdstype}
            interesser={interesser}
            nivåer={nivåer}
            selectedInterests={interesserSelected}
            selectedNivåer={nivåerSelected}
            toggleSelectedInterest={this.props.appState.toggleInterest}
            toggleSelectedNivå={this.props.appState.toggleNivå}
            toggleSelectedInterests={this.props.appState.toggleInterests}
            removeAllSelectedInterests={this.props.appState.clearInterest}
          />
          <AlphabetFilter
            list={this.getFilteredList()}
            onLetterClicked={this.onLetterClicked}
          />
          <ul className={`${styles.alphabetic}`}>
            <AlphabeticList
              list={this.getFilteredList()}
              handleItemClicked={this.handleItemClick}
              selected_uno_id={selected_uno_id}
            />
          </ul>
          <ScrollToTop />
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(
  num_compare_sizing<Props & AppStateProps>(AlphabeticOverviewPage)
);
