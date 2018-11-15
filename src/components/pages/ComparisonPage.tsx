import React, { Component } from "react";
// import Plot from "react-plotly.js";
import { RouteComponentProps } from "react-router";

import styles from "./ComparisonPage.module.scss";

import SyncUrlState from "../app/SyncUrlState";
import PageChrome from "./PageChrome/PageChrome";
import Lonn from "../visualizations/Lonn";
import Arbeidsledighet from "../visualizations/Arbeidsledighet";
import VanligeYrkerYrke from "../visualizations/VanligeYrkerYrke";
import Gjennomforingstid from "../visualizations/Gjennomforingstid";
import NoData from "../visualizations/NoData";
import Frafall from "../visualizations/Frafall";
import Jobbtilfredshet from "../visualizations/Jobbtilfredshet";

// import { getData } from "../../data/data";
import { with_app_state, AppStateProps } from "../app/AppContext";
import comparisonsConfig from "../comparisonsConfig";
import { API_DOMAIN } from "../../data/config";
import { objectToQueryString } from "../../util/querystring";
import { with_lang_props, LanguageProps } from "../app/TranslateContext";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import CompareSelection from "./Shared/CompareSelection";
import SelectedCompares from "./Shared/SelectedCompares";
import { Innholdstype } from "../../data/ApiTypes";

type State = { [dataKey: string]: { [uno_id: string]: any } | false };
type Props = RouteComponentProps<{ innholdstype: Innholdstype }> &
  AppStateProps &
  LanguageProps;

class ComparisonPage extends Component<Props, State> {
  state: State = {};
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const {
      match: {
        params: { innholdstype },
      },
      lang,
      appState: { selected },
    } = this.props;
    const comparisons = comparisonsConfig[innholdstype];
    const comparisonTypes = selected.filter(
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
          spraak: lang,
        })}`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ [dataKey]: data });
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
    const { selected } = this.props.appState;
    const comparisonTypes = selected.filter(
      s => s[0] === innholdstype[0].toLowerCase()
    );

    return (
      <PageChrome>
        <SyncUrlState />
        <div className={styles.ComparisonPage}>
          <h1 className={`${styles.flex_container_row}`}>Sammenlign her</h1>
          <div className={styles.flex_container}>
            <SelectedCompares innholdstype={innholdstype} />

            {comparisons.map((comparison, i) => {
              const dataKey =
                comparison.path + JSON.stringify(comparison.query);
              const rowData = this.state[dataKey];
              if (rowData === false) return null;
              return (
                <ComparisonRow
                  key={i}
                  comparison={comparison}
                  comparisonTypes={comparisonTypes}
                  rowData={rowData}
                />
              );
            })}
          </div>
        </div>
      </PageChrome>
    );
  }
}

export default with_lang_props(with_app_state(ComparisonPage));
