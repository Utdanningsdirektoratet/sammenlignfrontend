import React, { Component } from "react";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import { Sektor } from "../../../data/ApiTypes";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";
import { VisualizationHeaderConfigLonn } from "./VisualizationHeaderLonn";
import CloseIcon from "../Generic/CloseIcon";

type Props = {
  config: VisualizationHeaderConfigLonn;
  onFilterClicked: (event: any, key: string) => void;
  showHeaders?: boolean;
  showHelpText?: boolean;
  showHeaderHelpText?: boolean;
};

type State = {
  shownHelpText: string;
};

class HeaderLonnFilters extends Component<Props, State> {
  state = { shownHelpText: "" };

  onClickHelpText = (type: string) => {
    if (this.state.shownHelpText === type) {
      this.setState({ shownHelpText: "" });
      return;
    }

    this.setState({ shownHelpText: type });
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
              Arbeidstid
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Arbeidstid")}
                >
                  (?)
                  {this.state.shownHelpText === "Arbeidstid" ? (
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
                        Vis tall beregnet på grunnlag av dem som jobber heltid,
                        deltid, eller alle arbeidstider.
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
                text: <Translate nb="Heltid" nn="nynorsk" />,
                selected: Arbeidstid === "H",
                valueKey: "H",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber heltid."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Deltid" nn="nynorsk" />,
                selected: Arbeidstid === "D",
                valueKey: "D",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber deltid."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Begge" nn="nynorsk" />,
                selected: Arbeidstid === "A",
                valueKey: "A",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber heltid og deltid."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
            ]}
            name="arbeidstid"
            onChange={event => this.props.onFilterClicked(event, "Arbeidstid")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              Sektor
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Sektor")}
                >
                  (?)
                  {this.state.shownHelpText === "Sektor" ? (
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
                        Vis tall beregnet på grunnlag av dem som jobber i
                        forskjellige sektorer, eller alle sektorer.
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
            text={<Translate nb="Alle" nn="nynorsk" />}
            valueKey="A"
            isSelected={Sektor.some((a: Sektor) => {
              return a === "A";
            })}
            helpText={
              showHelpText ? (
                <Translate
                  nb="Viser tall beregnet på grunnlag av dem som jobber i både privat, statlig og kommunal sektor."
                  nn="nynorsk"
                />
              ) : (
                undefined
              )
            }
            onChange={event => this.props.onFilterClicked(event, "Sektor")}
          />
          <Checkbox
            text={<Translate nb="Privat" nn="nynorsk" />}
            valueKey="P"
            isSelected={Sektor.some((a: Sektor) => {
              return a === "P";
            })}
            helpText={
              showHelpText ? (
                <Translate
                  nb="Viser tall beregnet på grunnlag av dem som jobber i privat sektor."
                  nn="nynorsk"
                />
              ) : (
                undefined
              )
            }
            onChange={event => this.props.onFilterClicked(event, "Sektor")}
          />
          <Checkbox
            text={<Translate nb="Statlig" nn="nynorsk" />}
            valueKey="S"
            isSelected={Sektor.some((a: Sektor) => {
              return a === "S";
            })}
            helpText={
              showHelpText ? (
                <Translate
                  nb="Viser tall beregnet på grunnlag av dem som jobber i statlig sektor."
                  nn="nynorsk"
                />
              ) : (
                undefined
              )
            }
            onChange={event => this.props.onFilterClicked(event, "Sektor")}
          />
          <Checkbox
            text={<Translate nb="Kommunal" nn="nynorsk" />}
            valueKey="K"
            isSelected={Sektor.some((a: Sektor) => {
              return a === "K";
            })}
            helpText={
              showHelpText ? (
                <Translate
                  nb="Viser tall beregnet på grunnlag av dem som jobber i kommunal sektor."
                  nn="nynorsk"
                />
              ) : (
                undefined
              )
            }
            onChange={event => this.props.onFilterClicked(event, "Sektor")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              Grunnlag
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
                        Vis sum lønn utbetalt på gitt grunnlag, i brutto eller
                        inklusive overtid.
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
                text: <Translate nb="Brutto" nn="nynorsk" />,
                selected: Lønn === "Brutto",
                valueKey: "Brutto",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser sum lønn utbetalt i brutto, eksklusive overtid."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Inklusiv overtid" nn="nynorsk" />,
                selected: Lønn === "Med overtid",
                valueKey: "Med overtid",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser sum lønn utbetalt inklusive overtid."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
            ]}
            name="lønn"
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
              Beregning
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
                        Vis beregning av tall gitt av median eller gjennomsnitt.
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
                text: <Translate nb="Median" nn="nynorsk" />,
                selected: StatistiskMål === "Median",
                valueKey: "Median",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser utregnet median for lønn utbetalt."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Gjennomsnitt" nn="nynorsk" />,
                selected: StatistiskMål === "Gjennomsnitt",
                valueKey: "Gjennomsnitt",
                helptext: showHelpText ? (
                  <Translate
                    nb="Viser gjennomsnittlig lønn utbetalt."
                    nn="nynorsk"
                  />
                ) : (
                  undefined
                ),
              },
            ]}
            name="statistiskmål"
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
              Periode
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
                        Vis sum lønn utbetalt enten årlig, månedlig eller per
                        time.
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
                text: <Translate nb="Per år" nn="nynorsk" />,
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
                text: <Translate nb="Per måned" nn="nynorsk" />,
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
                text: <Translate nb="Per time" nn="nynorsk" />,
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
            name="tidsenhet"
            onChange={event => this.props.onFilterClicked(event, "Tidsenhet")}
          />
        </ul>

        <HeaderModalKjonn
          kjønn={Kjønn}
          onFilterClicked={this.props.onFilterClicked}
          showHelpText={showHelpText}
          showHeaders={showHeaders}
        />
      </div>
    );
  }
}

export default HeaderLonnFilters;
