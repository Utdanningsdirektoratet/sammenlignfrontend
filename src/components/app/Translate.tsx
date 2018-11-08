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
          const text = trans.lang === "nn" ? nn : nb;
          return text;
        }}
      </TranslateContext.Consumer>
    );
  }
}

export default Translate;
