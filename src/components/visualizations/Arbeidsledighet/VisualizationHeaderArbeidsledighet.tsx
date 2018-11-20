import { Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import { SammenligningTemplate } from "../../comparisonsConfig";
import ArbeidsledighetHeaderFilterDesktop from "./ArbeidsledighetHeaderFilterDesktop";
import HeaderArbeidsledighetFilters from "./HeaderArbeidsledighetFilters";

export type VisualizationHeaderConfigArbeidsledighet = {
  Kjønn: Kjønn;
  Fullført: Fullført[];
  Visning: Visning;
};
type Props = {
  config: VisualizationHeaderConfigArbeidsledighet;
  setConfig: (config: VisualizationHeaderConfigArbeidsledighet) => void;
  comparison: SammenligningTemplate;
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

  onFilterClicked = (event: any, key: string) => {
    const { config, setConfig } = this.props;
    var value = event.target.id;
    switch (key) {
      case "Kjønn":
        setConfig({ ...config, Kjønn: value });
        break;
      case "Arbeidsledighet":
        const index = config.Fullført.indexOf(value);
        if (index > -1) {
          setConfig({
            ...config,
            Fullført: config.Fullført.filter(f => f === value),
          });
        } else {
          setConfig({
            ...config,
            Fullført: [...config.Fullført, value].sort(),
          });
        }

        break;
      case "Visning":
        config.Visning = value;
        break;
      default:
        return;
    }
  };

  render() {
    const { Kjønn, Fullført, Visning } = this.props.config;
    let Modal = null;
    if (!this.props.config.Kjønn) return null;

    if (this.state.open) {
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
              <Translate nb="Arbeidsledighet" /> -{" "}
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
          <HeaderArbeidsledighetFilters
            onFilterClicked={this.onFilterClicked}
            config={this.props.config}
            showHelpText={true}
          />
        </div>
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
        <ArbeidsledighetHeaderFilterDesktop
          onFilterClicked={this.onFilterClicked}
          config={this.props.config}
        />
      </div>
    );
  }
}

export default VisualizationHeaderArbeidsledighet;
