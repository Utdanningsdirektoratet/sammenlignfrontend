import * as React from "react";
import "./Arbeidsledighet.scss";

type Props = {
  newly: number;
  tenyears: number;
};

class Arbeidsledighet extends React.Component<Props> {
  public render() {
    const { newly, tenyears } = this.props;
    return (
      <div className="arbeidsledighet_container">
        <div className="arbeidsledighet_container-newly">
          <div className="arbeidsledighet_container-newly-title">
            Nyutdannede
          </div>
          <PercentageBar value={newly}/>
        </div>
        <div className="arbeidsledighet_container-tenyears">
          <div className="arbeidsledighet_container-tenyears-title">
            10 år etter endt utdannelse
          </div>
          <PercentageBar value={tenyears}/>
        </div>
      </div>
    );
  }
}

type PercentageBarProps = {
    value: number;
};

class PercentageBar extends React.Component<PercentageBarProps> {
    public render() {
        const {value} = this.props;
        return(
            <div className="percentagebar">
                <div className="percentagebar_mainbar"></div>
                <div className="percentagebar_overlaybar" style={{width: `${value}%`}}></div>
                <div className="percentagebar_percentage">{value} %</div>
            </div>
        );
    }
}

export default Arbeidsledighet;
