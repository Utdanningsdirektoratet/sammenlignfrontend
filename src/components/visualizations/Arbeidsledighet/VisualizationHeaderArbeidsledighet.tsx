import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import { ComparisonHeaderProps } from "../Shared/ComparisonHeader";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";

export type VisualizationHeaderConfigArbeidsledighet = {
  Kjønn: Kjønn;
  Fullført: Fullført[];
  Visning: Visning;
  rows: string[];
};

export type Fullført = "710" | "13" | "A";
export type Visning = "Andel" | "Antall";
type State = {
  open: boolean;
};

class VisualizationHeaderArbeidsledighet extends Component<
  ComparisonHeaderProps<VisualizationHeaderConfigArbeidsledighet>,
  State
> {
  state = { open: false };

  componentDidMount = () => {
    var config: VisualizationHeaderConfigArbeidsledighet = {
      Kjønn: "A",
      Fullført: ["A"],
      Visning: "Antall",
      rows: [""],
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
    this.setState({ open: open });
  };

  onFilterClicked = (event: any, key: string) => {
    let config = this.props.config;
    var value = event.target.id;
    switch (key) {
      case "Kjønn":
        config.Kjønn = value;
        break;
      case "Arbeidsledighet":
        var index = config.Fullført.indexOf(value);
        if (index > -1) {
          config.Fullført.splice(index, 1);
        } else {
          config.Fullført.push(value);
        }
        config.Fullført.sort();
        break;
      case "Visning":
        config.Visning = value;
        break;
      default:
        return;
    }

    this.props.setConfig(config);
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
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Andel" nn="nynorsk" />,
                    selected: Visning === "Andel",
                    valueKey: "Andel",
                    helptext: (
                      <Translate
                        nb="Viser andel arbeidsledige som prosent."
                        nn="nynorsk"
                      />
                    ),
                  },
                  {
                    text: <Translate nb="Antall" nn="nynorsk" />,
                    selected: Visning === "Antall",
                    valueKey: "Antall",
                    helptext: (
                      <Translate
                        nb="Viser antall arbeidsledige."
                        nn="nynorsk"
                      />
                    ),
                  },
                ]}
                name="antall"
                onChange={event => this.onFilterClicked(event, "Visning")}
              />
            </ul>
            <HeaderModalKjonn
              kjønn={Kjønn}
              onFilterClicked={this.onFilterClicked}
              showHelpText={true}
            />
          </div>
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
                <li>{", " + Visning}</li>
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

export default VisualizationHeaderArbeidsledighet;
