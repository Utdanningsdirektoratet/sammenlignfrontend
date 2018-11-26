import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./SelectedCompare.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import CloseIcon from "../../visualizations/Generic/CloseIcon";
import UnoId from "../../app/UnoId";
import SearchBox from "../AlphabeticComparisonPage/SearchBox";

type Props = {
  innholdstype: Innholdstype;
};

class SelectedCompares extends Component<AppStateProps & Props> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleUnoId },
    } = this.props;
    const key = e.currentTarget.getAttribute("data-uno_id");
    if (key) toggleUnoId(key);
  };

  render() {
    const {
      appState: { selected_uno_id },
      innholdstype,
    } = this.props;
    const filtered_uno_id = selected_uno_id.filter(
      uno_id => uno_id[0].toLowerCase() === innholdstype[0].toLowerCase()
    );

    if (filtered_uno_id.length === 0) {
      return null;
    }

    return (
      <>
        <div className={`${styles.selection}`}>
          <ul className={`${styles.selection_row}`}>
            {filtered_uno_id.map(uno_id => (
              <li key={uno_id} className={`${styles.selection_row_item}`}>
                <div className={`${styles.selection_row_item_text}`}>
                  <UnoId uno_id={uno_id} />
                </div>
                <CloseIcon unoId={uno_id} onClick={this.handleRemoveClick} />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default with_app_state<Props>(SelectedCompares);
