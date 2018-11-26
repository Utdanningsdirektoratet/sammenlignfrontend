import { Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import { SammenligningTemplate } from "../../comparisonsConfig";
import HeaderArbeidsledighetFilters from "./HeaderArbeidsledighetFilters";
import ClickOutsideListener from "../../utils/ClickOutsideListner";

export type VisualizationHeaderConfigArbeidsledighet = {
  Kjønn: Kjønn;
  Fullført: Fullført[];
  Visning: Visning;
};
type Props = {
  config: VisualizationHeaderConfigArbeidsledighet;
  setConfig: (config: VisualizationHeaderConfigArbeidsledighet) => void;
  comparison: SammenligningTemplate;
  onFilterClicked: (event: any, key: string) => void;
};

export type Fullført = "710" | "13" | "A";
export type Visning = "Andel" | "Antall";
type State = {
  open: boolean;
};

class VisualizationHeaderArbeidsledighet extends Component<Props, State> {
  state = { open: false };

  onFilterButtonClick = (open: boolean) => {
    this.setState({ open: open });
  };
  closeFilter = () => {
    this.setState({ open: false });
  };

  render() {
    const { Kjønn, Fullført, Visning } = this.props.config;
    let Modal = null;
    if (!this.props.config.Kjønn) return null;

    if (this.state.open) {
      Modal = (
        <ClickOutsideListener
          className={`${styles.visualizationheader_container_modal}`}
          onOutsideClick={this.closeFilter}
        >
          <div
            className={`${styles.visualizationheader_container_modal_header}`}
          >
            <div
              className={`${
                styles.visualizationheader_container_modal_header_title
              }`}
            >
              <Translate nb="Arbeidsledighet" />
              <span
                className={`${
                  styles.visualizationheader_container_modal_header_title__desc
                }`}
              >
                - <Translate nb="visningsalternativer" />
              </span>
              <div
                className={`${
                  styles.visualizationheader_container_modal_header_icon
                }`}
                onClick={() => this.onFilterButtonClick(false)}
              />
            </div>
          </div>
          <HeaderArbeidsledighetFilters
            onFilterClicked={this.props.onFilterClicked}
            config={this.props.config}
            showHelpText={true}
          />
        </ClickOutsideListener>
      );
    }
    return (
      <div>
        <div className={`${styles.visualizationheader_container}`}>
          <div className={`${styles.visualizationheader_container_header}`} />
          <div
            className={`${styles.visualizationheader_container_header__title}`}
          >
            <Translate nb="Arbeidsledighet" />{" "}
            <span
              className={`${
                styles.visualizationheader_container_header__title_filter
              }`}
            >
              (
              <ul>
                <li>
                  {Fullført.map((f: string, i: number) => {
                    let text = "";
                    if (i > 0) text = "/";
                    switch (f) {
                      case "710":
                        return (
                          <span key={f}>
                            {text} <Translate nb="7-10 år" />{" "}
                          </span>
                        );
                      case "13":
                        return (
                          <span key={f}>
                            {text} <Translate nb="1-3 år" />{" "}
                          </span>
                        );
                      case "A":
                        return (
                          <span key={f}>
                            {text} <Translate nb="Alle" />{" "}
                          </span>
                        );
                    }
                  })}
                </li>
                <li>{", " + Visning}</li>
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

export default VisualizationHeaderArbeidsledighet;
