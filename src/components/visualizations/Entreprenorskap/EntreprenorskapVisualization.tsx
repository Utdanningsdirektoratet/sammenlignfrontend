import React, { Component } from "react";
import { Kjønn, EntrepenorObject } from "../../../data/ApiTypes";
import {
  Fullført,
  Visning,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import PercentageBar from "../Generic/PercentageBar";
import styles from "./EntreprenorskapVisualization.module.scss";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";

type Props = {
  data: EntrepenorObject;
  kjønn: Kjønn;
  fullført: Fullført;
  visning: Visning;
};

class EntreprenorskapVisualization extends Component<Props> {
  getDataQuery = (kjønn: string) => {
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

    switch (kjønn) {
      case "K":
        qry += "_kvinner";
        break;
      case "M":
        qry += "_menn";
        break;
      default:
        break;
    }

    switch (this.props.fullført) {
      case "710":
        qry += this.props.fullført;
        break;
      case "13":
        qry += this.props.fullført;
        break;
      case "A":
        break;
    }

    let num = (this.props.data as any)[qry];
    if (!num) return null;

    if (this.props.visning === "Andel") {
      num = num.toFixed(2);
    }

    return num;
  };

  render() {
    const { kjønn, visning } = this.props;

    if (kjønn === "A") {
      let data = this.getDataQuery(kjønn);
      if (data === null) return <NoData />;
      return (
        <div className={visualizationstyles.visualization_container}>
          <div className={styles.container}>
            {visning === "Antall" ? (
              <div className={styles.container_antall}>{data}</div>
            ) : (
              <div className={styles.container_andel}>
                <PercentageBar value={data} maxPercentageEqualsTen={true} />
              </div>
            )}
          </div>
        </div>
      );
    } else {
      let dataM = this.getDataQuery("M");
      let dataK = this.getDataQuery("K");

      if (dataM === null && dataK === null) return <NoData />;
      return (
        <div className={`${visualizationstyles.visualization_container}`}>
          <div>
            {visning === "Antall" ? (
              <div className={`${styles.container_antall}`}>
                <Man /> {dataM}
              </div>
            ) : (
              <div className={`${styles.container_andel}`}>
                <Man />
                <PercentageBar value={dataM} maxPercentageEqualsTen={true} />
              </div>
            )}
          </div>
          <div>
            {visning === "Antall" ? (
              <div className={`${styles.container_antall}`}>
                <Woman /> {dataK}
              </div>
            ) : (
              <div className={`${styles.container_andel}`}>
                <Woman />
                <PercentageBar value={dataK} maxPercentageEqualsTen={true} />
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default EntreprenorskapVisualization;
