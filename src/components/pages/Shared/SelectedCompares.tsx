import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./SelectedCompare.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import CloseIcon from "../../visualizations/Generic/CloseIcon";
import UnoId from "../../app/UnoId";
import {
  num_compare_sizing,
  ScreenSizeProps,
} from "../../utils/NumCompareSizing";

type Props = {
  innholdstype: Innholdstype;
};

class SelectedCompares extends Component<
  AppStateProps & Props & ScreenSizeProps
> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleUnoId },
    } = this.props;
    const key = e.currentTarget.getAttribute("data-uno_id");
    if (key) {
      let selected = toggleUnoId(key);
      if (
        selected.length === 0 &&
        window.location.href.includes("sammenligne")
      ) {
        window.location.href = "/";
      }
    }
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
      <div className={`${styles.selection}`}>
        {filtered_uno_id.map(uno_id => (
          <div key={uno_id} className={`${styles.selection_cell}`}>
            <div className={`${styles.selection_item}`}>
              <div className={`${styles.selection_item_text}`}>
                <UnoId uno_id={uno_id} />
              </div>
              <button onClick={this.handleRemoveClick} data-uno_id={uno_id}>
                <CloseIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default with_app_state<Props>(
  num_compare_sizing<Props & AppStateProps>(SelectedCompares)
);
