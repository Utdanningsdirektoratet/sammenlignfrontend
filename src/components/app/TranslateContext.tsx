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
  initialLang?: string;
  onLanguageChange?: (string: Lang) => void;
};

export class TranslateRoot extends Component<Props, Trans> {
  //   constructor(props: Props) {
  //     super(props);
  // this.setState({
  state = {
    lang: defaultTrans.lang,
    updateLang: (lang: Lang) => {
      this.setState({ lang: lang });
      if (this.props.onLanguageChange) {
        this.props.onLanguageChange(lang);
      }
    },
  };
  //   }
  render() {
    return (
      <TranslateContext.Provider value={this.state} key={this.state.lang}>
        {this.props.children}
      </TranslateContext.Provider>
    );
  }
}

export type LanguageProps = {
  lang: Lang;
};

export function with_lang_props<P>(
  WrappedComponent: React.ComponentClass<any>
) {
  return (function(props: any) {
    return (
      <TranslateContext.Consumer>
        {translateContext => (
          <WrappedComponent lang={translateContext.lang} {...props} />
        )}
      </TranslateContext.Consumer>
    );
  } as any) as React.ComponentClass<P>;
}

export default TranslateContext;
