import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./SelectedCompare.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";

type Props = {
  innholdstype: Innholdstype;
};

class SelectedCompares extends Component<AppStateProps & Props> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleSelection },
    } = this.props;
    const key = e.currentTarget.getAttribute("data-uno_id");
    if (key) toggleSelection(key);
  };

  render() {
    const {
      appState: { selected },
      innholdstype,
    } = this.props;
    const selected_uno_id = selected.filter(
      uno_id => uno_id[0].toLowerCase() === innholdstype[0].toLowerCase()
    );

    if (selected_uno_id.length === 0) {
      return null;
    }

    return (
      <>
        <div className={`${styles.selection}`}>
          <ul className={`${styles.selection_row}`}>
            {selected_uno_id.map(uno_id => (
              <li className={`${styles.selection_row_item}`}>
                <div className={`${styles.selection_row_item_text}`}>
                  {uno_id}
                </div>
                <button
                  className={`${styles.selection_row_item_close}`}
                  data-uno_id={uno_id}
                  onClick={this.handleRemoveClick}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default with_app_state<Props>(SelectedCompares);
