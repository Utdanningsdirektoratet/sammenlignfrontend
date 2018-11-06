import React from "react";
import "./Gjennomforingstid.scss";
import {ReactComponent as GjennomforingstidSvg} from "./Gjennomforingstid.svg";

type Props = {
  years: number;
  months: number;
};

class Gjennomforingstid extends React.Component<Props> {
  public render() {
    const { years, months } = this.props;
    const separator = months > 0 ? "," : "";
    const monthText = months === 1
        ? months + " måned"
        : months === 0
          ? ""
          : months + " måneder";
        //   icon: https://linearicons.com/free
    return (
      <div className="visualization_container">
        <div className="gjennomforingstid_container">
          <div className="gjennomforingstid_container-icon">
            <GjennomforingstidSvg/>
          </div>
          <div className="gjennomforingstid_container-years">
            {years} år
            {separator}
          </div>
          <div className="gjennomforingstid_container-months">{monthText}</div>
        </div>
      </div>
    );
  }
}

export default Gjennomforingstid;
