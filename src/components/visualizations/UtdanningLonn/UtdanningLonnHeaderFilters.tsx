import React, { Component } from "react";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationFilterHeader.module.scss";
import CloseIcon from "../Generic/CloseIcon";
import { UtdanningLonnConfig } from "./UtdanningLonnConfig";

type Props = {
  config: UtdanningLonnConfig;
  onFilterClicked: (event: any, key: string) => void;
  showHeaders?: boolean;
  showHelpText?: boolean;
  showHeaderHelpText?: boolean;
};

type State = {
  shownHelpText: string;
};

class UtdanningLonnHeaderFilters extends Component<Props, State> {
  state = { shownHelpText: "" };

  onClickHelpText = (type: string) => {
    if (this.state.shownHelpText === type) {
      this.setState({ shownHelpText: "" });
      return;
    }

    this.setState({ shownHelpText: type });
  };

  render() {
    const { Tidsenhet, Lønn, StatistiskMål, Fullført } = this.props.config;
    const { showHelpText, showHeaders, showHeaderHelpText } = this.props;
    return (
      <div className={`${styles.visualizationheader_container_modal_filters}`}>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Antall år etter fullført utdanning" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Fullført")}
                >
                  (?)
                  {this.state.shownHelpText === "Fullført" ? (
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
                        <Translate nb="Vis tall beregnet på grunnlag av antall år etter fullført utdanning." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                        onClick={() => this.onClickHelpText("")}
                      >
                        <CloseIcon />
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
                text: <Translate nb="Alle" />,
                selected: Fullført === "A",
                valueKey: "A",
                helptext: showHelpText ? (
                  <Translate nb="Viser tall uavhengig av hvor lenge det er siden fullført utdanning." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="0-4 år" />,
                selected: Fullført === "04",
                valueKey: "04",
                helptext: showHelpText ? (
                  <Translate nb="Viser tall for de som har fullført utdanning innen 0-4 år." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="5 år eller mer" />,
                selected: Fullført === "5",
                valueKey: "5",
                helptext: showHelpText ? (
                  <Translate nb="Viser tall for de som har fullført utdanning for 5 år siden eller mer." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => this.props.onFilterClicked(event, "Fullført")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Grunnlag" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Grunnlag")}
                >
                  (?)
                  {this.state.shownHelpText === "Grunnlag" ? (
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
                        <Translate nb="Vis sum lønn utbetalt på gitt grunnlag, i brutto eller inklusive overtid." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                        onClick={() => this.onClickHelpText("")}
                      >
                        <CloseIcon />
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
                text: <Translate nb="Avtalt lønn" />,
                selected: Lønn === "Brutto",
                valueKey: "Brutto",
                helptext: showHelpText ? (
                  <Translate nb="Viser sum lønn utbetalt i avtalt lønn, eksklusive overtid." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Inklusiv overtid" />,
                selected: Lønn === "Med overtid",
                valueKey: "Med overtid",
                helptext: showHelpText ? (
                  <Translate nb="Viser sum lønn utbetalt inklusive overtid." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => this.props.onFilterClicked(event, "Lønn")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Beregning" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Beregning")}
                >
                  (?)
                  {this.state.shownHelpText === "Beregning" ? (
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
                        <Translate nb="Vis beregning av tall gitt av median / gjennomsnitt / median og kvartiler." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                        onClick={() => this.onClickHelpText("")}
                      >
                        <CloseIcon />
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
                text: <Translate nb="Median" />,
                selected: StatistiskMål === "Median",
                valueKey: "Median",
                helptext: showHelpText ? (
                  <Translate nb="Viser utregnet median for lønn utbetalt." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Gjennomsnitt" />,
                selected: StatistiskMål === "Gjennomsnitt",
                valueKey: "Gjennomsnitt",
                helptext: showHelpText ? (
                  <Translate nb="Viser gjennomsnittlig lønn utbetalt." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Median og kvartiler" />,
                selected: StatistiskMål === "Median og kvartiler",
                valueKey: "Median og kvartiler",
                helptext: showHelpText ? (
                  <Translate nb="Viser Median og kvartiler for lønn utbetalt." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event =>
              this.props.onFilterClicked(event, "StatistiskMål")
            }
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Periode" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Periode")}
                >
                  (?)
                  {this.state.shownHelpText === "Periode" ? (
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
                        <Translate nb="Vis sum lønn utbetalt enten årlig, månedlig eller per time." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                        onClick={() => this.onClickHelpText("")}
                      >
                        <CloseIcon />
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
                text: <Translate nb="Per år" />,
                selected: Tidsenhet === "Årlig",
                valueKey: "Årlig",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser sum lønn utbetalt i året."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Per måned" />,
                selected: Tidsenhet === "Månedlig",
                valueKey: "Månedlig",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser sum lønn utbetalt månedlig."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Per time" />,
                selected: Tidsenhet === "Ca. timelønn",
                valueKey: "Ca. timelønn",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser sum lønn utbetalt per time."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => this.props.onFilterClicked(event, "Tidsenhet")}
          />
        </ul>
      </div>
    );
  }
}

export default UtdanningLonnHeaderFilters;
