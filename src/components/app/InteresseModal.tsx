import React, { Component } from "react";
import ReactModal from "react-modal";
import InteresserFilter from "../filters/InteresseFilter";

type State = { showModal: boolean };

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  removeAllSelected: Function;
};

class Modal extends Component<Props> {
  state: State = { showModal: false };

  constructor(props: any) {
    super(props);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      interesser,
      selected,
      toggleSelected,
      removeAllSelected,
    } = this.props;

    return (
      <div>
        <button onClick={this.handleOpenModal}>Interesser</button>
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
            removeAllSelected={removeAllSelected}
          />
        </ReactModal>
      </div>
    );
  }
}

ReactModal.setAppElement("#root");

export default Modal;
