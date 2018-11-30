import React, { Component } from "react";
import { Kjønn, EntrepenorObject } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import PercentageBar from "../Generic/PercentageBar";
import styles from "./EntreprenorskapVisualization.module.scss";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";
import { Fullført, Visning } from "../Arbeidsledighet/ArbeidsledighetWrapper";
import Translate from "../../app/Translate";

type Props = {
  data: EntrepenorObject;
  fullført: Fullført[];
  visning: Visning;
};

class EntreprenorskapVisualization extends Component<Props> {
  getDataQuery = (fullført: Fullført) => {
    let qry = "selvstendige";

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
    const { visning, fullført } = this.props;
    let fullfortArray: Fullført[] = [];
    let dataArr: any[] = [];
    if (fullført.some(f => f === "A")) fullfortArray[0] = "A";
    fullført.map(f => {
      if (f !== "A") fullfortArray.push(f);
      dataArr.push(this.getDataQuery(f));
    });
    if (dataArr.every(d => d === null)) return <NoData />;

    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={styles.container}>
          {fullfortArray.map(f => {
            let data = this.getDataQuery(f);
            return (
              <div key={f}>
                <div className={styles.container_header}>
                  {f === "A" ? (
                    <Translate nb="totalt" />
                  ) : f === "13" ? (
                    <Translate nb="utdannet 1-3 år siden" />
                  ) : (
                    <Translate nb="utdannet 7-10 år siden" />
                  )}
                </div>
                {visning === "Antall" ? (
                  !data ? (
                    <div className={styles.container_noData}>
                      <Translate nb="Ingen data" />
                    </div>
                  ) : (
                    <div className={styles.container_antall}>{data}</div>
                  )
                ) : !data ? (
                  <div className={styles.container_noData}>
                    <Translate nb="Ingen data" />
                  </div>
                ) : (
                  <div
                    className={styles.container_andel}
                    style={{ marginBottom: `${f === "710" ? 0 : 20}px` }}
                  >
                    <PercentageBar
                      value={data}
                      maxPercentageEqualsTen={false}
                    />
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

export default EntreprenorskapVisualization;
