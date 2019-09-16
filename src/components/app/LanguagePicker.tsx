import React from "react";

import styles from "../pages/PageChrome/Header.module.scss";
import { setLang, getLang } from "./Translate";

function LanguagePicker() {
  let currentLang = getLang();
  console.log("currentlang", currentLang);

  switch (currentLang) {
    case "nb":
      return (
        <div className={`${styles.languagepicker}`}>
          <span className={`${styles.nb} ${styles.selected}`} onClick={e => setLang("nb")}>Bokmål</span>
          <span>/</span>
          <span className={`${styles.nn}`} onClick={e => setLang("nn")}>Nynorsk</span>
          <div className={`${styles.fontcontainer}`}>
            <span className={`${styles.small}`}>a</span>
            <span className={`${styles.medium}`}>a</span>
            <span className={`${styles.large}`}>a</span>
            <div className={`${styles.fontinfo}`}>
              <span>Hold Ctrl-tasten nede. Trykk på + for å forstørre eller - for å forminske.</span>
            </div>
          </div>
        </div>
      )
    case "nn":
      return (
        <div className={`${styles.languagepicker}`}>
          <span className={`${styles.nb}`} onClick={e => setLang("nb")}>Bokmål</span>
          <span>/</span>
          <span className={`${styles.nn} ${styles.selected}`} onClick={e => setLang("nn")}>Nynorsk</span>
          <div className={`${styles.fontcontainer}`}>
            <span className={`${styles.small}`}>a</span>
            <span className={`${styles.medium}`}>a</span>
            <span className={`${styles.large}`}>a</span>
            <div className={`${styles.fontinfo}`}>
              <span>Hold Ctrl-tasten nede. Trykk på + for å forstørre eller - for å forminske.</span>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <span>Språk ikke støttet.</span>
      )
  }
  // return (
  //   <div className={`${styles.languagepicker}`}>
  //     <span className={`${styles.nb}`} onClick={e => setLang("nb")}>Bokmål</span>
  //     <span>/</span>
  //     <span className={`${styles.nn}`} onClick={e => setLang("nn")}>Nynorsk</span>
  //     <div className={`${styles.fontcontainer}`}>
  //       <span className={`${styles.small}`}>a</span>
  //       <span className={`${styles.medium}`}>a</span>
  //       <span className={`${styles.large}`}>a</span>
  //       <div className={`${styles.fontinfo}`}>
  //         <span>Hold Ctrl-tasten nede. Trykk på + for å forstørre eller - for å forminske.</span>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default LanguagePicker;
