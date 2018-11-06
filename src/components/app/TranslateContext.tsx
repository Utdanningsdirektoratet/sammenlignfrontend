import React, { Component, ReactNode } from "react";
export type Lang = "nb" | "nn";
export type Trans = {
  lang: Lang;
  updateLang: (lang: Lang) => void;
};
const defaultTrans: Trans = { lang: "nb", updateLang: (lang: Lang) => {} };

const TranslateContext = React.createContext(defaultTrans as Trans);

type Props = {
  children: ReactNode;
};

export class TranslateRoot extends Component<Props, Trans> {
  //   constructor(props: Props) {
  //     super(props);
  // this.setState({
  state = {
    lang: defaultTrans.lang,
    updateLang: (lang: Lang) => {
      this.setState({ lang: lang });
    }
  };
  //   }
  render() {
    return (
      <TranslateContext.Provider value={this.state}>
        {this.props.children}
      </TranslateContext.Provider>
    );
  }
}
export default TranslateContext;
