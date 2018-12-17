import React, { ReactInstance } from "react";
import * as d3 from "d3";

import HvilkeJobber from "./HvilkeJobber";
import visualizationstyles from "../Visualization.module.scss";
import { API_DOMAIN } from "../../../config";
import SearchBox from "../../pages/AlphabeticComparisonPage/SearchBox";
import { Innholdstype } from "../../../data/ApiTypes";
import { AppStateProps, with_app_state } from "../../app/AppContext";

type Utdanning = { unoId: string; title: string };

type Props = {
  innholdstype?: Innholdstype;
  //utdanninger: Utdanning[];
};

// type myProps = {
// };

type State = {
  unoId: string | undefined | null;
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
    unoId: "",
  };

  componentDidMount() {
    this.getTsv(this.state.selectedUtdanning.unoId);
    this.fetchData();
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

  // handleOnUnoIdClicked = (uno_id: string) => {
  //   if (this.state.unoId) {
  //     this.props.appState.replaceUnoId(this.state.unoId, uno_id);
  //   } else {
  //     this.setState({ unoId: uno_id });
  //   }
  //   // } this.props.appState.toggleUnoId(uno_id);
  // };

  fetchData = () => {
    let showUnoId = "y_sykepleier";
    /* Får ikke kjørt &dataset=total på api */
    fetch(`${API_DOMAIN}/rest/utdanning2yrke?uno_id=${showUnoId}`)
      .then(r => r.json())
      .then(data => {
        /* Rename itemsss variable ... */
        var itemsss = data[showUnoId].map((itms: any) => {
          return console.log(
            itms.yrkeskode_styrk08_navn + " " + itms.antall_personer
          );
        });
        if (data.error) {
          throw new Error("404");
        }
        this.setState({ testData: data });
      })
      .catch(e => this.setState({ error: "fetch failed:" + e.toString() }));
  };

  /* dont need */
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
      // const { innholdsType } = this.props;
      return (
        <div className={`${visualizationstyles.visualization_container}`}>
          <div className="hvilkejobber">
            <SearchBox
              // className={`${styles.container_searchbox}`}
              // innholdstype={innholdsType}
              // onUnoIdClick={this.handleOnUnoIdClicked}
              clearOnBlur={false}
              inlineSuggestions
              focusOnMount
            />
            {/* <HvilkeJobberSelektor
              utdanninger={this.props.utdanninger}
              mainSelectRef={this.mainSelect}
              selected={selectedUtdanning.unoId}
              onSelected={this.onUtdanningChanged}
            /> */}
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
