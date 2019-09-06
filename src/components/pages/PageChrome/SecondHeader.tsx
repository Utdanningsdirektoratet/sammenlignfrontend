import React, { PureComponent } from "react";

import styles from "./SecondHeader.module.scss";

import { ReactComponent as Logo } from "../../visualizations/Generic/construction.svg";

class SecondHeader extends PureComponent {
  render() {
    return (
      <div className={`${styles.secondheader}`}>
        <div className={`${styles.secondheader_content}`}>
          <div className={`${styles.secondheader_content_item}`}>
            UTDANNING.NO
          </div>
          <div className={`${styles.warningcontainer}`}>
            <Logo className={`${styles.warningcontainer_logo}`} />
            <span className={`${styles.warningcontainer_text}`}>
              Denne nettjenesten er under utvikling. Feil og mangler kan forekomme.
          </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondHeader;
