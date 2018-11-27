import React, { Component } from "react";
import ReactModal from "react-modal";

import { AppStateProps, with_app_state } from "../../app/AppContext";
import { ReactComponent as ExclamationCircle } from "../../../fontawesome/solid/exclamation-circle.svg";

import styles from "./ErrorModal.module.scss";
import Translate, { TranslateString } from "../../app/Translate";

type Props = {};
class ErrorModal extends Component<Props & AppStateProps> {
  render() {
    if (!this.props.appState.errorModalContent) return null;
    return (
      <ReactModal
        isOpen={true}
        contentLabel={TranslateString("Maks antall sammenligninger valgt")}
        onRequestClose={this.props.appState.errorModalClear}
        className={`${styles.Modal}`}
        overlayClassName={`${styles.Overlay}`}
      >
        <div className={`${styles.text_container}`}>
          <ExclamationCircle />
          <h2 className={`${styles.text_container_header}`}>
            <Translate nb="Maks antall sammenligninger valgt" />
          </h2>
          <div className={`${styles.text_container_text}`}>
            {this.props.appState.errorModalContent}
          </div>
          <button
            className={`${styles.close_btn}`}
            onClick={this.props.appState.errorModalClear}
          >
            OK
          </button>
        </div>
      </ReactModal>
    );
  }
}
export default with_app_state<Props>(ErrorModal);
