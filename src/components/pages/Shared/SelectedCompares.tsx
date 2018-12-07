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
import Translate, { TranslateString } from "../../app/Translate";
import UnoIdSearchModal from "./UnoIdSearchModal";
import { ReactComponent as Edit } from "../../../fontawesome/solid/edit.svg";
import { MIN_DESKTOP_PX } from "../../../util/Constants";

type Props = {
  innholdstype: Innholdstype;
};

type State = {
  showSearchModal: boolean;
  replace: string | undefined | null;
};

class SelectedCompares extends Component<
  AppStateProps & Props & ScreenSizeProps,
  State
> {
  state = { showSearchModal: false, replace: null };
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleUnoId },
      innerWidth,
    } = this.props;
    const key = e.currentTarget.getAttribute("data-uno_id");
    if (key) toggleUnoId(key);
  };

  openModalClick = (e: any) => {
    let unoId = e.currentTarget.getAttribute("data-uno-id");
    this.setState({ showSearchModal: true, replace: unoId });
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

    let dom: any = [];

    if (innerWidth < MIN_DESKTOP_PX) {
      let boxes = [];
      for (var i = 0; i < NUM_COMPARES_MOBILE; i++) {
        boxes.push(
          <div key={i} className={`${styles.selection_cell}`}>
            <div
              className={`${styles.selection_item}`}
              onClick={this.openModalClick}
              data-uno-id={filtered_uno_id[i]}
            >
              <div
                className={`${
                  filtered_uno_id[i]
                    ? styles.selection_item_text
                    : styles.selection_item_text +
                      " " +
                      styles.selection_item_text_search
                }`}
              >
                {filtered_uno_id[i] ? (
                  <UnoId uno_id={filtered_uno_id[i]} />
                ) : (
                  TranslateString("Finn %hva%", {
                    "%hva%": this.props.innholdstype as string,
                  })
                )}
              </div>
              <button>
                <Edit />
              </button>
            </div>
          </div>
        );
      }

      dom = [
        <div className={`${styles.container}`} key="box">
          {boxes}
          {this.state.showSearchModal ? (
            <UnoIdSearchModal
              showModal={this.state.showSearchModal}
              onClose={(e: any) => {
                this.setState({ showSearchModal: false });
              }}
              contentLabel=""
              innholdsType={innholdstype}
              unoId={this.state.replace}
            />
          ) : null}
        </div>,
      ];
    } else {
      dom = filtered_uno_id.map(uno_id => (
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
    }

    return <div className={`${styles.selection}`}>{dom}</div>;
  }
}

export default with_app_state<Props>(
  num_compare_sizing<Props & AppStateProps>(SelectedCompares)
);
