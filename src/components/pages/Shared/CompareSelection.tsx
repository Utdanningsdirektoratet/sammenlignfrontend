import React, { Component } from "react";
import { Link } from "react-router-dom";

import Translate from "../../app/Translate";
import styles from "./CompareSelection.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import InnholdButton from "../../ui/InnholdButton";

type Props = {
  innholdstype?: Innholdstype;
};

class CompareSelection extends Component<Props> {
  render() {
    const { innholdstype } = this.props;
    return (
      <div className={`${styles.compare_container}`}>
        <div className={`${styles.compare_titlecontainer}`}>
          <h1 className={`${styles.compare_title}`}><Translate nb="Jeg vil sammenligne" />{" "}</h1>
        </div>
        <div className={`${styles.compare_buttoncontainer}`}>
          <InnholdButton innholdstype={this.props.innholdstype} />
        </div>
        {/* <h1 className={`${styles.compare_title}`}> */}
        {/* <Translate nb="Jeg vil sammenligne" />{" "} */}
        {/* </h1> */}
        {/* <InnholdButton innholdstype={this.props.innholdstype} /> */}
        {/* {innholdstype === "utdanning" ? (
            // <Translate nb="utdanninger" />
            <InnholdButton innholdstype={this.props.innholdstype} />
          ) : innholdstype === "yrke" ? (
            // <Translate nb="yrker" />
            <InnholdButton innholdstype={this.props.innholdstype} />
          ) : (
                innholdstype
              )} */}
        {/* </h1> */}
        {/* <div className={`${styles.button_row}`}>
          <div className={`${styles.button_row_content}`}>
            <Link
              to="/liste/utdanning"
              className={`${styles.btn} ${styles.btn_primary} ${
                innholdstype == "utdanning" ? styles.btn_selected : ""
                }`}
            >
              <Translate nb="Utdanninger" />
            </Link>
            <Link
              to="/liste/yrke"
              className={`${styles.btn} ${styles.btn_primary} ${
                innholdstype == "yrke" ? styles.btn_selected : ""
                }`}
            >
              <Translate nb="Yrker" />
            </Link>
          </div>
        </div> */}
      </div>
    );
  }
}

export default CompareSelection;
