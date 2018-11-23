import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import LonnHeaderFilterDesktop from "./LonnHeaderFilterDesktop";
import HeaderLonnFilters from "./HeaderLonnFilters";

export type VisualizationHeaderConfigLonn = {
  Arbeidstid: Arbeidstid;
  Sektor: Sektor[];
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Kjønn: Kjønn;
  ssbSektor: { [uno_id: string]: string };
};

export type Tidsenhet = "Årlig" | "Månedlig" | "Ca. timelønn";
export type Lønn = "Brutto" | "Med overtid";
export type StatistiskMål = "Median" | "Gjennomsnitt" | "Median og kvartiler";

type Props = {
  config: VisualizationHeaderConfigLonn;
  setConfig: (config: VisualizationHeaderConfigLonn) => void;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  open: boolean;
};

class VisualizationHeaderLonn extends Component<Props, State> {
  state = { open: false };

  onFilterButtonClick = (open: boolean) => {
    this.setState({ open: open });
  };

  render() {
    const {
      Arbeidstid,
      Sektor,
      Tidsenhet,
      Lønn,
      StatistiskMål,
      Kjønn,
    } = this.props.config;
    let Modal = null;
    if (!this.props.config.Arbeidstid) return null;
    if (this.state.open)
      Modal = (
        <div className={`${styles.visualizationheader_container_modal}`}>
          <div
            className={`${styles.visualizationheader_container_modal_header}`}
          >
            <div
              className={`${
                styles.visualizationheader_container_modal_header_title
              }`}
            >
              <Translate nb="Lønn" /> -{" "}
              <span
                className={`${
                  styles.visualizationheader_container_modal_header_title__desc
                }`}
              >
                <Translate nb="visningsalternativer" />
              </span>
              <div
                className={`${
                  styles.visualizationheader_container_modal_header_icon
                }`}
                onClick={() => this.onFilterButtonClick(false)}
              />
            </div>
          </div>
          <HeaderLonnFilters
            config={this.props.config}
            onFilterClicked={this.props.onFilterClicked}
            showHelpText={true}
          />
        </div>
      );

    return (
      <div>
        <div className={`${styles.visualizationheader_container}`}>
          <div className={`${styles.visualizationheader_container_header}`} />
          <div
            className={`${styles.visualizationheader_container_header__title}`}
          >
            <Translate nb="Lønn" />{" "}
            <span
              className={`${
                styles.visualizationheader_container_header__title_filter
              }`}
            >
              (
              <ul>
                <li>
                  {Arbeidstid === "A" ? (
                    <span>
                      <Translate nb="Begge" />{" "}
                    </span>
                  ) : Arbeidstid === "D" ? (
                    <span>
                      <Translate nb="Deltid" />{" "}
                    </span>
                  ) : (
                    <span key={Arbeidstid}>
                      <Translate nb="Heltid" />{" "}
                    </span>
                  )}
                </li>
                <li>
                  {Sektor.map((d: string, i: number) => {
                    let text = ",";
                    if (i > 0) text = "/";
                    switch (d) {
                      case "A":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Alle" />{" "}
                          </span>
                        );
                      case "K":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Kommunal" />{" "}
                          </span>
                        );
                      case "P":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Privat" />{" "}
                          </span>
                        );
                      case "S":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Statlig" />{" "}
                          </span>
                        );
                    }
                  })}
                </li>
                <li>{", " + Lønn}</li>
                <li>{", " + StatistiskMål}</li>
                <li>
                  {(Arbeidstid.length > 0 || Sektor.length > 0 ? ", " : "") +
                    Tidsenhet}
                </li>
                <li>
                  {Kjønn === "A" ? (
                    <span>
                      {","} <Translate nb="Alle" />{" "}
                    </span>
                  ) : (
                    <span>
                      {","} <Translate nb="Kvinner og menn" />{" "}
                    </span>
                  )}
                </li>
              </ul>
              )
            </span>
            <span
              className={`${
                styles.visualizationheader_container_header__title_icon
              }`}
              onClick={() => this.onFilterButtonClick(true)}
            />
          </div>
          {Modal}
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default VisualizationHeaderLonn;
