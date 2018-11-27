import React, { Component } from "react";
import EntreprenorskapHeaderFilters, {
  EntreprenorskapHeaderConfig,
} from "./EntreprenorskapHeaderFilters";
import styles from "../Shared/VisualizationHeader.module.scss";
import ClickOutsideListener from "../../utils/ClickOutsideListner";
import Translate from "../../app/Translate";
import { VisningTranslations } from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";

type Props = {
  config: EntreprenorskapHeaderConfig;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  open: boolean;
};

class VisualizationHeaderEntreprenorskap extends Component<Props, State> {
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
              <Translate nb="Entreprenørskap" /> -{" "}
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
          <EntreprenorskapHeaderFilters
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
            <Translate nb="Entreprenørskap" />{" "}
            <span
              className={`${
                styles.visualizationheader_container_header__title_filter
              }`}
            >
              (
              <ul>
                <li>
                  {Fullført === "A" ? (
                    <span>
                      <Translate nb="Alle" />{" "}
                    </span>
                  ) : Fullført === "13" ? (
                    <span>
                      <Translate nb="1-3 år" />{" "}
                    </span>
                  ) : (
                    <span>
                      <Translate nb="7-10 år" />{" "}
                    </span>
                  )}
                </li>
                <li>
                  {", "}
                  {VisningTranslations[Visning]}
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

export default VisualizationHeaderEntreprenorskap;
