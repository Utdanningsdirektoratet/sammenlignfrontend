import { Arbeidstid, Sektor, Kjønn } from "../../../data/ApiTypes";
import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { SammenligningTemplate } from "../../comparisonsConfig";

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
          <div
            className={`${styles.visualizationheader_container_modal_filters}`}
          >
            <ul>
              <Checkbox
                text={<Translate nb="7-10 år etter endt utdannelse" />}
                valueKey="710"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "710";
                })}
                helpText={
                  <Translate nb="Viser antall arbeidsledige 7-10 år etter endt utdannelse." />
                }
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
              <Checkbox
                text={<Translate nb="1-3 år etter endt utdannelse" />}
                valueKey="13"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "13";
                })}
                helpText={
                  <Translate nb="Viser antall arbeidsledige 1-3 år etter endt utdannelse." />
                }
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
              <Checkbox
                text={<Translate nb="All" />}
                valueKey="A"
                isSelected={Fullført.some((a: Fullført) => {
                  return a === "A";
                })}
                helpText={<Translate nb="Viser antall arbeidsledige." />}
                onChange={event =>
                  this.onFilterClicked(event, "Arbeidsledighet")
                }
              />
            </ul>
            <ul>
              <RadioButtonGroup
                group={[
                  {
                    text: <Translate nb="Andel" />,
                    selected: Visning === "Andel",
                    valueKey: "Andel",
                    helptext: (
                      <Translate nb="Viser andel arbeidsledige som prosent." />
                    ),
                  },
                  {
                    text: <Translate nb="Antall" />,
                    selected: Visning === "Antall",
                    valueKey: "Antall",
                    helptext: <Translate nb="Viser antall arbeidsledige." />,
                  },
                ]}
                name="antall"
                onChange={event => this.onFilterClicked(event, "Visning")}
              />
            </ul>
            <HeaderModalKjonn
              kjønn={Kjønn}
              onFilterClicked={this.onFilterClicked}
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
      </div>
    );
  }
}

export default VisualizationHeaderArbeidsledighet;
