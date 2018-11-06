import React, { Fragment } from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import "./AlphabeticOverviewPage.scss";

import { getUrlState, toggleUrlState } from "../../util/urlState";
import PageChrome from "../app/PageChrome";
import { getUtdanning, getYrke, getStudium } from "../../data/main";
import { with_app_state, AppState, AppStateProps } from "../app/AppContext";
import { DataList, MainElement } from "../../data/ApiTypes";

type State = { data: DataList };

type Props = RouteComponentProps<{ area: "utdanning" | "yrke" | "studie" }> &
  AppStateProps;

class AlphabeticOverviewPage extends React.Component<Props, State> {
  state = { data: { list: [] as MainElement[], interesser: [] as string[] } };
  componentDidMount() {
    const { area } = this.props.match.params;
    console.log("mounted alphabeticOverviewPage");
    switch (area) {
      case "utdanning":
        getUtdanning(data => this.setState({ data }));
        break;
      case "yrke":
        getYrke(data => this.setState({ data }));
        break;
      case "studie":
        getStudium(data => this.setState({ data }));
        break;
      default:
        console.log("unknown area: ", area);
    }
  }
  componentWillUnmount() {
    console.log("closing alphabeticOverviewPage");
  }
  handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const key = e.currentTarget.getAttribute("data-key");
    if (key) this.props.appState.toggleSelection(key);
  };
  render() {
    const { area } = this.props.match.params;
    const selected = this.props.appState.selected;
    const {
      data: { interesser, list },
    } = this.state;

    let selectedNodes = null;
    if (selected && selected.length > 0) {
      selectedNodes = (
        <>
          <Link to="/sammenligne" className="btn btn-primary">
            Sammenlign her
          </Link>
          <ul>
            {selected.map(s => (
              <li>{s}</li>
            ))}
          </ul>
        </>
      );
    }

    return (
      <PageChrome>
        <h1>Alfabetisk oversikt {area}</h1>
        {selectedNodes}
        {interesser && (
          <div>
            <h2>Interesser/kategorier</h2>
            {interesser.map((itrest: string, i: number) => (
              <span key={i}>{itrest} </span>
            ))}
          </div>
        )}
        <ul className="alphabetic">
          {/* TODO: Rewrite to ignore empty characters +++ */}
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("").map(c => (
            <li key={c}>
              <h3 className="alphabetic-header">
                <span>{c}</span>
              </h3>
              {list &&
                list
                  .filter(o => o.tittel.toLowerCase()[0] === c.toLowerCase())
                  .map((o, i: number) => (
                    <Fragment key={i}>
                      <span
                        data-key={o.uno_id}
                        onClick={this.handleItemClick}
                        className={
                          selected && selected.indexOf(o.uno_id) !== -1
                            ? "selected"
                            : ""
                        }
                      >
                        {o.tittel}
                      </span>{" "}
                    </Fragment>
                  ))}
            </li>
          ))}
        </ul>
      </PageChrome>
    );
  }
}

export default with_app_state(AlphabeticOverviewPage);
