import { Arbeidstid, Sektor } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "./VisualizationHeader.module.scss";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";

type VisualizationHeaderConfigLønn = {
  Arbeidstid: Arbeidstid[];
  Sektor: Sektor[];
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Kjønn: Kjønn[];
};

type Tidsenhet = "Årlig" | "Månedlig" | "Ca. timelønn";
type Lønn = "Brutto" | "Med overtid";
type StatistiskMål = "Median" | "Gjennomsnitt";
type Kjønn = "A" | "K" | "M";

type Props = {
  config: VisualizationHeaderConfigLønn;
  setConfig: (config: any) => void;
};

type State = {
  open: boolean;
  openHelpText: string;
};

class VisualizationHeaderLonn extends Component<Props, State> {
  state = { open: true, openHelpText: "" };

  componentDidMount = () => {
    var config: VisualizationHeaderConfigLønn = {
      Arbeidstid: ["A"],
      Sektor: ["A"],
      Tidsenhet: "Årlig",
      Lønn: "Brutto",
      StatistiskMål: "Median",
      Kjønn: ["A"],
    };

    this.props.setConfig(config);
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.config !== this.props.config) {
      this.forceUpdate();
    }
  }

  onFilterButtonClick = () => {
    if (!this.state.open == false) this.setState({ openHelpText: "" });
    this.setState({ open: !this.state.open });
  };

  onFilterClicked = (event: any, key: string) => {
    let config = this.props.config;
    var value = event.target.id;
    switch (key) {
      case "Arbeidstid":
        var index = config.Arbeidstid.indexOf(value);
        if (index > -1) {
          config.Arbeidstid.splice(index, 1);
        } else {
          config.Arbeidstid.push(value);
        }
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
        var index = config.Kjønn.indexOf(value);
        if (index > -1) {
          config.Kjønn.splice(index, 1);
        } else {
          config.Kjønn.push(value);
        }
        break;
      default:
        return;
    }
    this.props.setConfig(config);
  };

  onHelpTextClick = (open: boolean, key: string) => {
    if (open) this.setState({ openHelpText: key });
    else this.setState({ openHelpText: "" });
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
                onClick={() => this.onFilterButtonClick()}
              />
            </div>
          </div>
          <div
            className={`${styles.visualizationheader_container_modal_filters}`}
          >
            <ul>
              <Checkbox
                textNb="Heltid"
                textNn="nynorsk"
                valueKey="H"
                isSelected={Arbeidstid.some((a: Arbeidstid) => {
                  return a === "H";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber heltid."
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidstid-H")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidstid-H"}
                onChange={event => this.onFilterClicked(event, "Arbeidstid")}
              />
              <Checkbox
                textNb="Deltid"
                textNn="nynorsk"
                valueKey="D"
                isSelected={Arbeidstid.some((a: Arbeidstid) => {
                  return a === "D";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber deltid."
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidstid-D")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidstid-D"}
                onChange={event => this.onFilterClicked(event, "Arbeidstid")}
              />
              <Checkbox
                textNb="Begge"
                textNn="nynorsk"
                valueKey="A"
                isSelected={Arbeidstid.some((a: Arbeidstid) => {
                  return a === "A";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber heltid og deltid."
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidstid-A")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidstid-A"}
                onChange={event => this.onFilterClicked(event, "Arbeidstid")}
              />
            </ul>
            <ul>
              <Checkbox
                textNb="Privat"
                textNn="nynorsk"
                valueKey="P"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "P";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber i privat sektor."
                onHelpTextClick={open => this.onHelpTextClick(open, "Sektor-P")}
                helpTextOpen={this.state.openHelpText === "Sektor-P"}
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                textNb="Statlig"
                textNn="nynorsk"
                valueKey="S"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "S";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber i statlig sektor."
                onHelpTextClick={open => this.onHelpTextClick(open, "Sektor-S")}
                helpTextOpen={this.state.openHelpText === "Sektor-S"}
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                textNb="Kommunal"
                textNn="nynorsk"
                valueKey="K"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "K";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber i kommunal sektor."
                onHelpTextClick={open => this.onHelpTextClick(open, "Sektor-K")}
                helpTextOpen={this.state.openHelpText === "Sektor-K"}
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
              <Checkbox
                textNb="Alle"
                textNn="nynorsk"
                valueKey="A"
                isSelected={Sektor.some((a: Sektor) => {
                  return a === "A";
                })}
                helpText="Viser tall beregnet på grunnlag av dem som jobber i både privat, statlig og kommunal sektor."
                onHelpTextClick={open => this.onHelpTextClick(open, "Sektor-A")}
                helpTextOpen={this.state.openHelpText === "Sektor-A"}
                onChange={event => this.onFilterClicked(event, "Sektor")}
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    textNb: "Per år",
                    textNn: "nynorsk",
                    selected: Tidsenhet === "Årlig",
                    valueKey: "Årlig",
                    helpText: "Viser sum lønn utbetalt i året.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "Tidsenhet-Årlig"),
                    helpTextOpen: this.state.openHelpText === "Tidsenhet-Årlig",
                  },
                  {
                    textNb: "Per måned",
                    textNn: "nynorsk",
                    selected: Tidsenhet === "Månedlig",
                    valueKey: "Månedlig",
                    helpText: "Viser sum lønn utbetalt månedlig.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "Tidsenhet-Månedlig"),
                    helpTextOpen:
                      this.state.openHelpText === "Tidsenhet-Månedlig",
                  },
                  {
                    textNb: "Per time",
                    textNn: "nynorsk",
                    selected: Tidsenhet === "Ca. timelønn",
                    valueKey: "Ca. timelønn",
                    helpText: "Viser sum lønn utbetalt per time.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "Tidsenhet-Ca. timelønn"),
                    helpTextOpen:
                      this.state.openHelpText === "Tidsenhet-Ca. timelønn",
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
                    textNb: "Brutto",
                    textNn: "nynorsk",
                    selected: Lønn === "Brutto",
                    valueKey: "Brutto",
                    helpText:
                      "Viser sum lønn utbetalt i brutto, eksklusive overtid.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "Lønn-Brutto"),
                    helpTextOpen: this.state.openHelpText === "Lønn-Brutto",
                  },
                  {
                    textNb: "Inklusiv overtid",
                    textNn: "nynorsk",
                    selected: Lønn === "Med overtid",
                    valueKey: "Med overtid",
                    helpText:
                      "Viser sum lønn utbetalt i brutto, inklusive overtid.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "Lønn-Med overtid"),
                    helpTextOpen:
                      this.state.openHelpText === "Lønn-Med overtid",
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
                    textNb: "Median",
                    textNn: "nynorsk",
                    selected: StatistiskMål === "Median",
                    valueKey: "Median",
                    helpText: "Viser utregnet median for lønn utbetalt.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "StatistiskMål-Median"),
                    helpTextOpen:
                      this.state.openHelpText === "StatistiskMål-Median",
                  },
                  {
                    textNb: "Gjennomsnitt",
                    textNn: "nynorsk",
                    selected: StatistiskMål === "Gjennomsnitt",
                    valueKey: "Gjennomsnitt",
                    helpText: "Viser gjennomsnittlig lønn utbetalt.",
                    onHelpTextClick: open =>
                      this.onHelpTextClick(open, "StatistiskMål-Gjennomsnitt"),
                    helpTextOpen:
                      this.state.openHelpText === "StatistiskMål-Gjennomsnitt",
                  },
                ]}
                name="statistiskmål"
                onChange={event => this.onFilterClicked(event, "StatistiskMål")}
              />
            </ul>

            <ul>
              <Checkbox
                textNb="Kvinner"
                textNn="nynorsk"
                valueKey="K"
                isSelected={Kjønn.some((a: Kjønn) => {
                  return a === "K";
                })}
                helpText="Viser tall beregnet på grunnlag av kvinner."
                onHelpTextClick={open => this.onHelpTextClick(open, "Kjønn-K")}
                helpTextOpen={this.state.openHelpText === "Kjønn-K"}
                onChange={event => this.onFilterClicked(event, "Kjønn")}
              />
              <Checkbox
                textNb="Menn"
                textNn="nynorsk"
                valueKey="M"
                isSelected={Kjønn.some((a: Kjønn) => {
                  return a === "M";
                })}
                helpText="Viser tall beregnet på grunnlag av menn."
                onHelpTextClick={open => this.onHelpTextClick(open, "Kjønn-M")}
                helpTextOpen={this.state.openHelpText === "Kjønn-M"}
                onChange={event => this.onFilterClicked(event, "Kjønn")}
              />
              <Checkbox
                textNb="Begge"
                textNn="nynorsk"
                valueKey="A"
                isSelected={Kjønn.some((a: Kjønn) => {
                  return a === "A";
                })}
                helpText="Viser tall beregnet på grunnlag av både kvinner og menn."
                onHelpTextClick={open => this.onHelpTextClick(open, "Kjønn-A")}
                helpTextOpen={this.state.openHelpText === "Kjønn-A"}
                onChange={event => this.onFilterClicked(event, "Kjønn")}
              />
            </ul>
          </div>
        </div>
      );

    return (
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
                {Arbeidstid.map((d: string, i: number) => {
                  let text = "";
                  if (i > 0) text = "/";
                  switch (d) {
                    case "A":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Begge" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "D":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Deltid" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "H":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Heltid" nn="nynorsk" />{" "}
                        </span>
                      );
                  }
                })}
              </li>
              <li>
                {Sektor.map((d: string, i: number) => {
                  let text = "";
                  if (Arbeidstid.length > 0 && i === 0) text = ",";
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
                {Kjønn.map((d: string, i: number) => {
                  let text = "";
                  if (Arbeidstid.length > 0 && i === 0) text = ",";
                  if (i > 0) text = "/";
                  switch (d) {
                    case "K":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Kvinner" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "M":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Menn" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "A":
                      return (
                        <span key={d}>
                          {text} <Translate nb="Begge" nn="nynorsk" />{" "}
                        </span>
                      );
                  }
                })}
              </li>
            </ul>
            )
          </span>
          <span
            className={
              this.state.open
                ? `${styles.visualizationheader_container_header__title_icon__hidden +
                    " " +
                    styles.visualizationheader_container_header__title_icon}`
                : `${styles.visualizationheader_container_header__title_icon}`
            }
            onClick={() => this.onFilterButtonClick()}
          />
        </div>
        {Modal}
      </div>
    );
  }
}

export class VisualizationHeaderWrapper extends Component<any, any> {
  state: any = {};
  setConfig = (config: any) => {
    this.setState(config);
  };

  render() {
    return (
      <VisualizationHeaderLonn config={this.state} setConfig={this.setConfig} />
    );
  }
}

export default VisualizationHeaderLonn;
