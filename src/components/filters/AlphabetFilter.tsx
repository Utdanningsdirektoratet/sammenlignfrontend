import React, { Component } from "react";
import styles from "./AlphabetFilter.module.scss";
import Translate from "../app/Translate";
import { MainElement } from "../../data/ApiTypes";

type Props = {
  list: MainElement[];
  onLetterClicked: (letter: string) => void;
};

class AlphabetFilter extends Component<Props> {
  letterIsInList = (letter: string) => {
    return this.props.list.some(l => l.tittel[0] === letter);
  };
  render() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

    return (
      <div className={`${styles.container}`}>
        <div>
          {alphabet.split("").map(a => {
            return this.letterIsInList(a) ? (
              <span
                key={a}
                className={`${styles.container_alphabet_letter}`}
                onClick={() => this.props.onLetterClicked(a)}
              >
                {a.toUpperCase()}
              </span>
            ) : (
              <span
                key={a}
                className={
                  styles.container_alphabet_letter +
                  " " +
                  styles.container_alphabet_letter_unselected
                }
              >
                {a.toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AlphabetFilter;
