import React, { Fragment } from "react";
import { MainElement } from "../../data/ApiTypes";
import { alphabetize } from "../../util/AlphabeticList";

import styles from "./AlphabeticOverviewPage.module.scss";

type Props = {
  list: MainElement[];
  handleItemClicked: (e: React.MouseEvent<HTMLElement>) => void;
  selected: string[];
};

class AlphabeticList extends React.Component<Props> {
  public render() {
    const { list, handleItemClicked, selected } = this.props;
    const alphabetizedList = alphabetize(list, 5);
    return (
      <div className={styles.alphabeticlist_container}>
        {alphabetizedList.map((c, i) => {
          return (
            <li key={i}>
              <div>
                <div className={styles.alphabetic_headers}>
                  {c.characters.map(l => (
                    <h3 className={styles.alphabetic_header} key={l}>
                      <span>{l}</span>
                    </h3>
                  ))}
                </div>
                <div className={styles.alphabetic_list}>
                  {c.strings.map(o => (
                    <div
                      key={o.uno_id}
                      className={
                        styles.alphabetic_list__item +
                        (selected && selected.indexOf(o.uno_id) !== -1
                          ? " " + styles.selected
                          : "")
                      }
                      data-key={o.uno_id}
                      onClick={handleItemClicked}
                    >
                      {o.tittel}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </div>
    );
  }
}

export default AlphabeticList;
