import React from "react";
import "./Lonn.scss";
import "./Visualization.scss";

type Props = {
  high: number;
  avg: number;
  low: number;
};

class Lonn extends React.Component<Props> {
  public render() {
    const { high, low, avg } = this.props;
    return (
      <div className="visualization_container">
        <div className="lonn_container">
          <div className="lonn_container-high">
            <div className="lonn_container-title">Høyeste</div>
            <div className="lonn_container-number">{high} kr</div>
          </div>
          <div className="lonn_container-avg">
            <div className="lonn_container-title">Gjennomsnitt</div>
            <div className="lonn_container-number">{avg} kr</div>
          </div>
          <div className="lonn_container-low">
            <div className="lonn_container-title">Laveste</div>
            <div className="lonn_container-number">{low} kr</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lonn;
