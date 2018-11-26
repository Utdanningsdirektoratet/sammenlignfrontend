import React, { ReactInstance } from "react";
import * as d3 from "d3";

import HvilkeJobber from "./HvilkeJobber";
import visualizationstyles from "../Visualization.module.scss";

import HvilkeJobberSelektor from "./HvilkeJobberSelektor";
import { rejects } from "assert";

type Utdanning = { unoId: string; title: string };

type myProps = {
  utdanninger: Utdanning[];
};

type MyState = {
  selectedUtdanning: { unoId: string; title: string };
  data: any;
};

class HvilkeJobberWrapper extends React.Component<myProps, MyState> {
  mainSelect = React.createRef<HTMLSelectElement>();

  state: MyState = {
    selectedUtdanning: { unoId: "statsviter", title: "Statsviter" },
    data: null,
  };
  componentDidMount() {
    this.getTsv(this.state.selectedUtdanning.unoId);
  }

  onUtdanningChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUtdanning: {
        unoId: event.target.value,
        title: event.target.title ? event.target.title : event.target.value,
      },
    });
    this.getTsv(event.target.value);
  };

  getTsv = (unoId: string) => {
    d3.tsv("https://groven.no/utdno/yustat/data/" + unoId + ".tsv").then(
      (data: any) => {
        this.setState({ data: data });
      }
    );
  };

  render() {
    if (this.state.data) {
      const { selectedUtdanning } = this.state;
      return (
        <div className={`${visualizationstyles.visualization_container}`}>
          <div className="hvilkejobber">
            <HvilkeJobberSelektor
              utdanninger={this.props.utdanninger}
              mainSelectRef={this.mainSelect}
              selected={selectedUtdanning.unoId}
              onSelected={this.onUtdanningChanged}
            />
            <HvilkeJobber
              mainSelect={this.mainSelect}
              data={this.state.data}
              onUtdanningChanged={this.onUtdanningChanged}
              selectedUtdanning={this.state.selectedUtdanning}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HvilkeJobberWrapper;
