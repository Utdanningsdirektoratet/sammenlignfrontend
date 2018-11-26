import React from "react";
import styles from "./NoData.module.scss";
import visualizationstyles from "../Visualization.module.scss";

import { ReactComponent as File } from "../../../fontawesome/regular/file.svg";

class NoData extends React.Component {
  public render() {
    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.nodata_container}`}>
          <div className={`${styles.nodata_container_icon}`}>
            <File />
          </div>
          <div className={`${styles.nodata_container_text}`}>Ingen data</div>
        </div>
      </div>
    );
  }
}

export default NoData;
