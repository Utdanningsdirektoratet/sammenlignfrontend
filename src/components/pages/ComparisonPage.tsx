import React, { Component, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router";

import styles from "./ComparisonPage.module.scss";

import SyncUrlState from "../app/SyncUrlState";
import PageChrome from "./PageChrome/PageChrome";

// import { getData } from "../../data/data";
import { with_app_state, AppStateProps } from "../app/AppContext";
import comparisonsConfig from "../comparisonsConfig";
import { API_DOMAIN } from "../../config";
import { objectToQueryString } from "../../util/querystring";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import SelectedCompares from "./Shared/SelectedCompares";
import UnoIdNivaLine from "./Shared/UnoIdNivaLine";
import { Innholdstype } from "../../data/ApiTypes";
import ComparisonHeader from "../visualizations/Shared/ComparisonHeader";
import IsolatedComparisonPart from "./ComparisonPage/IsolatedComparisonPart";
import Breadcrumb from "./ComparisonPage/Breadcrumb";
import Frontpage from "./Frontpage";

import VizChartWrapper from "../ui/VizChartWrapper";

type State = { [dataKey: string]: { [uno_id: string]: any } | false };
type Props = RouteComponentProps<{ innholdstype: Innholdstype }> &
  AppStateProps;

class ComparisonPage extends Component<Props, State> {
  state: State = {};
  componentDidMount() {
    this.fetchData();
    // const [layout, setLayout] = useState("bars");
    // let setDisaggregate: any;
    // let disaggregate: any = null;
    // [disaggregate, setDisaggregate] = useState(null);
  }
  static getDerivedStateFromProps(props: any, state: State) {
    console.log("state", state);
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
          if (data.error || data.grouped && data.grouped.uno_id.matches == 0) { // Special case for data for utdanningsbakgrunn
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

    if (uno_ids.length === 0) {
      return <Frontpage innholdstype={innholdstype} />;
    }
    var mainComparison = comparisons.find(x => x.path.includes("main")) as any;
    var mainPath = mainComparison.path + JSON.stringify(mainComparison.query);

    return (
      <PageChrome>
        <SyncUrlState />
        <div className={`${styles.ComparisonPage}`}>
          <Breadcrumb innholdstype={innholdstype} />
          <div className={`${styles.flex_container}`}>
            <UnoIdNivaLine
              innholdstype={innholdstype}
              data={this.state[mainPath]}
              nivåer={null}
            />
            <SelectedCompares innholdstype={innholdstype} />

            {comparisons.map((comparison, i) => {
              const dataKey =
                comparison.path + JSON.stringify(comparison.query);
              const rowData = this.state[dataKey];
              if (!rowData) return null;
              if (comparison.title === "Arbeidsmarked" || comparison.title === "Utdanningsbakgrunn") {
                return (
                  <div key={i}>
                    <ComparisonHeader comparison={comparison} />
                    <VizChartWrapper uno_ids={uno_ids} rowData={rowData} comparison={comparison} />
                  </div>
                )
              }
              if (comparison.Component) {
                return (
                  <IsolatedComparisonPart
                    key={i}
                    data={rowData}
                    template={comparison}
                    uno_ids={uno_ids}
                    widget={false}
                    layout={""}
                    disaggregate={null}
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
                        uno_idsz={uno_id}
                        data={rowData[uno_id]}
                        template={comparison}
                        widget={false}
                        layout={""}
                        disaggregate={null}
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
