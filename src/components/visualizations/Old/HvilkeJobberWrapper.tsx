import React, { Component } from "react";

import HvilkeJobber from "./HvilkeJobber";
import visualizationstyles from "../Visualization.module.scss";
import { API_DOMAIN } from "../../../config";
import SearchBoxInternal from "../../ui/SearchBoxInternal";
import searchboxStyles from "../../ui/SearchBox.module.scss";
import { objectToQueryString } from "../../../util/querystring";

type State = {
  unoId: string;
  selectedUtdanning: { unoId: string; title: string };
  data: any;
  testData?: any;
  error: string | false;
};

class HvilkeJobberWrapper extends Component<{}, State> {
  mainSelect = React.createRef<HTMLSelectElement>();

  state: State = {
    selectedUtdanning: { unoId: "statsviter", title: "Statsviter" },
    data: null,
    testData: null,
    error: false,
    unoId: "y_sykepleier",
  };

  componentDidMount() {
    this.fetchData(this.state.unoId, "total");
  }

  handleOnUnoIdClicked = (uno_id: string) => {
    this.setState({ unoId: uno_id });
    // TODO: Get uno_id into URL
    this.fetchData(uno_id, "total");
  };

  fetchData = (uno_id: string, dataset: string) => {
    fetch(
      `${API_DOMAIN}/rest/utdanning2yrke?${objectToQueryString({
        uno_id: uno_id,
        dataset: dataset,
      })}`
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          throw new Error("404");
        }
        if (uno_id == this.state.unoId) {
          this.setState({ testData: data });
        }
      })
      .catch(e => this.setState({ error: "fetch failed:" + e.toString() }));
  };

  render() {
    const { unoId, testData } = this.state;
    if (testData && testData[unoId]) {
      return (
        <div className={`${visualizationstyles.visualization_container}`}>
          <div className="hvilkejobber">
            <SearchBoxInternal
              className={`${searchboxStyles.searchbox_container}`}
              onUnoIdClick={this.handleOnUnoIdClicked}
              inlineSuggestions
            />
            <HvilkeJobber
              mainSelect={this.mainSelect}
              data={testData[unoId]}
              unoId={unoId}
              key={unoId}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HvilkeJobberWrapper;
