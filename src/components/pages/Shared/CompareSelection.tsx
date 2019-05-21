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
      <>
        <h1 className={`${styles.compare_title}`}>
          <Translate nb="Jeg vil sammenligne" />{" "}
          {innholdstype === "utdanning" ? (
            <Translate nb="utdanninger" />
          ) : innholdstype === "yrke" ? (
            // <Translate nb="yrker" />
            <InnholdButton innholdstype={this.props.innholdstype} />
          ) : (
                innholdstype
              )}
        </h1>
        <div className={`${styles.button_row}`}>
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
        </div>
      </>
    );
  }
}

export default CompareSelection;
