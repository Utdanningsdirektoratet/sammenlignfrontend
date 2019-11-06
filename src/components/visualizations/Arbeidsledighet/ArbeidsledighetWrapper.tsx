import React, { Component } from "react";
import { ArbeidsledighetElement } from "../../../data/ApiTypes";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import Translate from "../../app/Translate";
import Header from "../Shared/HeaderVisualizations";
import styles from "./ArbeidsledighetVisualization.module.scss";

export type VisualizationHeaderConfigArbeidsledighet = {
  Fullført: Fullført[];
  Visning: Visning;
  Gjennomsnittsledighet: number;
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
    Ledighetsintervaller: [
      {
        verdi: { fra: 0.0, til: 0.0 },
        text: <Translate nb="Ingen tall" />,
      },
      {
        verdi: { fra: 0.0, til: 0.5 },
        text: <Translate nb="Svært lav" />,
      },
      {
        verdi: { fra: 0.5, til: 1.0 },
        text: <Translate nb="Lav" />,
      },
      {
        verdi: { fra: 1.0, til: 2.5 },
        text: <Translate nb="Middels" />,
      },
      {
        verdi: { fra: 2.5, til: 5.0 },
        text: <Translate nb="Høy" />,
      },
      {
        verdi: { fra: 5.0, til: 100.0 },
        text: <Translate nb="Svært høy" />,
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

  getDataQuery = (fullført: Fullført, data: any) => {
    let qry = "arbeidsledige";

    switch (this.state.Visning) {
      case "Andel":
        qry += "_andel";
        break;
      case "Antall":
        qry += "_antall";
        break;
      default:
        break;
    }

    switch (fullført) {
      case "710":
        qry += fullført;
        break;
      case "13":
        qry += fullført;
        break;
      case "A":
        break;
    }

    let num = (data as any)[qry];
    if (!num) return null;

    if (this.state.Visning === "Andel") {
      num = num * 100;

      num = num.toFixed(2);
    }

    return num;
  };

  renderCell = (uno_id: string) => {
    const { data } = this.props;
    const config = this.state;
    const d = data[uno_id];
    if (!d) return <NoData key={uno_id} />;
    const code = Object.keys(d)[0];
    if (!code) return <NoData key={uno_id} />;

    var values: number[] = [];
    this.props.uno_ids.forEach(uno_id => {
      var d = data[uno_id];
      if (!d) return;
      var code = Object.keys(d)[0];
      if (!code) return;
      this.state.Fullført.forEach(f => {
        var data = this.getDataQuery(f, d[code]);
        if (data != null) values.push(+data as number);
      });
    });

    return (
      <ArbeidsledighetVisualization
        key={uno_id}
        data={d[code]}
        fullført={config.Fullført}
        visning={config.Visning}
        ledighetsintervaller={config.Ledighetsintervaller}
        maxValue={Math.max(...values)}
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
        <label className={styles.arbeidsledighetvisualization_dataSource}><Translate nb="Kilde: SSB"></Translate></label>
      </div>
    );
  }
}

export default ArbeidsledighetWrapper;
