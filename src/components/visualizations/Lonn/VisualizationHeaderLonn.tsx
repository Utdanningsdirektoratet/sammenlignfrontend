import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";

export type VisualizationHeaderConfigLonn = {
  Arbeidstid: Arbeidstid;
  Sektor: Sektor[];
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Kjønn: Kjønn;
  ssbSektor: { [uno_id: string]: string };
};

export type Tidsenhet = "Årlig" | "Månedlig" | "Ca. timelønn";
export type Lønn = "Brutto" | "Med overtid";
export type StatistiskMål = "Median" | "Gjennomsnitt";

type Props = {
  config: VisualizationHeaderConfigLonn;
  setConfig: (config: VisualizationHeaderConfigLonn) => void;
};

type State = {
  open: boolean;
};

class VisualizationHeaderLonn extends Component<Props, State> {
  state = { open: false };

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
          <div
            className={`${styles.visualizationheader_container_modal_filters}`}
          >
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Heltid" />,
                    selected: Arbeidstid === "H",
                    valueKey: "H",
                    helptext: (
                      <Translate nb="Viser tall beregnet på grunnlag av dem som jobber heltid." />
                    ),
                  },
                  {
                    text: <Translate nb="Deltid" />,
                    selected: Arbeidstid === "D",
                    valueKey: "D",
                    helptext: (
                      <Translate nb="Viser tall beregnet på grunnlag av dem som jobber deltid." />
                    ),
                  },
                  {
                    text: <Translate nb="Begge" />,
                    selected: Arbeidstid === "A",
                    valueKey: "A",
                    helptext: (
                      <Translate nb="Viser tall beregnet på grunnlag av dem som jobber heltid og deltid." />
                    ),
                  },
                ]}
                name="arbeidstid"
                onChange={event => this.onFilterClicked(event, "Arbeidstid")}
              />
            </ul>
            <ul>
              <Checkbox
                text={<Translate nb="Privat" />}
                valueKey="P"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "P";
                })}
                helpText={
                  <Translate nb="Viser tall beregnet på grunnlag av dem som jobber i privat sektor." />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Statlig" />}
                valueKey="S"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "S";
                })}
                helpText={
                  <Translate nb="Viser tall beregnet på grunnlag av dem som jobber i statlig sektor." />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Kommunal" />}
                valueKey="K"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "K";
                })}
                helpText={
                  <Translate nb="Viser tall beregnet på grunnlag av dem som jobber i kommunal sektor." />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                text={<Translate nb="Alle" />}
                valueKey="A"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "A";
                })}
                helpText={
                  <Translate nb="Viser tall beregnet på grunnlag av dem som jobber i både privat, statlig og kommunal sektor." />
                }
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Per år" />,
                    selected: Tidsenhet === "Årlig",
                    valueKey: "Årlig",
                    helptext: (
                      <Translate nb="Viser sum lønn utbetalt i året." />
                    ),
                  },
                  {
                    text: <Translate nb="Per måned" />,
                    selected: Tidsenhet === "Månedlig",
                    valueKey: "Månedlig",
                    helptext: (
                      <Translate nb="Viser sum lønn utbetalt månedlig." />
                    ),
                  },
                  {
                    text: <Translate nb="Per time" />,
                    selected: Tidsenhet === "Ca. timelønn",
                    valueKey: "Ca. timelønn",
                    helptext: (
                      <Translate nb="Viser sum lønn utbetalt per time." />
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
                    text: <Translate nb="Brutto" />,
                    selected: Lønn === "Brutto",
                    valueKey: "Brutto",
                    helptext: (
                      <Translate nb="Viser sum lønn utbetalt i brutto, eksklusive overtid." />
                    ),
                  },
                  {
                    text: <Translate nb="Inklusiv overtid" />,
                    selected: Lønn === "Med overtid",
                    valueKey: "Med overtid",
                    helptext: (
                      <Translate nb="Viser sum lønn utbetalt inklusive overtid." />
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
                    text: <Translate nb="Median" />,
                    selected: StatistiskMål === "Median",
                    valueKey: "Median",
                    helptext: (
                      <Translate nb="Viser utregnet median for lønn utbetalt." />
                    ),
                  },
                  {
                    text: <Translate nb="Gjennomsnitt" />,
                    selected: StatistiskMål === "Gjennomsnitt",
                    valueKey: "Gjennomsnitt",
                    helptext: (
                      <Translate nb="Viser gjennomsnittlig lønn utbetalt." />
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
                <li>
                  {(Arbeidstid.length > 0 || Sektor.length > 0 ? ", " : "") +
                    Tidsenhet}
                </li>
                <li>{", " + Lønn}</li>
                <li>{", " + StatistiskMål}</li>
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
export default VisualizationHeaderLonn;
