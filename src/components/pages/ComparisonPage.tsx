import * as React from "react";
// import Plot from "react-plotly.js";

import PageChrome from "../app/PageChrome";
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
        </div>
      </PageChrome>
    );
  }
}

export default ComparisonPage;
