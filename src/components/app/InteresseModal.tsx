import React, { Component } from "react";
import ReactModal from "react-modal";
import InteresserFilter from "../filters/InteresseFilter";

import style from "./InteresseModal.module.scss";

type State = { showModal: boolean };

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  toggleSelectedItems: Function;
  removeAllSelected: Function;
};

class Modal extends Component<Props> {
  state: State = { showModal: false };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      interesser,
      selected,
      toggleSelected,
      toggleSelectedItems,
      removeAllSelected,
    } = this.props;

    return (
      <>
        <button onClick={this.handleOpenModal} className={`${style.btn}`}>
          Interesser
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Interesser/Kategorier"
          onRequestClose={this.handleCloseModal}
        >
          <button onClick={this.handleCloseModal}>Lukk</button>

          <InteresserFilter
            interesser={interesser}
            selected={selected}
            toggleSelected={toggleSelected}
            toggleSelectedItems={toggleSelectedItems}
            removeAllSelected={removeAllSelected}
            onClick={function () { }}
          />
        </ReactModal>
      </>
    );
  }
}

ReactModal.setAppElement("#root");

export default Modal;
