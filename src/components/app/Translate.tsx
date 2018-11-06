import React, { Component, Context } from "react";
import TranslateContext, { Trans } from "./TranslateContext";

type Props = {
  nn: string;
  nb: string;
};

class Translate extends Component<Props> {
  render() {
    const { nb, nn } = this.props;
    return (
      <TranslateContext.Consumer>
        {(trans: Trans) => {
          if (trans.lang === "nn") {
            return (
              <span
                onClick={() => {
                  trans.updateLang("nb");
                }}
              >
                {nn}
              </span>
            );
          }
          return (
            <span
              onClick={() => {
                trans.updateLang("nn");
              }}
            >
              {nb}
            </span>
          );
        }}
      </TranslateContext.Consumer>
    );
  }
}

export default Translate;
