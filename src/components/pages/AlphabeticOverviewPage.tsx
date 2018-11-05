import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import "./AlphabeticOverviewPage.scss";

import { getUrlState, toggleUrlState } from "../../util/urlState";
import PageChrome from "../app/PageChrome";
import { getConfig, IAreaConfig } from "../../data/data";

type State = {
  selected: string[];
  node: IAreaConfig | undefined;
  interests: string[];
};
type RouteProps = {
  area: string;
};

class AlphabeticOverviewPage extends React.Component<
  RouteComponentProps<RouteProps>,
  State
> {
  state: Readonly<State> = { selected: [], interests: [], node: undefined };
  componentDidMount() {
    const { area } = this.props.match.params;
    this.setState({ selected: getUrlState() });
    getConfig((config: IAreaConfig) => this.setState({ node: config }), area);
  }
  handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("data-key");
    const newState = toggleUrlState(key);
    this.setState({ selected: newState });
  };
  render() {
    const { area } = this.props.match.params;
    const { selected } = this.state;
    const { node, interests } = this.state;
    let selectedNodes = null;
    if (this.state.selected) {
      selectedNodes = (
        <ul>
          {this.state.selected.map(s => (
            <li>{s}</li>
          ))}
        </ul>
      );
    }

    return (
      <PageChrome>
        <h1>Alfabetisk oversikt {area}</h1>
        {selectedNodes}
        {interests &&
          interests.map((itrest: string, i: number) => (
            <span key={i}>{itrest} </span>
          ))}
        <ul className="alphabetic">
          {/* TODO: Rewrite to ignore empty characters +++ */}
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("").map(c => (
            <li key={c}>
              <h3 className="alphabetic-header">
                <span>{c}</span>
              </h3>
              {node &&
                node.nodes
                  .filter((o: any) =>
                    o.title.toLowerCase().startsWith(c.toLowerCase())
                  )
                  .map((o: any, i: number) => (
                    <span
                      key={i}
                      data-key={o.id}
                      onClick={this.handleItemClick}
                      className={
                        selected && selected.indexOf(o.id) !== -1
                          ? "selected"
                          : ""
                      }
                    >
                      {o.title}{" "}
                    </span>
                  ))}
            </li>
          ))}
        </ul>
      </PageChrome>
    );
  }
}

export default AlphabeticOverviewPage;
