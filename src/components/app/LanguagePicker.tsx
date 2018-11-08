import React from "react";
import TranslateContext from "./TranslateContext";

function LanguagePicker() {
  return (
    <TranslateContext.Consumer>
      {translateContext => (
        <div className="LanguagePicker">
          <button onClick={e => translateContext.updateLang("nb")}>
            Bokmål
          </button>
          <button onClick={e => translateContext.updateLang("nn")}>
            Nynorsk
          </button>
        </div>
      )}
    </TranslateContext.Consumer>
  );
}

export default LanguagePicker;
