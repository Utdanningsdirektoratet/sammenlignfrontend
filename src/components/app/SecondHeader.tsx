import React, { PureComponent } from "react";

import styles from "./SecondHeader.module.scss";

class SecondHeader extends PureComponent {
  render() {
    return (
      <div className={styles.secondheader}>
        <div className={styles.secondheader_content}>
          <div className={styles.secondheader_content_item}>UTDANNING.NO</div>
          <input
            className={styles.secondheader_content_item}
            placeholder="Finn utdanning,yrke eller skole"
          />
          <div className={styles.secondheader_content_item}>
            <span>Meny</span>
            <span>Min Side</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondHeader;
