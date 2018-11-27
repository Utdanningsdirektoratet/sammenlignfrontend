import React, { Component, Fragment } from "react";

type Lookup = { [nb: string]: string | null | undefined };

import NNTranslations from "../../translations/nn.json";

export type Lang = "nb" | "nn";

type Replacements = { [k: string]: string };

type Props = {
  nn?: string;
  nb: string;
  replacements?: Replacements;
};

// Simple global state for language
let GLOBAL_LANGUAGE_STATE: Lang = "nb";
let GLOBAL_LANGUAGE_CHANGE_LISTENERS: Array<() => void> = [];

export function getLang() {
  return GLOBAL_LANGUAGE_STATE;
}

export function setLang(lang: Lang) {
  GLOBAL_LANGUAGE_STATE = lang;
  GLOBAL_LANGUAGE_CHANGE_LISTENERS.forEach(f => f());
}

function Translate({ nb, nn, replacements }: Props): JSX.Element {
  return (TranslateString(nb, nn, replacements) as any) as JSX.Element;
}

export function TranslateString(
  nb: string,
  nn?: string,
  replacements?: Replacements
): string {
  const lang = getLang();
  let text: string;

  if (lang === "nb") {
    text = nb;
  } else {
    text = nn || (NNTranslations as Lookup)[nb] || "[missing]";
  }
  if (replacements) {
    Object.keys(replacements).forEach(rep => {
      text = text.replace(rep, replacements[rep]);
    });
  }
  return text;
}

// Simple wrapper component that forces a rerender of
// props.children whenever GLOBAL_LANGUAGE_STATE is changed
export class TranslateRoot extends Component {
  componentDidMount() {
    GLOBAL_LANGUAGE_CHANGE_LISTENERS.push(this.forceRerender);
  }
  componentWillUnmount() {
    GLOBAL_LANGUAGE_CHANGE_LISTENERS = GLOBAL_LANGUAGE_CHANGE_LISTENERS.filter(
      f => f !== this.forceRerender
    );
  }
  forceRerender = () => {
    this.forceUpdate();
  };
  render() {
    return <Fragment key={getLang()}>{this.props.children}</Fragment>;
  }
}

export default Translate;
