import React, { Component } from "react";

import {
  Fullført,
  Visning,
  Ledighetsintervall,
} from "./ArbeidsledighetWrapper";
import { ArbeidsledighetObject } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import PercentageBar from "../Generic/PercentageBar";
import VerticalPercentageBar, {
  VerticalPercentageBarValue,
} from "../Generic/VerticalPercentageBar";
import styles from "./ArbeidsledighetVisualization.module.scss";
import Translate from "../../app/Translate";
import { ReactComponent as Alle } from "../Generic/AlleIcon.svg";
import { ReactComponent as Nyutdannet } from "../Generic/NyutdannaIcon.svg";

type Props = {
  data: ArbeidsledighetObject;
  fullført: Fullført[];
  visning: Visning;
  ledighetsintervaller: Ledighetsintervall[];
  maxValue: number;
};

export interface IDictionary {
  [index: string]: any;
}

class ArbeidsledighetVisualization extends Component<Props> {
  getDataQuery = (fullført: Fullført) => {
    let qry = "arbeidsledige";

    switch (this.props.visning) {
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

    let num = (this.props.data as any)[qry];
    if (!num) return null;

    if (this.props.visning === "Andel") {
      num = num * 100;

      num = num.toFixed(2);
    }

    return num;
  };

  renderOption = (x: string, dataArr: any, intervaller: any) => {
    let riskClass = "";
    switch (intervaller[x].props.nb) {    // need to chane .nb to a variable which knows what language we should use. Currently it only works with nb.
      case "Lav":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_low}`;
        break;
      case "Middels":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_medium}`;
        break;
      case "Høy":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_high}`;
        break;
      case "Svært høy":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_vHigh}`;
        break;
      case "Svært lav":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_vLow}`;
        break;
      case "Ingen tall":
        riskClass = "";
        break;
      default:
        break;
    }
    return (
      <div className={`${styles.arbeidsledighetvisualization_list_text}`}>
        <h3 className={`${styles.arbeidsledighetvisualization_heading}`}>
          {x === "A" ? <Translate nb="Alle totalt: "></Translate> : <Translate nb="Nyutdanna: "></Translate>}

        </h3>
        <p className={`${styles.arbeidsledighetvisualization_percentageText} ${riskClass}`}>{dataArr[x]}</p>
        <p className={`${styles.arbeidsledighetvisualization_percentageRisk} ${riskClass}`}>{intervaller[x]}</p>
      </div>
    )
  }

  render() {
    const { fullført, visning, ledighetsintervaller, maxValue } = this.props;
    var dataArr = {} as IDictionary;
    var emptyResults = 0;
    fullført.map(f => {
      dataArr[f] = this.getDataQuery(f);
      if (dataArr[f] == null) emptyResults++;
    });

    if (emptyResults == fullført.length) return <NoData />;

    var intervaller = {} as IDictionary;
    for (var i = 0; i < fullført.length; i++) {
      var foundIntervals = 0;
      ledighetsintervaller.forEach(element => {
        if (foundIntervals == fullført.length) return;
        if (
          dataArr[fullført[i]] >= element.verdi.fra &&
          dataArr[fullført[i]] < element.verdi.til
        ) {
          intervaller[fullført[i]] = element.text;
        }
      });
    }
    let full = fullført.slice(0);
    full = full.reverse();
    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.arbeidsledighetvisualization}`}>
          {/* <VerticalPercentageBar
            values={{
              left: { value: dataArr["A"], text: <Translate nb="A" /> },
              right: {
                value: dataArr["13"],
                text: <Translate nb="N" />,
              },
            }}
            max={maxValue}
          /> */}
          <div>
            {full.map(x => {
              if (dataArr[x] == null) return null;
              return (
                <li
                  key={x}
                  className={`${styles.arbeidsledighetvisualization_list}`}
                >
                  {/* {x == "A" ? <Alle /> : <Nyutdannet />} */}
                  {/* <span
                    className={`${
                      styles.arbeidsledighetvisualization_list_text
                      }`}
                  >
                    {x == "A" &&
                      <Translate nb="Alle: " />
                      && dataArr["A"]
                    }
                    {x != "A" &&
                      <Translate nb="Nyutdanna: " />
                      && dataArr["13"]
                    } */}
                  {this.renderOption(x, dataArr, intervaller)}
                  {/* {x == "A" ? (
                      <Translate nb="Alle: " />

                    ) : (
                        <Translate nb="Nyutdanna: " />
                      )} */}
                  {/* {dataArr["13"]} */}
                  {/* </span> */}
                </li>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ArbeidsledighetVisualization;
