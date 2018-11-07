import React, { Component } from "react";
// import Plot from "react-plotly.js";
import { RouteComponentProps } from "react-router";

import "./ComparisonPage.scss";

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

const datapunkt = ["lønn", "arbeidsledig", "gjennomføringstid"];

type State = {};
type Props = RouteComponentProps & AppStateProps;

class ComparisonPage extends Component<Props, State> {
  render() {
    const { selected: comparisonTypes } = this.props.appState;
    // let a = this.props.match.params["test"];
    // this.state;
    return (
      <PageChrome>
        <SyncUrlState />
        <div className="ComparisonPage">
          <h1>Sammenlign her</h1>
          <h2>Lønn</h2>
          <Lonn high={19300} low={14400} avg={16100} />

          <h2>Arbeidsledighet</h2>
          <Arbeidsledighet newly={38} tenyears={2} />

          <h2>Vanlige yrker</h2>
          <VanligeYrkerYrke
            yrker={[
<<<<<<< HEAD
              { id: 1, title: "Fisker", percentage: 90, info: 12 },
              { id: 2, title: "Fiskeopdretter", percentage: 45, info: 12 },
              { id: 3, title: "Fiskehelsebiolog", percentage: 30, info: 12 },
              {
                id: 4,
=======
              { title: "Fisker", percentage: 90, info: 12 },
              { title: "Fiskeopdretter", percentage: 45, info: 12 },
              { title: "Fiskehelsebiolog", percentage: 30, info: 12 },
              {
>>>>>>> first draft sammenligningsside
                title: "Fagarbeider sjømatproduksjon",
                percentage: 25,
                info: 12,
              },
<<<<<<< HEAD
              { id: 5, title: "Sjømathandler", percentage: 15, info: 12 },
              { id: 6, title: "Fiskeforsker", percentage: 5, info: 12 },
=======
              { title: "Sjømathandler", percentage: 15, info: 12 },
              { title: "Fiskeforsker", percentage: 5, info: 12 },
>>>>>>> first draft sammenligningsside
            ]}
          />

          <h2>Gjennomføringstid</h2>
          <Gjennomforingstid years={5} months={9} />

          <h2>Frafall / stryk</h2>
          <Frafall value={20} />

          <h2>Jobbtilfredshet</h2>
          <Jobbtilfredshet value={92} />

          <NoData />

          <div className="flex-container">
            <div className="flex-container-row title-row">
              {comparisonTypes.map((name, titleKey) => (
                <div className="flex-item title" key={titleKey}>
                  {name}
                </div>
              ))}
            </div>

            {datapunkt.map((pkt, key) => (
              <div className="flex-container-row">
                <div key={key} className="flex-item item-title">
                  {pkt}
                </div>
                {comparisonTypes.map(itemKey => (
                  <div key={itemKey} className="flex-item item">
                    {pkt}
                  </div>
                ))}
                <div />
              </div>
            ))}
          </div>
        </div>
      </PageChrome>
    );
  }
}

export default with_app_state(ComparisonPage);
