import React, { ReactInstance } from "react";
import * as d3 from "d3";

import HvilkeJobber from "./HvilkeJobber";
import visualizationstyles from "../Visualization.module.scss";
import { API_DOMAIN } from "../../../config";
import { Innholdstype } from "../../../data/ApiTypes";
import SearchBoxInternal from "../../ui/SearchBoxInternal";
import searchboxStyles from "../../ui/SearchBox.module.scss";
import { objectToQueryString } from "../../../util/querystring";

type Utdanning = { unoId: string; title: string };

type Props = {
  innholdstype?: Innholdstype;
};

type State = {
  unoId: string;
  selectedUtdanning: { unoId: string; title: string };
  data: any;
  testData?: any;
  error: string | false;
};

class HvilkeJobberWrapper extends React.Component<Props, State> {
  mainSelect = React.createRef<HTMLSelectElement>();

  state: State = {
    selectedUtdanning: { unoId: "statsviter", title: "Statsviter" },
    data: null,
    testData: null,
    error: false,
    unoId: "y_sykepleier",
  };

  componentDidMount() {
    // this.getTsv(this.state.selectedUtdanning.unoId);
    this.fetchData(this.state.unoId);
  }

  handleOnUnoIdClicked = (uno_id: string) => {
    this.setState({ unoId: uno_id });
    // TODO: Get uno_id into URL
    this.fetchData(uno_id);
  };

  fetchData = (uno_id: string) => {
    // TODO: Get &dataset=total into here aswell
    fetch(
      `${API_DOMAIN}/rest/utdanning2yrke?${objectToQueryString({
        uno_id: uno_id,
      })}`
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          throw new Error("404");
        }
        this.setState({ testData: data });
      })
      .catch(e => this.setState({ error: "fetch failed:" + e.toString() }));
  };

  render() {
    if (this.state.testData) {
      const { unoId } = this.state;
      return (
        <div className={`${visualizationstyles.visualization_container}`}>
          <div className="hvilkejobber">
            <SearchBoxInternal
              className={`${searchboxStyles.searchbox_container}`}
              // innholdstype={innholdsType}
              onUnoIdClick={this.handleOnUnoIdClicked}
              inlineSuggestions
            />
            <HvilkeJobber
              mainSelect={this.mainSelect}
              data={this.state.testData[unoId]}
              unoId={this.state.unoId}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HvilkeJobberWrapper;
