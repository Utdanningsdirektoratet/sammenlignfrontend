import React, { Component } from "react";
import { UtdanningLonnConfig } from "./UtdanningLonnConfig";
import Translate from "../../app/Translate";
import ClickOutsideListener from "../../utils/ClickOutsideListner";
import styles from "../Shared/VisualizationFilterHeader.module.scss";
import UtdanningLonnHeaderFilters from "./UtdanningLonnHeaderFilters";

type Props = {
  config: UtdanningLonnConfig;
  setConfig: (config: UtdanningLonnConfig) => void;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  open: boolean;
};

const LonnTranslations = {
  Brutto: <Translate nb="Månedslønn" />,
  "Med overtid": <Translate nb="Avtalt lønn" />,
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

class UtdanningLonnHeaderMobile extends Component<Props, State> {
  state = { open: false };
  onFilterButtonClick = (open: boolean) => {
    this.setState({ open: open });
  };
  closeFilter = () => {
    this.setState({ open: false });
  };

  render() {
    const { Tidsenhet, Lønn, StatistiskMål, Fullført } = this.props.config;
    let Modal = null;
    if (!this.props.config.Lønn) return null;

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
          <UtdanningLonnHeaderFilters
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
                  {Fullført === "A" ? (
                    <span>
                      <Translate nb="Alle" />
                    </span>
                  ) : Fullført === "04" ? (
                    <span>
                      <Translate nb="0-4 år etter fullført utdanning" />
                    </span>
                  ) : (
                    <span>
                      <Translate nb="5 år eller mer etter fullført utdanning" />
                    </span>
                  )}
                  {","}
                </li>
                <li>
                  {LonnTranslations[Lønn]}
                  {","}
                </li>
                <li>
                  {StatistiskMålTranslations[StatistiskMål]}
                  {","}
                </li>
                <li>{TidsenhetTranslations[Tidsenhet]}</li>)
              </ul>
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

export default UtdanningLonnHeaderMobile;
