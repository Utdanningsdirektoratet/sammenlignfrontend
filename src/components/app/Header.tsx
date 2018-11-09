import React, { PureComponent } from "react";
import LanguagePicker from "./LanguagePicker";
import Translate from "../app/Translate";

import styles from "./Header.module.scss";

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.header_content}>
          <span>
            <Translate
              nb="Offentlig og kvalitetssikret"
              nn="Offentleg og kvalitetssikra"
            />
          </span>
          <LanguagePicker />
        </div>
      </div>
    );
  }
}

export default Header;
