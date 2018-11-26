import React, { Component } from "react";
import { Link } from "react-router-dom";

import Translate from "../../app/Translate";
import styles from "./CompareSelection.module.scss";

type Props = {
  innholdstype: string;
};

class CompareSelection extends Component<Props> {
  render() {
    const { innholdstype } = this.props;
    return (
      <>
        <h1 className={`${styles.compare_title}`}>
          <Translate nb="Jeg vil sammenligne" nn="Eg vil sammenligna" />{" "}
          {innholdstype === "utdanning"
            ? "utdanninger"
            : innholdstype === "yrke"
            ? "yrker"
            : innholdstype}
        </h1>
        <div className={`${styles.button_row}`}>
          <div className={`${styles.button_row_content}`}>
            <Link
              to="/utdanning"
              className={`${styles.btn} ${styles.btn_primary} ${
                innholdstype == "utdanning" ? styles.btn_selected : ""
              }`}
            >
              <Translate nb="Utdanninger" nn="Utdanningar" />
            </Link>
            <Link
              to="/yrke"
              className={`${styles.btn} ${styles.btn_primary} ${
                innholdstype == "yrke" ? styles.btn_selected : ""
              }`}
            >
              Yrker
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default CompareSelection;
