import React, { Component, Fragment } from "react";

type Lookup = { [nb: string]: string | null | undefined };

import NNTranslations from "../../translations/nn.json";

export type Lang = "nb" | "nn";

type Props = {
  nn?: string;
  nb: string;
  replacements?: { [k: string]: string };
};

// Simple global state for language
let GLOBAL_LANGUAGE_STATE: Lang = "nb";
let GLOBAL_LANGUAGE_CHANGE_LISTENERS: Array<() => void> = [];
const MISSING_TRANSLATIONS: string[] = [];

export function getLang() {
  return GLOBAL_LANGUAGE_STATE;
}

export function setLang(lang: Lang) {
  GLOBAL_LANGUAGE_STATE = lang;
  GLOBAL_LANGUAGE_CHANGE_LISTENERS.forEach(f => f());
}

let logMissingTimeout: NodeJS.Timeout;
function logMissing() {
  if (logMissingTimeout) {
    clearTimeout(logMissingTimeout);
  }
  logMissingTimeout = setTimeout(() => {
    console.log("Missing translations: ", MISSING_TRANSLATIONS);
  }, 2000);
}

class Translate extends Component<Props> {
  render() {
    const { replacements, nb, nn } = this.props;
    const lang = getLang();
    let text: string;
    if (process.env.NODE_ENV !== "production") {
      if (!nn && typeof (NNTranslations as Lookup)[nb] === undefined) {
        if (MISSING_TRANSLATIONS.indexOf(nb) === -1) {
          MISSING_TRANSLATIONS.push(nb);
          logMissing();
        }
      }
    }

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
