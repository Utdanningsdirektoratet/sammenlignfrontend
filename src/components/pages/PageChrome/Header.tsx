import React, { PureComponent } from "react";
import LanguagePicker from "../../app/LanguagePicker";
import Translate from "../../app/Translate";

import styles from "./Header.module.scss";

class Header extends PureComponent {
  render() {
    return (
      <div className={`${styles.header}`}>
        <div className={`${styles.header_content}`}>
          <span>
            <Translate nb="Offentlig og kvalitetssikret" />
          </span>
          <LanguagePicker />
        </div>
      </div>
    );
  }
}

export default Header;
