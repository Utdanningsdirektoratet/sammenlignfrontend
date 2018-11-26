import React from "react";
import styles from "./Gjennomforingstid.module.scss";
import visualizationstyles from "./Visualization.module.scss";

import { ReactComponent as GjennomforingstidSvg } from "./Gjennomforingstid.svg";

type Props = {
  years: number;
  months: number;
};

class Gjennomforingstid extends React.Component<Props> {
  public render() {
    const { years, months } = this.props;
    const separator = months > 0 ? "," : "";
    const monthText =
      months === 1
        ? months + " måned"
        : months === 0
        ? ""
        : months + " måneder";
    //   icon: https://linearicons.com/free
    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.gjennomforingstid_container}`}>
          <div className={`${styles.gjennomforingstid_container_icon}`}>
            <GjennomforingstidSvg />
          </div>
          <div className={`${styles.gjennomforingstid_container_years}`}>
            {years} år
            {separator}
          </div>
          <div className={`${styles.gjennomforingstid_container_months}`}>
            {monthText}
          </div>
        </div>
      </div>
    );
  }
}

export default Gjennomforingstid;
