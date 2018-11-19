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
import { with_lang_props, LanguageProps } from "../app/TranslateContext";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import CompareSelection from "./Shared/CompareSelection";
import SelectedCompares from "./Shared/SelectedCompares";
import { Innholdstype } from "../../data/ApiTypes";
import Translate from "../app/Translate";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../fontawesome/solid/arrow-left.svg";

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
    const { selected_uno_id } = this.props.appState;
    const comparisonTypes = selected_uno_id.filter(
      s => s[0] === innholdstype[0].toLowerCase()
    );
    let breadcrumb = innholdstype;
    switch (innholdstype) {
      case "utdanning":
        breadcrumb += "er";
        break;
      case "yrke":
        breadcrumb += "r";
        break;
      default:
        break;
    }
    return (
      <PageChrome>
        <SyncUrlState />
        <div className={styles.ComparisonPage}>
          <div className={styles.breadcrumb}>
            <Link to={"/" + innholdstype} className={styles.breadcrumb_link}>
              <ArrowLeft />
              <Translate nb={"Velg andre " + breadcrumb} nn="nynorsk" />
            </Link>
          </div>
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
