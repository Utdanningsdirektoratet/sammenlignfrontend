import React, { Component } from "react";
// import Plot from "react-plotly.js";
import { RouteComponentProps } from "react-router";

import styles from "./ComparisonPage.module.scss";

import SyncUrlState from "../app/SyncUrlState";
import PageChrome from "../app/PageChrome";
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

type State = any;
type Props = RouteComponentProps<{ innholdstype: string }> & AppStateProps;

class ComparisonPage extends Component<Props, State> {
  state: any = {};
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { innholdstype } = this.props.match.params;
    const comparisons = comparisonsConfig[innholdstype];
    const { selected } = this.props.appState;
    const comparisonTypes = selected.filter(
      s => s[0] === innholdstype[0].toLowerCase()
    );
    comparisons.forEach(comparison => {
      comparisonTypes.forEach(uno_id => {
        const key = comparison.path + uno_id + JSON.stringify(comparison.query);
        fetch(
          `${API_DOMAIN}${comparison.path}?${objectToQueryString({
            ...comparison.query,
            uno_id: uno_id,
            spraak: "nb",
          })}`
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ [key]: data[uno_id] });
          })
          .catch(e => {
            //ignore
          });
      });
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
          <h1>Sammenlign her</h1>
          <div className={styles.flex_container}>
            <div className={`${styles.flex_container_row} ${styles.titlerow}`}>
              {comparisonTypes.map((name, i) => (
                <div className={`${styles.flex_item} ${styles.title}`} key={i}>
                  {name}
                </div>
              ))}
            </div>

            {comparisons.map((comparison, i) => (
              <div key={i}>
                <h3 className={`${styles.flex_item} ${styles.item_title}`}>
                  {comparison.title}
                </h3>
                <div className={styles.flex_container_row}>
                  {comparisonTypes.map((type, i) => {
                    const key =
                      comparison.path + type + JSON.stringify(comparison.query);
                    const data = this.state[key];
                    return (
                      <div
                        key={i}
                        className={`${styles.flex_item} ${styles.item}`}
                      >
                        {data ? comparison.render(data) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(ComparisonPage);
