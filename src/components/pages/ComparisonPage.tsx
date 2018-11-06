import * as React from "react";
// import Plot from "react-plotly.js";

import PageChrome from "../app/PageChrome";
import Lonn from "../visualizations/Lonn";
import Arbeidsledighet from "../visualizations/Arbeidsledighet";
import VanligeYrkerYrke from "../visualizations/VanligeYrkerYrke";
import Gjennomforingstid from "../visualizations/Gjennomforingstid";
import NoData from "../visualizations/NoData";
// import { getData } from "../../data/data";
import { RouteComponentProps } from "react-router";

// import './ComparisonPage.css'

class ComparisonPage extends React.Component<RouteComponentProps> {
  public componentDidMount() {
    // getData((state: object) => {
    //   this.setState(state);
    // });
  }

  public render() {
    // let a = this.props.match.params["test"];
    // this.state;
    return (
      <PageChrome>
        <div>
          <h1>Sammenlign her</h1>
          <h2>Lønn</h2>
          <Lonn high={19300} low={14400} avg={16100} />

          <h2>Arbeidsledighet</h2>
          <Arbeidsledighet newly={38} tenyears={2} />

          <h2>Vanlige yrker</h2>
          <VanligeYrkerYrke
            yrker={[
              { title: "Fisker", percentage: 90, info: 12 },
              { title: "Fiskeopdretter", percentage: 45, info: 12 },
              { title: "Fiskehelsebiolog", percentage: 30, info: 12 },
              { title: "Fagarbeider sjømatproduksjon", percentage: 25, info: 12 },
              { title: "Sjømathandler", percentage: 15, info: 12 },
              { title: "Fiskeforsker", percentage: 5, info: 12 }
            ]}
          />

          <h2>Gjennomføringstid</h2>
          <Gjennomforingstid years={5} months={9}></Gjennomforingstid>

          <NoData />
        </div>
      </PageChrome>
    );
  }
}

export default ComparisonPage;
