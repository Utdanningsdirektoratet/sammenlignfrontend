import React, { Component } from "react";
import styles from "./AlphabetFilter.module.scss";
import Translate from "../app/Translate";
import { MainElement } from "../../data/ApiTypes";

type Props = {
  list: MainElement[];
  onLetterClicked: (letter?: string, selectAll?: boolean) => void;
  selectedLetters: string[];
};

class AlphabetFilter extends Component<Props> {
  letterIsInList = (letter: string) => {
    return this.props.list.some(l => l.tittel[0] === letter);
  };

  letterIsSelected = (letter: string) => {
    return this.props.selectedLetters.some(l => l === letter);
  };

  render() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

    return (
      <div className={styles.container}>
        <div
          className={styles.container_showAll}
          onClick={event => this.props.onLetterClicked(undefined, true)}
        >
          <Translate nb="Vis alle" nn="nynorsk" />
        </div>
        <div className={styles.container_alphabet}>
          {alphabet.split("").map(a => {
            return this.letterIsInList(a) ? (
              <span
                key={a}
                className={
                  this.letterIsSelected(a)
                    ? styles.container_alphabet_letter +
                      " " +
                      styles.container_alphabet_letter_selected
                    : styles.container_alphabet_letter
                }
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
