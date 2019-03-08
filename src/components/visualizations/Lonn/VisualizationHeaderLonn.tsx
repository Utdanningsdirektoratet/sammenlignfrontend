import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationFilterHeader.module.scss";
import HeaderLonnFilters from "./HeaderLonnFilters";
import ClickOutsideListener from "../../utils/ClickOutsideListner";

export type VisualizationHeaderConfigLonn = {
  Arbeidstid: Arbeidstid;
  Sektor: Sektor;
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Kjønn: Kjønn;
  ssbSektor: { [uno_id: string]: string };
  widgetShowMobileMenu: boolean;
  lonnDivRef: any;
};

export type Tidsenhet = "Årlig" | "Månedlig" | "Ca. timelønn";
export type Lønn = "Brutto" | "Med overtid";
export type StatistiskMål = "Median" | "Gjennomsnitt" | "Median og kvartiler";

type Props = {
  widget: boolean;
  config: VisualizationHeaderConfigLonn;
  setConfig: (config: VisualizationHeaderConfigLonn) => void;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  open: boolean;
};
const LonnTranslations = {
  Brutto: <Translate nb="Avtalt lønn" />,
  "Med overtid": <Translate nb="Med overtid" />,
};
const StatistiskMålTranslations = {
  Median: <Translate nb="Median" />,
  Gjennomsnitt: <Translate nb="Gjennomsnitt" />,
  "Median og kvartiler": <Translate nb="Median og kvartiler" />,
};

const TidsenhetTranslations = {
  Årlig: <Translate nb="Årlig" />,
  Månedlig: <Translate nb="Månedlig" />,
  "Ca. timelønn": <Translate nb="Ca. timelønn" />,
};

class VisualizationHeaderLonn extends Component<Props, State> {
  state = { open: false };

  onFilterButtonClick = (open: boolean) => {
    this.setState({ open: open });
  };
  closeFilter = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      config: { Arbeidstid, Sektor, Tidsenhet, Lønn, StatistiskMål, Kjønn },
      widget,
    } = this.props;
    let Modal = null;
    if (!this.props.config.Arbeidstid) return null;
    if (this.state.open)
      Modal = (
        <ClickOutsideListener
          onOutsideClick={this.closeFilter}
          className={`${styles.visualizationheader_container_modal}`}
        >
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
        </ClickOutsideListener>
      );

    return (
      <div>
        <div className={`${styles.visualizationheader_container}`}>
          <div className={`${styles.visualizationheader_container_header}`} />
          <div
            className={`${styles.visualizationheader_container_header__title}`}
          >
            <h2>
              <Translate nb="Lønn" />{" "}
            </h2>

            <span
              className={`${
                styles.visualizationheader_container_header__title_filter
              }`}
            >
              <ul>
                (
                <li>
                  {Arbeidstid === "A" ? (
                    <span>
                      <Translate nb="Begge" />
                      {","}
                    </span>
                  ) : Arbeidstid === "D" ? (
                    <span>
                      <Translate nb="Deltid" />
                      {","}
                    </span>
                  ) : (
                    <span key={Arbeidstid}>
                      <Translate nb="Heltid" />
                      {","}
                    </span>
                  )}
                </li>
                <li>
                  {Sektor === "A" ? (
                    <span>
                      <Translate nb="Alle" />
                      {","}
                    </span>
                  ) : Sektor === "K" ? (
                    <span>
                      <Translate nb="Kommunal" />
                      {","}
                    </span>
                  ) : Sektor === "P" ? (
                    <span>
                      <Translate nb="Privat" />
                      {","}
                    </span>
                  ) : (
                    <span>
                      <Translate nb="Statlig" />
                      {","}
                    </span>
                  )}
                </li>
                <li>
                  {LonnTranslations[Lønn]}
                  {","}
                </li>
                <li>
                  {StatistiskMålTranslations[StatistiskMål]}
                  {","}
                </li>
                <li>
                  {TidsenhetTranslations[Tidsenhet]}
                  {","}
                </li>
                <li>
                  {Kjønn === "A" ? (
                    <span>
                      <Translate nb="Alle" />
                    </span>
                  ) : (
                    <span>
                      <Translate nb="Kvinner og menn" />
                    </span>
                  )}
                </li>
                )
              </ul>
            </span>
            <span
              className={`${
                styles.visualizationheader_container_header__title_icon
              } ${
                widget
                  ? ""
                  : styles.visualizationheader_container_header__title_icon_non_widget
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
