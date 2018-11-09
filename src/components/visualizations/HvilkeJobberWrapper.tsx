import React, { ReactInstance } from "react";
import * as d3 from "d3";

import HvilkeJobber from "./HvilkeJobber";
import visualizationstyles from "./Visualization.module.scss";

import HvilkeJobberSelektor from "./HvilkeJobberSelektor";

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
  hvilkeJobberRef = React.createRef<HvilkeJobber>();

  state: MyState = {
    selectedUtdanning: { unoId: "idrettsfag", title: "Idrettsfag" },
    data: null,
  };
  componentDidMount() {
    this.getTsv();
  }

  onUtdanningChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUtdanning: {
        unoId: event.target.value,
        title: event.target.value ? event.target.value : event.target.value,
      },
    });
    this.getTsv();
    if (this.hvilkeJobberRef.current)
      this.hvilkeJobberRef.current.handleUtdanningClicked({
        unoId: event.target.value,
        title: event.target.value,
      });
  };

  getTsv() {
    d3.tsv(
      "https://groven.no/utdno/yustat/data/" +
        this.state.selectedUtdanning.unoId +
        ".tsv"
    ).then((data: any) => {
      this.setState({ data: data });
    });
  }

  //component lifesycle, getDerrivedStateFromProps

  render() {
    if (this.state.data) {
      const { selectedUtdanning } = this.state;
      return (
        <div className={visualizationstyles.visualization_container}>
          <div className="hvilkejobber">
            <HvilkeJobberSelektor
              utdanninger={this.props.utdanninger}
              mainSelectRef={this.mainSelect}
              selected={selectedUtdanning.unoId}
              onSelected={this.onUtdanningChanged}
            />
            <HvilkeJobber
              mainSelect={this.mainSelect}
              ref={this.hvilkeJobberRef}
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
