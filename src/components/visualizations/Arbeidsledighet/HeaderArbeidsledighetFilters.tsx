import React, { Component } from "react";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";
import {
  VisualizationHeaderConfigArbeidsledighet,
  Fullført,
} from "./VisualizationHeaderArbeidsledighet";
import CloseIcon from "../Generic/CloseIcon";

type Props = {
  config: VisualizationHeaderConfigArbeidsledighet;
  onFilterClicked: (event: any, key: string) => void;
  showHeaders?: boolean;
  showHelpText?: boolean;
  showHeaderHelpText?: boolean;
};

type State = {
  shownHelpText: string;
};

class HeaderArbeidsledighetFilters extends Component<Props, State> {
  state = { shownHelpText: "" };

  onClickHelpText = (type: string) => {
    if (this.state.shownHelpText === type) {
      this.setState({ shownHelpText: "" });
      return;
    }

    this.setState({ shownHelpText: type });
  };

  render() {
    const { Kjønn, Fullført, Visning } = this.props.config;
    const {
      showHelpText,
      showHeaders,
      showHeaderHelpText,
      onFilterClicked,
    } = this.props;

    return (
      <div className={`${styles.visualizationheader_container_modal_filters}`}>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="År etter utdannelse" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("År")}
                >
                  (?)
                  {this.state.shownHelpText === "År" ? (
                    <div
                      className={
                        styles.visualizationheader_container_modal_filters_header_helptext
                      }
                    >
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_content
                        }
                      >
                        <Translate nb="Vis tall på antall arbeidsledige basert på antall år etter endt utdannelse, eller alle arbeidsledige." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                      >
                        <CloseIcon
                          unoId=""
                          onClick={() => this.onClickHelpText("")}
                        />
                      </div>
                    </div>
                  ) : null}
                </span>
              ) : null}
            </div>
          ) : null}
          <Checkbox
            text={<Translate nb="7-10 år etter endt utdannelse" />}
            valueKey="710"
            isSelected={Fullført.some((a: Fullført) => {
              return a === "710";
            })}
            helpText={
              showHelpText ? (
                <Translate nb="Viser antall arbeidsledige 7-10 år etter endt utdannelse." />
              ) : (
                undefined
              )
            }
            onChange={event => onFilterClicked(event, "Arbeidsledighet")}
          />
          <Checkbox
            text={<Translate nb="1-3 år etter endt utdannelse" />}
            valueKey="13"
            isSelected={Fullført.some((a: Fullført) => {
              return a === "13";
            })}
            helpText={
              showHelpText ? (
                <Translate nb="Viser antall arbeidsledige 1-3 år etter endt utdannelse." />
              ) : (
                undefined
              )
            }
            onChange={event => onFilterClicked(event, "Arbeidsledighet")}
          />
          <Checkbox
            text={<Translate nb="Alle" />}
            valueKey="A"
            isSelected={Fullført.some((a: Fullført) => {
              return a === "A";
            })}
            helpText={
              showHelpText ? (
                <Translate nb="Viser antall arbeidsledige." />
              ) : (
                undefined
              )
            }
            onChange={event => onFilterClicked(event, "Arbeidsledighet")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Presentasjon" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Presentasjon")}
                >
                  (?)
                  {this.state.shownHelpText === "Presentasjon" ? (
                    <div
                      className={
                        styles.visualizationheader_container_modal_filters_header_helptext
                      }
                    >
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_content
                        }
                      >
                        <Translate nb="Vis tall på antall arbeidsledige som prosent for andel, eller som tall for antall." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                      >
                        <CloseIcon
                          unoId=""
                          onClick={() => this.onClickHelpText("")}
                        />
                      </div>
                    </div>
                  ) : null}
                </span>
              ) : null}
            </div>
          ) : null}
          <RadioButtonGroup
            group={[
              {
                text: <Translate nb="Andel" />,
                selected: Visning === "Andel",
                valueKey: "Andel",
                helptext: showHelpText ? (
                  <Translate nb="Viser andel arbeidsledige som prosent." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Antall" />,
                selected: Visning === "Antall",
                valueKey: "Antall",
                helptext: showHelpText ? (
                  <Translate nb="Viser antall arbeidsledige." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => onFilterClicked(event, "Visning")}
          />
        </ul>
        <HeaderModalKjonn
          kjønn={Kjønn}
          onFilterClicked={onFilterClicked}
          showHelpText={showHelpText}
          showHeaders={showHeaders}
        />
      </div>
    );
  }
}

export default HeaderArbeidsledighetFilters;
