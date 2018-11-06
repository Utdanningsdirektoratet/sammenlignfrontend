import * as React from "react";
import "./NoData.scss";
import {ReactComponent as NoDataSvg} from "./NoData.svg";

class NoData extends React.Component {
  public render() {
    return (
      <div className="visualization_container">
        <div className="nodata_container">
          <div className="nodata_container-icon">
            <NoDataSvg/>
          </div>
          <div className="nodata_container-text">Ingen data</div>
        </div>
      </div>
    );
  }
}

export default NoData;
