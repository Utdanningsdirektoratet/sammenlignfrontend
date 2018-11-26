import React, { Fragment } from "react";
import { MainElement } from "../../data/ApiTypes";
import { alphabetize } from "../../util/AlphabeticList";

import styles from "./AlphabeticOverviewPage.module.scss";

type Props = {
  list: MainElement[];
  handleItemClicked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected_uno_id: string[];
};

class AlphabeticList extends React.Component<Props> {
  public render() {
    const { list, handleItemClicked, selected_uno_id } = this.props;
    const alphabetizedList = alphabetize(list, 5);
    return (
      <div className={`${styles.alphabetic_list_container}`}>
        {alphabetizedList.map((c, i) => {
          return (
            <li key={i}>
              <div>
                <div className={`${styles.alphabetic_headers}`}>
                  {c.characters.map(l => (
                    <h3
                      className={`${styles.alphabetic_header}`}
                      key={l}
                      data-letter={l}
                    >
                      <span>{l}</span>
                    </h3>
                  ))}
                </div>
                <div className={`${styles.alphabetic_list}`}>
                  {c.strings.map(o => (
                    <div
                      key={o.uno_id}
                      className={`${styles.alphabetic_list__item}`}
                      data-key={o.uno_id}
                    >
                      <label>
                        <input
                          type="checkbox"
                          data-key={o.uno_id}
                          checked={
                            selected_uno_id &&
                            selected_uno_id.indexOf(o.uno_id) !== -1
                          }
                          onChange={handleItemClicked}
                        />
                        {o.tittel}
                      </label>
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
