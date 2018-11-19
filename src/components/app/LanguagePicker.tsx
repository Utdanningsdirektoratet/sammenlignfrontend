import React from "react";

import styles from "../pages/PageChrome/Header.module.scss";
import { setLang } from "./Translate";

function LanguagePicker() {
  return (
    <div className={styles.languagepicker}>
      <span
        className={styles.languagepicker_language}
        onClick={e => setLang("nb")}
      >
        Bokmål
      </span>
      /
      <span
        className={styles.languagepicker_language}
        onClick={e => setLang("nn")}
      >
        Nynorsk
      </span>
      <span>FontSize</span>
    </div>
  );
}

export default LanguagePicker;
