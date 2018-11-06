import * as React from "react";
import "./NoData.scss";

class NoData extends React.Component {
  public render() {
    return (
      <div className="visualization_container">
        <div className="nodata_container">
          <div className="nodata_container-icon">
            <svg
              id="lnr-file-empty"
              viewBox="0 0 1024 1024"
              width="6em"
              height="6em"            >
              <title>no data</title>
              <path
                className="path1"
                d="M914.101 289.099l-230.4-230.4c-4.8-4.802-11.312-7.499-18.101-7.499h-486.4c-42.347 0-76.8 34.453-76.8 76.8v819.2c0 42.349 34.453 76.8 76.8 76.8h665.6c42.349 0 76.8-34.451 76.8-76.8v-640c0-6.79-2.698-13.301-7.499-18.101zM859.797 307.2h-168.597c-14.115 0-25.6-11.485-25.6-25.6v-168.597l194.197 194.197zM870.4 947.2c0 14.115-11.485 25.6-25.6 25.6h-665.6c-14.115 0-25.6-11.485-25.6-25.6v-819.2c0-14.115 11.485-25.6 25.6-25.6h435.2v179.2c0 42.347 34.451 76.8 76.8 76.8h179.2v588.8z"
              />
            </svg>
          </div>
          <div className="nodata_container-text">Ingen data</div>
        </div>
      </div>
    );
  }
}

export default NoData;
