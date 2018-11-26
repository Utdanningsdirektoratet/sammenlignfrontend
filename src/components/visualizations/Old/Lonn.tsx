import React from "react";
import styles from "./Lonn.module.scss";
import visualizationstyles from "./Visualization.module.scss";

type Props = {
  high: number;
  avg: number;
  low: number;
};

class Lonn extends React.Component<Props> {
  public render() {
    const { high, low, avg } = this.props;
    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.lonn_container}`}>
          <div className={`${styles.lonn_container_high}`}>
            <div className={`${styles.lonn_container_title}`}>Høyeste</div>
            <div className={`${styles.lonn_container_number}`}>{high} kr</div>
          </div>
          <div className={`${styles.lonn_container_avg}`}>
            <div className={`${styles.lonn_container_title}`}>Gjennomsnitt</div>
            <div className={`${styles.lonn_container_number}`}>{avg} kr</div>
          </div>
          <div className={`${styles.lonn_container_low}`}>
            <div className={`${styles.lonn_container_title}`}>Laveste</div>
            <div className={`${styles.lonn_container_number}`}>{low} kr</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lonn;
