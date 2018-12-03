import React, { Component } from "react";

import styles from "./SelectedCompare.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import CloseIcon from "../../visualizations/Generic/CloseIcon";
import UnoId from "../../app/UnoId";
import {
  num_compare_sizing,
  ScreenSizeProps,
} from "../../utils/NumCompareSizing";
import { NUM_COMPARES_MOBILE } from "../../../data/config";
import SearchBox from "../AlphabeticComparisonPage/SearchBox";
import Translate, { TranslateString } from "../../app/Translate";

type Props = {
  innholdstype: Innholdstype;
};

class SelectedCompares extends Component<
  AppStateProps & Props & ScreenSizeProps
> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleUnoId },
      innerWidth,
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

    let dom = filtered_uno_id.map(uno_id => (
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
    ));

    if (innerWidth < 576) {
      let boxes = [];
      for (var i = 0; i < NUM_COMPARES_MOBILE; i++) {
        boxes.push(
          <div key={i} className={`${styles.selection_cell}`}>
            {filtered_uno_id[i] ? (
              <div className={`${styles.selection_item}`}>
                <div
                  className={`${
                    filtered_uno_id[i]
                      ? styles.selection_item_text
                      : styles.selection_item_text +
                        " " +
                        styles.selection_item_text_search
                  }`}
                >
                  <UnoId uno_id={filtered_uno_id[i]} />
                </div>
                {/* <button onClick={this.handleRemoveClick} data-uno_id={uno_id}>
              <CloseIcon />
            </button> */}
              </div>
            ) : (
              <SearchBox
                innholdstype={innholdstype}
                placeholder={TranslateString("Finn " + innholdstype)}
              />
            )}
          </div>
        );
      }

      dom = boxes;
    }

    return <div className={`${styles.selection}`}>{dom}</div>;
  }
}

export default with_app_state<Props>(
  num_compare_sizing<Props & AppStateProps>(SelectedCompares)
);
