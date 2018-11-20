import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { ComparisonHeaderProps } from "../Shared/ComparisonHeader";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";
import HeaderFilterDesktop from "./HeaderFilterDesktop";
import HeaderLonnFilters from "./HeaderLonnFilters";

export type VisualizationHeaderConfigLonn = {
  Arbeidstid: Arbeidstid;
  Sektor: Sektor[];
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Kjønn: Kjønn;
  rows: string[];
  ssbSektor: { [unoId: string]: string };
};

export type Tidsenhet = "Årlig" | "Månedlig" | "Ca. timelønn";
export type Lønn = "Brutto" | "Med overtid";
export type StatistiskMål = "Median" | "Gjennomsnitt";

type State = {
  open: boolean;
};

class VisualizationHeaderLonn extends Component<
  ComparisonHeaderProps<VisualizationHeaderConfigLonn>,
  State
> {
  state = { open: false };
  componentDidMount = () => {
    var config: VisualizationHeaderConfigLonn = {
      Arbeidstid: "A",
      Sektor: ["A"],
      Tidsenhet: "Årlig",
      Lønn: "Brutto",
      StatistiskMål: "Median",
      Kjønn: "A",
      rows: ["", ""],
      ssbSektor: {},
    };
    this.props.setConfig(config);
  };
  componentWillReceiveProps(
    nextProps: ComparisonHeaderProps<VisualizationHeaderConfigLonn>
  ) {
    if (nextProps.config !== this.props.config) {
      this.forceUpdate();
    }
  }

  onFilterButtonClick = (open: boolean) => {
    this.setState({ open: open });
  };

  onFilterClicked = (event: any, key: string) => {
    let config = this.props.config;
    var value = event.target.id;
    switch (key) {
      case "Arbeidstid":
        config.Arbeidstid = value;
        break;
      case "Sektor":
        var index = config.Sektor.indexOf(value);
        if (index > -1) {
          config.Sektor.splice(index, 1);
        } else {
          config.Sektor.push(value);
        }
        break;
      case "Tidsenhet":
        config.Tidsenhet = value;
        break;
      case "Lønn":
        config.Lønn = value;
        break;
      case "StatistiskMål":
        config.StatistiskMål = value;
        break;
      case "Kjønn":
        config.Kjønn = value;
        break;
      default:
        return;
    }
    config.rows =
      config.Sektor.length <= 1
        ? ["", ""]
        : config.Sektor.map(s => {
            switch (s) {
              //TODO: Add keys for translation
              case "A":
                return "Alle sektorer";
              case "K":
                return "Kommunal sektor";
              case "P":
                return "Privat sektor";
              case "S":
                return "Statlig sektor";
              default:
                return "";
            }
          }).concat("");
    this.props.setConfig(config);
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
            onFilterClicked={this.onFilterClicked}
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
        <HeaderFilterDesktop
          config={this.props.config}
          onFilterClicked={this.onFilterClicked}
        />
      </div>
    );
  }
}
export default VisualizationHeaderLonn;
