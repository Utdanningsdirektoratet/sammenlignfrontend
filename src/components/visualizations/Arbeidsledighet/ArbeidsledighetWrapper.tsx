import React, { Component } from "react";
import { ArbeidsledighetElement } from "../../../data/ApiTypes";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import Translate from "../../app/Translate";
import Header from "../Shared/HeaderVisualizations";

export type VisualizationHeaderConfigArbeidsledighet = {
  Fullført: Fullført[];
  Visning: Visning;
  Gjennomsnittsledighet: number;
  HøyesteLedighet: number;
  Ledighetsintervaller: Ledighetsintervall[];
};
export type Fullført = "710" | "13" | "A";
export type Visning = "Andel" | "Antall";
export type Ledighetsintervall = {
  verdi: LedighetsintervallVerdi;
  text: JSX.Element;
};
export type LedighetsintervallVerdi = { fra: number; til: number };

class ArbeidsledighetWrapper extends React.Component<
  ComparisonComponentProps<ArbeidsledighetElement>,
  VisualizationHeaderConfigArbeidsledighet
> {
  setConfig = (config: VisualizationHeaderConfigArbeidsledighet) => {
    this.setState(config);
  };
  state: VisualizationHeaderConfigArbeidsledighet = {
    Fullført: ["13", "A"],
    Visning: "Andel",
    Gjennomsnittsledighet: 3.7,
    HøyesteLedighet: 12.5,
    Ledighetsintervaller: [
      {
        verdi: { fra: 0.0, til: 0.0 },
        text: <Translate nb="Vi har ikke tall for ledighet for " />,
      },
      {
        verdi: { fra: 0.0, til: 0.5 },
        text: <Translate nb="Svært lav ledighet" />,
      },
      {
        verdi: { fra: 0.5, til: 1.0 },
        text: <Translate nb="Lav ledighet" />,
      },
      {
        verdi: { fra: 1.0, til: 2.5 },
        text: <Translate nb="Middels ledighet" />,
      },
      {
        verdi: { fra: 2.5, til: 5.0 },
        text: <Translate nb="Høy ledighet" />,
      },
      {
        verdi: { fra: 5.0, til: 100.0 },
        text: <Translate nb="Svært høy ledighet" />,
      },
    ],
  };

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
      case "Arbeidsledighet":
        const index = this.state.Fullført.indexOf(value);
        if (index > -1) {
          this.setConfig({
            ...this.state,
            Fullført: this.state.Fullført.filter(f => f !== value),
          });
        } else {
          this.setConfig({
            ...this.state,
            Fullført: [...this.state.Fullført, value].sort(),
          });
        }

        break;
      case "Visning":
        let config = { ...this.state };
        config.Visning = value;
        this.setState(config);
        break;
      default:
        return;
    }
  };
  renderCell = (uno_id: string) => {
    const { data } = this.props;
    const config = this.state;
    const d = data[uno_id];
    if (!d) return <NoData key={uno_id} />;
    const code = Object.keys(d)[0];
    if (!code) return <NoData key={uno_id} />;

    return (
      <ArbeidsledighetVisualization
        key={uno_id}
        data={d[code]}
        fullført={config.Fullført}
        visning={config.Visning}
        høyesteLedighet={config.HøyesteLedighet}
        ledighetsintervaller={config.Ledighetsintervaller}
      />
    );
  };
  render() {
    const { data, uno_ids, widget } = this.props;
    if (!data || Object.keys(data).length === 0) return <NoData />;
    if (widget) {
      const uno_id = uno_ids[0];
      return <div>{this.renderCell(uno_id)}</div>;
    }
    return (
      <div>
        <Header
          mainHeader={<Translate nb="Arbeidsledighet" />}
          secondHeader={
            <span>
              <Translate nb="Hvor stor endel er registrert som arbeidsledige?" />
              <br />
              <Translate nb="Gjennomsnittsledigheten er " />
              {this.state.Gjennomsnittsledighet + "%"}
            </span>
          }
        />
        <ComparisonRow>{uno_ids.map(this.renderCell)}</ComparisonRow>
      </div>
    );
  }
}

export default ArbeidsledighetWrapper;
