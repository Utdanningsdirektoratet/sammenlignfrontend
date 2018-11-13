import React, { Component } from "react";
import { Link } from "react-router-dom";

import Translate from "../../app/Translate";
import styles from "../Frontpage.module.scss";

type Props = {
  innholdstype: string;
};

class CompareSelection extends Component<Props> {
  render() {
    const { innholdstype } = this.props;
    return (
      <>
        <h1 className={styles.compare_title}>
          <Translate nb="Jeg vil sammenligne" nn="Eg vil sammenligna" />{" "}
          {innholdstype}
        </h1>
        <div className={styles.button_row}>
          <Link
            to="/utdanning"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            <Translate nb="Utdanninger" nn="Utdanningar" />
          </Link>
          <Link to="/yrke" className={`${styles.btn} ${styles.btn_primary}`}>
            Yrker
          </Link>
        </div>
      </>
    );
  }
}

export default CompareSelection;
