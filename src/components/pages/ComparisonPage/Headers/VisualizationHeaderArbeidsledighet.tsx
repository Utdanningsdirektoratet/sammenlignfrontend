import { Arbeidstid, Sektor, Kjønn } from "../../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../../app/Translate";
import styles from "./VisualizationHeader.module.scss";
import { ComparisonHeaderProps } from "../ComparisonHeader";
import HeaderModalKjonn from "./HeaderModalKjonn";
import Checkbox from "../../../defaultComponents/Checkbox";

export type VisualizationHeaderConfigArbeidsledighet = {
  Kjønn: Kjønn[];
  Fullført: Fullført[];
};

type Fullført = "710" | "13" | "A";
type State = {
  open: boolean;
  openHelpText: string;
};

class VisualizationHeaderArbeidsledighet extends Component<
  ComparisonHeaderProps<VisualizationHeaderConfigArbeidsledighet>,
  State
> {
  state = { open: false, openHelpText: "" };

  componentDidMount = () => {
    var config: VisualizationHeaderConfigArbeidsledighet = {
      Kjønn: ["A"],
      Fullført: ["A"],
    };

    this.props.setConfig(config);
  };

  componentWillReceiveProps(
    nextProps: ComparisonHeaderProps<VisualizationHeaderConfigArbeidsledighet>
  ) {
    if (nextProps.config !== this.props.config) {
      this.forceUpdate();
    }
  }

  onFilterButtonClick = (open: boolean) => {
    if (open == false) this.setState({ openHelpText: "" });
    this.setState({ open: open });
  };

  onHelpTextClick = (open: boolean, key: string) => {
    if (open) this.setState({ openHelpText: key });
    else this.setState({ openHelpText: "" });
  };

  onFilterClicked = (event: any, key: string) => {
    let config = this.props.config;
    var value = event.target.id;
    switch (key) {
      case "Kjønn":
        var index = config.Kjønn.indexOf(value);
        if (index > -1) {
          config.Kjønn.splice(index, 1);
        } else {
          config.Kjønn.push(value);
        }
        break;
      case "Arbeidsledighet":
        var index = config.Fullført.indexOf(value);
        if (index > -1) {
          config.Fullført.splice(index, 1);
        } else {
          config.Fullført.push(value);
        }
        break;
      default:
        return;
    }
    this.props.setConfig(config);
  };

  render() {
    const { Kjønn, Fullført } = this.props.config;
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
              <Translate nb="Arbeidsledighet" nn="nynorsk" /> -{" "}
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
              <Checkbox
                text={
                  <Translate nb="7-10 år etter endt utdannelse" nn="nynorsk" />
                }
                valueKey="710"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "710";
                })}
                helpText={
                  <Translate
                    nb="Viser antall arbeidsledige 7-10 år etter endt utdannelse."
                    nn="nynorsk"
                  />
                }
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidsledighet-710")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidsledighet-710"}
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
              <Checkbox
                text={
                  <Translate nb="1-3 år etter endt utdannelse" nn="nynorsk" />
                }
                valueKey="13"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "13";
                })}
                helpText={
                  <Translate
                    nb="Viser antall arbeidsledige 1-3 år etter endt utdannelse."
                    nn="nynorsk"
                  />
                }
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidsledighet-13")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidsledighet-13"}
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
              <Checkbox
                text={<Translate nb="All" nn="nynorsk" />}
                valueKey="A"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "A";
                })}
                helpText={
                  <Translate nb="Viser antall arbeidsledige." nn="nynorsk" />
                }
                onHelpTextClick={open =>
                  this.onHelpTextClick(open, "Arbeidsledighet-A")
                }
                helpTextOpen={this.state.openHelpText === "Arbeidsledighet-A"}
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
            </ul>
            <HeaderModalKjonn
              kjønn={Kjønn}
              onHelpTextClick={this.onHelpTextClick}
              onFilterClicked={this.onFilterClicked}
              openHelpText={this.state.openHelpText}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={`${styles.visualizationheader_container}`}>
        <div className={`${styles.visualizationheader_container_header}`} />
        <div
          className={`${styles.visualizationheader_container_header__title}`}
        >
          <Translate nb="Arbeidsledighet" nn="nynorsk" />{" "}
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
                          {text} <Translate nb="7-10 år" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "13":
                      return (
                        <span key={f}>
                          {text} <Translate nb="1-3 år" nn="nynorsk" />{" "}
                        </span>
                      );
                    case "A":
                      return (
                        <span key={f}>
                          {text} <Translate nb="Alle" nn="nynorsk" />{" "}
                        </span>
                      );
                  }
                })}
              </li>
              <li>
                {Kjønn.map((d: string, i: number) => {
                  let text = "";
                  if (Fullført.length > 0 && i === 0) text = ",";
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
            className={`${
              styles.visualizationheader_container_header__title_icon
            }`}
            onClick={() => this.onFilterButtonClick(true)}
          />
        </div>
        {Modal}
      </div>
    );
  }
}

export default VisualizationHeaderArbeidsledighet;
