import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { ComparisonHeaderProps } from "../Shared/ComparisonHeader";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";

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
              <Translate nb="Lønn" nn="nynorsk" /> -{" "}
              <span
                className={`${
                  styles.visualizationheader_container_modal_header_title__desc
                }`}
              >
                <Translate nb="visningsalternativer" nn="nynorsk" />
              </span>
              <div
                className={`${
                  styles.visualizationheader_container_modal_header_icon
                }`}
                onClick={() => this.onFilterButtonClick(false)}
              />
            </div>
          </div>
          <div
            className={`${styles.visualizationheader_container_modal_filters}`}
          >
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Heltid" nn="nynorsk" />,
                    selected: Arbeidstid === "H",
                    valueKey: "H",
                    helptext: (
                      <Translate
                        nb="Viser tall beregnet på grunnlag av dem som jobber heltid."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Deltid" nn="nynorsk" />,
                    selected: Arbeidstid === "D",
                    valueKey: "D",
                    helptext: (
                      <Translate
                        nb="Viser tall beregnet på grunnlag av dem som jobber deltid."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Begge" nn="nynorsk" />,
                    selected: Arbeidstid === "A",
                    valueKey: "A",
                    helptext: (
                      <Translate
                        nb="Viser tall beregnet på grunnlag av dem som jobber heltid og deltid."
                        nn="nynorsk"
                      />
                    ),
                  },
                ]}
                name="arbeidstid"
                onChange={event => this.onFilterClicked(event, "Arbeidstid")}
              />
            </ul>
            <ul>
              <Checkbox
                text={<Translate nb="Privat" nn="nynorsk" />}
                valueKey="P"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "P";
                })}
                helpText={
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber i privat sektor."
                    nn="nynorsk"
                  />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Statlig" nn="nynorsk" />}
                valueKey="S"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "S";
                })}
                helpText={
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber i statlig sektor."
                    nn="nynorsk"
                  />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Kommunal" nn="nynorsk" />}
                valueKey="K"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "K";
                })}
                helpText={
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber i kommunal sektor."
                    nn="nynorsk"
                  />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Alle" nn="nynorsk" />}
                valueKey="A"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "A";
                })}
                helpText={
                  <Translate
                    nb="Viser tall beregnet på grunnlag av dem som jobber i både privat, statlig og kommunal sektor."
                    nn="nynorsk"
                  />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Per år" nn="nynorsk" />,
                    selected: Tidsenhet === "Årlig",
                    valueKey: "Årlig",
                    helptext: (
                      <Translate
                        nb="Viser sum lønn utbetalt i året."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Per måned" nn="nynorsk" />,
                    selected: Tidsenhet === "Månedlig",
                    valueKey: "Månedlig",
                    helptext: (
                      <Translate
                        nb="Viser sum lønn utbetalt månedlig."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Per time" nn="nynorsk" />,
                    selected: Tidsenhet === "Ca. timelønn",
                    valueKey: "Ca. timelønn",
                    helptext: (
                      <Translate
                        nb="Viser sum lønn utbetalt per time."
                        nn="nynorsk"
                      />
                    ),
                  },
                ]}
                name="tidsenhet"
                onChange={event => this.onFilterClicked(event, "Tidsenhet")}
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Brutto" nn="nynorsk" />,
                    selected: Lønn === "Brutto",
                    valueKey: "Brutto",
                    helptext: (
                      <Translate
                        nb="Viser sum lønn utbetalt i brutto, eksklusive overtid."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Inklusiv overtid" nn="nynorsk" />,
                    selected: Lønn === "Med overtid",
                    valueKey: "Med overtid",
                    helptext: (
                      <Translate
                        nb="Viser sum lønn utbetalt inklusive overtid."
                        nn="nynorsk"
                      />
                    ),
                  },
                ]}
                name="lønn"
                onChange={event => this.onFilterClicked(event, "Lønn")}
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Median" nn="nynorsk" />,
                    selected: StatistiskMål === "Median",
                    valueKey: "Median",
                    helptext: (
                      <Translate
                        nb="Viser utregnet median for lønn utbetalt."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Gjennomsnitt" nn="nynorsk" />,
                    selected: StatistiskMål === "Gjennomsnitt",
                    valueKey: "Gjennomsnitt",
                    helptext: (
                      <Translate
                        nb="Viser gjennomsnittlig lønn utbetalt."
                        nn="nynorsk"
                      />
                    ),
                  },
                ]}
                name="statistiskmål"
                onChange={event => this.onFilterClicked(event, "StatistiskMål")}
              />
            </ul>
            <HeaderModalKjonn
              kjønn={Kjønn}
              onFilterClicked={this.onFilterClicked}
            />
          </div>
        </div>
      );

    return (
      <div>
        <div className={`${styles.visualizationheader_container}`}>
          <div className={`${styles.visualizationheader_container_header}`} />
          <div
            className={`${styles.visualizationheader_container_header__title}`}
          >
            <Translate nb="Lønn" nn="nynorsk" />{" "}
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
                      <Translate nb="Begge" nn="nynorsk" />{" "}
                    </span>
                  ) : Arbeidstid === "D" ? (
                    <span>
                      <Translate nb="Deltid" nn="nynorsk" />{" "}
                    </span>
                  ) : (
                    <span key={Arbeidstid}>
                      <Translate nb="Heltid" nn="nynorsk" />{" "}
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
                            {text} <Translate nb="Alle" nn="nynorsk" />{" "}
                          </span>
                        );
                      case "K":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Kommunal" nn="nynorsk" />{" "}
                          </span>
                        );
                      case "P":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Privat" nn="nynorsk" />{" "}
                          </span>
                        );
                      case "S":
                        return (
                          <span key={d}>
                            {text} <Translate nb="Statlig" nn="nynorsk" />{" "}
                          </span>
                        );
                    }
                  })}
                </li>
                <li>
                  {(Arbeidstid.length > 0 || Sektor.length > 0 ? ", " : "") +
                    Tidsenhet}
                </li>
                <li>{", " + Lønn}</li>
                <li>{", " + StatistiskMål}</li>
                <li>
                  {Kjønn === "A" ? (
                    <span>
                      {","} <Translate nb="Alle" nn="nynorsk" />{" "}
                    </span>
                  ) : (
                    <span>
                      {","} <Translate nb="Kvinner og menn" nn="nynorsk" />{" "}
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
