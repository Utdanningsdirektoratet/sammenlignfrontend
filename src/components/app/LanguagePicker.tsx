import React from "react";
import TranslateContext from "./TranslateContext";

import styles from "./Header.module.scss";

function LanguagePicker() {
  return (
    <TranslateContext.Consumer>
      {translateContext => (
        <div className={styles.languagepicker}>
          <span
            className={styles.languagepicker_language}
            onClick={e => translateContext.updateLang("nb")}
          >
            Bokmål
          </span>
          /
          <span
            className={styles.languagepicker_language}
            onClick={e => translateContext.updateLang("nn")}
          >
            Nynorsk
          </span>
          <span>FontSize</span>
        </div>
      )}
    </TranslateContext.Consumer>
  );
}

export default LanguagePicker;
