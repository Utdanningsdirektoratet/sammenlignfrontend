import React, { PureComponent } from "react";

import styles from "./SecondHeader.module.scss";

class SecondHeader extends PureComponent {
  render() {
    return (
      <div className={`${styles.secondheader}`}>
        <div className={`${styles.secondheader_content}`}>
          <div className={`${styles.secondheader_content_item}`}>
            UTDANNING.NO
          </div>
          <input placeholder="Finn utdanning, yrke eller skole" />
        </div>
      </div>
    );
  }
}

export default SecondHeader;
