import React, { Component } from "react";
import ReactModal from "react-modal";

import styles from "./UnoIdSearchModal.module.scss";
import SearchBox from "../AlphabeticComparisonPage/SearchBox";
import Translate from "../../app/Translate";
import { ReactComponent as Times } from "../../../fontawesome/solid/times.svg";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";

type Props = {
  showModal: boolean;
  onClose: (event?: MouseEvent | KeyboardEvent | any) => void;
  contentLabel: string;
  innholdsType: Innholdstype;
  unoId: string | undefined | null;
};

class UnoIdSearchModal extends Component<Props & AppStateProps> {
  handleOnUnoIdClicked = (uno_id: string) => {
    if (this.props.unoId) {
      this.props.appState.replaceUnoId(this.props.unoId, uno_id);
    } else this.props.appState.toggleUnoId(uno_id);
    setTimeout(() => {
      this.props.onClose();
    }, 100);
  };

  render() {
    const { contentLabel, onClose, innholdsType } = this.props;
    return (
      <ReactModal
        isOpen={this.props.showModal}
        contentLabel={contentLabel}
        onRequestClose={onClose}
        className={`${styles.Modal}`}
        overlayClassName={`${styles.Overlay}`}
      >
        <div className={`${styles.container}`}>
          <div className={`${styles.container_close}`} onClick={onClose}>
            <Translate nb="Lukk" />
            <Times />
          </div>
          <SearchBox
            className={`${styles.container_searchbox}`}
            innholdstype={innholdsType}
            onUnoIdClick={this.handleOnUnoIdClicked}
          />
        </div>
      </ReactModal>
    );
  }
}

export default with_app_state<Props>(UnoIdSearchModal);
