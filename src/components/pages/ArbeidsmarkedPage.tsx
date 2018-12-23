import React, { Component } from "react";
import { RouteComponentProps, Redirect } from "react-router";

// import visualizationstyles from "../Visualization.module.scss";
import { API_DOMAIN } from "../../config";
import SearchBoxInternal from "../ui/SearchBoxInternal";
import { objectToQueryString } from "../../util/querystring";
import {
  FilterTypes,
  mapAnyData,
  ArbeidsmarkedData,
  filterMappings,
} from "../visualizations/Arbeidsmarked/Mappings";
import ArbeidsmarkedD3 from "../visualizations/Arbeidsmarked/ArbeidsmarkedD3";
import PageChrome from "./PageChrome/PageChrome";
import HvilkeJobberFilter from "../visualizations/Arbeidsmarked/HvilkeJobberFilter";
import ArbeidsmarkedSort from "../visualizations/Arbeidsmarked/ArbeidsmarkedSort";
import Translate from "../app/Translate";
import UnoId from "../app/UnoId";

type State = {
  data?: ArbeidsmarkedData;
  rawData?: any;
  uno_id?: string;
  error?: string;
  redirectToUnoID?: string;
  filter: FilterTypes;
  sort: number;
  show_all: boolean;
};

class ArbeidsmarkedPage extends Component<
  RouteComponentProps<{ uno_id: string }>,
  State
> {
  mainSelect = React.createRef<HTMLSelectElement>();

  state: State = {
    filter: "antall_personer",
    sort: 0,
    show_all: false,
  };
  unmounted = false;
  componentDidMount() {
    const {
      match: {
        params: { uno_id },
      },
    } = this.props;
    const path = uno_id[0] === "u" ? "utdanning2yrke" : "yrke2utdanning";
    fetch(
      `${API_DOMAIN}/rest/${path}?${objectToQueryString({
        uno_id: uno_id,
        dataset: "total",
      })}`
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          throw new Error("404");
        }
        if (!this.unmounted) {
          const rawData = data[uno_id];
          this.setStateAndData({
            show_all: false,
            rawData,
            uno_id,
          });
        }
      })
      .catch(e => this.setState({ error: "fetch failed:" + e.toString() }));
  }
  componentWillUnmount() {
    this.unmounted = true;
  }

  handleOnUnoIdClicked = (uno_id: string) => {
    this.setState({ redirectToUnoID: uno_id });
  };
  handleFilterChange = (filter: FilterTypes) => {
    this.setStateAndData({ filter: filter, sort: 0 });
  };
  toggleShowAll = () => {
    this.setStateAndData({ show_all: !this.state.show_all });
  };
  handleSortChange = (sortField: number) => {
    this.setStateAndData({ sort: sortField });
  };

  setStateAndData<K extends keyof State>(newState: Pick<State, K>) {
    // convenience method for setState that also updates the filtered data
    const nextState = { ...this.state, ...(newState as Object) };
    this.setState({
      ...(newState as State),
      data: mapAnyData(
        nextState.rawData,
        nextState.filter,
        nextState.uno_id,
        nextState.sort,
        nextState.show_all
      ),
    });
  }

  render() {
    const { data, redirectToUnoID, filter, show_all } = this.state;
    const {
      match: {
        params: { uno_id },
      },
    } = this.props;
    if (redirectToUnoID) {
      return <Redirect to={`/arbeidsmarked/${redirectToUnoID}`} />;
    }
    return (
      <PageChrome>
        <div className="hvilkejobber">
          <SearchBoxInternal
            // className={`${searchboxStyles.searchbox_container}`}
            onUnoIdClick={this.handleOnUnoIdClicked}
            inlineSuggestions
          />
          {uno_id ? (
            <>
              <h1>
                <Translate
                  nb="Sammenlign data for %uno_id%"
                  replacements={{ "%uno_id%": <UnoId uno_id={uno_id} /> }}
                />
              </h1>
              <HvilkeJobberFilter
                filter={filter}
                onFilterChange={this.handleFilterChange}
              />
              <ArbeidsmarkedSort
                filter={filter}
                sort={this.state.sort}
                onSortChange={this.handleSortChange}
              />

              {data ? (
                <ArbeidsmarkedD3
                  data={data}
                  show_all={show_all}
                  toggleShowAll={this.toggleShowAll}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </PageChrome>
    );
  }
}

export default ArbeidsmarkedPage;
