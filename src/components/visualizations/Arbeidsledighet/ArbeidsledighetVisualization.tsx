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
import styles from "./ArbeidsledighetVisualization.module.scss";
import Translate from "../../app/Translate";

type Props = {
  data: ArbeidsledighetObject;
  fullført: Fullført[];
  visning: Visning;
  høyesteLedighet: number;
  ledighetsintervaller: Ledighetsintervall[];
};

interface IDictionary {
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

  render() {
    const {
      fullført,
      visning,
      ledighetsintervaller,
      høyesteLedighet,
    } = this.props;
    var dataArr = {} as IDictionary;
    var emptyResults = 0;
    fullført.map(f => {
      if (f === "710") {
        dataArr[f] = null;
        emptyResults++;
      } else {
        dataArr[f] = this.getDataQuery(f);
        if (dataArr[f] == null) emptyResults++;
      }
    });

    if (emptyResults == fullført.length) return <NoData />;

    var intervaller = {} as IDictionary;
    for (var i = 0; i < fullført.length; i++) {
      //console.log(dataArr[fullført[i]]);
      if (fullført[i] === "710") continue;

      ledighetsintervaller.forEach(element => {
        if (
          dataArr[fullført[i]] > element.verdi.fra &&
          dataArr[fullført[i]] < element.verdi.til
        ) {
          intervaller[fullført[i]] = element.text;
        }
      });
    }

    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.arbeidsledighetvisualization}`}>
          {fullført.map(x => {
            return (
              <li>
                {intervaller[x]} <Translate nb="for" />{" "}
                {x === "A" ? (
                  <Translate nb="alle totalt" />
                ) : (
                  <Translate nb="nyutdanna" />
                )}
              </li>
            );
          })}
        </div>
      </div>
    );

    /* Lag ny komponent for vertikal percentage bar
       Denne skal være logaritmisk
       Kun vise 1-3 og alle
       Vise tekst fra intervaller under       
    */

    /****OLD DATA******/
    let fullfortArray: Fullført[] = [];

    // if (fullført.some(f => f === "A")) fullfortArray[0] = "A";
    // fullført.map(f => {
    //   if (f !== "A") fullfortArray.push(f);
    //   dataArr.push(this.getDataQuery(f));
    // });

    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.arbeidsledighetvisualization}`}>
          {fullfortArray.map(f => {
            let data = this.getDataQuery(f);
            return (
              <div key={f}>
                <div className={`${styles.arbeidsledighetvisualization_text}`}>
                  {f === "A" ? (
                    <Translate nb="totalt" />
                  ) : f === "13" ? (
                    <Translate nb="utdannet 1-3 år siden" />
                  ) : (
                    <Translate nb="utdannet 7-10 år siden" />
                  )}
                </div>
                {visning === "Andel" ? (
                  !data ? (
                    <div
                      className={`${
                        styles.arbeidsledighetvisualization_noData
                      }`}
                    >
                      <Translate nb="Ingen data" />
                    </div>
                  ) : (
                    <div
                      className={`${
                        styles.arbeidsledighetvisualization_percentage
                      }`}
                    >
                      <PercentageBar
                        value={data}
                        maxPercentageEqualsTen={true}
                      />
                    </div>
                  )
                ) : (
                  <div
                    className={`${styles.arbeidsledighetvisualization_kjonn}`}
                  >
                    <div
                      className={
                        styles.arbeidsledighetvisualization_kjonn_container
                      }
                    >
                      <div
                        className={
                          styles.arbeidsledighetvisualization_kjonn_container_text
                        }
                      >
                        {data === null ? <Translate nb="Ingen data" /> : data}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArbeidsledighetVisualization;
