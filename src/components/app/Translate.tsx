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

export function splitKeys(string: string, keys: string[]) {
  let arr = [string];
  keys.forEach(key => {
    arr = arr.reduce(
      (arr, part) => {
        if (part.indexOf(key) !== -1) {
          const parts = part.split(key);
          for (let i = 0; i < parts.length - 1; i++) {
            arr.push(parts[i]);
            arr.push(key);
          }
          arr.push(parts[parts.length - 1]);
        } else {
          arr.push(part);
        }
        return arr;
      },
      [] as string[]
    );
  });
  return arr;
}

const Translate: React.SFC<Props> = ({ nb, nn, replacements }): JSX.Element => {
  if (
    replacements &&
    Object.keys(replacements).some(key => typeof replacements[key] !== "string")
  ) {
    const parts = splitKeys(
      TranslateString(nb, undefined, nn),
      Object.keys(replacements)
    );
    return (
      <>{parts.map(part => (replacements[part] ? replacements[part] : part))}</>
    );
  }
  return (TranslateString(nb, replacements, nn) as any) as JSX.Element;
};

export function TranslateString(
  nb: string,
  replacements?: Replacements,
  nn?: string
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
