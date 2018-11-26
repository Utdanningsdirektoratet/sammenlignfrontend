import React from "react";

import styles from "../pages/PageChrome/Header.module.scss";
import { setLang } from "./Translate";

function LanguagePicker() {
  return (
    <div className={`${styles.languagepicker}`}>
      <span onClick={e => setLang("nb")}>Bokmål</span>/
      <span onClick={e => setLang("nn")}>Nynorsk</span>
      <span>FontSize</span>
    </div>
  );
}

export default LanguagePicker;
