import React, { Component } from "react";
// import Plot from "react-plotly.js";
import { RouteComponentProps } from "react-router";

import styles from "./ComparisonPage.module.scss";

import SyncUrlState from "../app/SyncUrlState";
import PageChrome from "./PageChrome/PageChrome";

// import { getData } from "../../data/data";
import { with_app_state, AppStateProps } from "../app/AppContext";
import comparisonsConfig from "../comparisonsConfig";
import { API_DOMAIN } from "../../data/config";
import { objectToQueryString } from "../../util/querystring";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import CompareSelection from "./Shared/CompareSelection";
import SelectedCompares from "./Shared/SelectedCompares";
import { Innholdstype } from "../../data/ApiTypes";
import Translate from "../app/Translate";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../fontawesome/solid/arrow-left.svg";
import ComparisonHeader from "../visualizations/Shared/ComparisonHeader";
import IsolatedComparisonPart from "./ComparisonPage/IsolatedComparisonPart";

type State = { [dataKey: string]: { [uno_id: string]: any } | false };
type Props = RouteComponentProps<{ innholdstype: Innholdstype }> &
  AppStateProps;

class ComparisonPage extends Component<Props, State> {
  state: State = {};
  componentDidMount() {
    this.fetchData();
  }
  static getDerivedStateFromProps(props: any, state: State) {
    const oldSelected: string[] = state.selected_uno_id as any;
    const newSelected: string[] = props.appState.selected_uno_id;
    if (!oldSelected) return { selected_uno_id: newSelected };
    if (newSelected !== oldSelected) {
      if (newSelected.some(s => oldSelected.indexOf(s) === -1))
        return {
          selected_uno_id: newSelected,
          uno_ids_changed: true,
        };
    }
    return null;
  }
  componentDidUpdate() {
    if (this.state.uno_ids_changed) {
      this.setState({ uno_ids_changed: false });
      this.fetchData();
    }
  }
  fetchData() {
    const {
      match: {
        params: { innholdstype },
      },
      appState: { selected_uno_id },
    } = this.props;
    const comparisons = comparisonsConfig[innholdstype];
    const comparisonTypes = selected_uno_id.filter(
      s => s[0] === innholdstype[0].toLowerCase()
    );
    const uno_ids_string = comparisonTypes.join(",");
    const dataKeys: { [k: string]: true } = {};
    comparisons.forEach(comparison => {
      const dataKey = comparison.path + JSON.stringify(comparison.query);
      if (dataKeys[dataKey]) return; // Only query once
      dataKeys[dataKey] = true;
      fetch(
        `${API_DOMAIN}${comparison.path}?${objectToQueryString({
          ...comparison.query,
          uno_id: uno_ids_string,
        })}`
      )
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            this.setState({ [dataKey]: false });
          } else {
            this.setState({ [dataKey]: data });
          }
        })
        .catch(e => {
          this.setState({ [dataKey]: false });
        });
      // TODO: set timeout to render loading page
    });
  }
  render() {
    const { innholdstype } = this.props.match.params;
    const comparisons = comparisonsConfig[innholdstype];
    const { selected_uno_id } = this.props.appState;
    const uno_ids = selected_uno_id.filter(
      s => s[0] === innholdstype[0].toLowerCase()
    );
    let breadcrumb;
    switch (innholdstype) {
      case "utdanning":
        breadcrumb = <Translate nb="Velg andre utdanninger" />;
        break;
      case "yrke":
        breadcrumb = <Translate nb="Velg andre yrker" />;
        break;
      default:
        breadcrumb = <Translate nb="Tilbake" />;
        break;
    }
    return (
      <PageChrome>
        <SyncUrlState />
        <div className={`${styles.ComparisonPage}`}>
          <div className={`${styles.breadcrumb}`}>
            <Link
              to={"/liste/" + innholdstype}
              className={`${styles.breadcrumb_link}`}
            >
              <ArrowLeft />
              {breadcrumb}
            </Link>
          </div>
          <div className={`${styles.flex_container}`}>
            <SelectedCompares innholdstype={innholdstype} />

            {comparisons.map((comparison, i) => {
              const dataKey =
                comparison.path + JSON.stringify(comparison.query);
              const rowData = this.state[dataKey];
              if (rowData === false)
                return (
                  <div key={i}>
                    Kunne ikke finne data for {comparison.title}
                  </div>
                );
              if (!rowData) return null;
              if (comparison.Component) {
                return (
                  <IsolatedComparisonPart
                    key={i}
                    data={rowData}
                    template={comparison}
                    uno_ids={uno_ids}
                  />
                );
              }
              return (
                <div key={i}>
                  <ComparisonHeader comparison={comparison} />
                  <ComparisonRow>
                    {uno_ids.map(uno_id => (
                      <IsolatedComparisonPart
                        key={uno_id}
                        data={rowData[uno_id]}
                        template={comparison}
                      />
                    ))}
                  </ComparisonRow>
                </div>
              );
            })}
          </div>
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(ComparisonPage);
