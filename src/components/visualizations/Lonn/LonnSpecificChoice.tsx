import React, { Component } from "react";
import { LonnElement } from "../../../data/ApiTypes";
import OpenIcon from "../Generic/OpenIcon";
import CloseIcon2 from "../Generic/CloseIcon2";
import Translate from "../../app/Translate";
import styles from "./LonnSpecificChoice.module.scss";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import ClickOutsideListener from "../../utils/ClickOutsideListner";

type Props = {
  onChange: (uno_id: string, ssb_sektor: string) => void;
  data: LonnElement;
  selectedChoice: string;
  unoId: string;
};

type State = {
  openModal: boolean;
};

class LonnSpecificChoice extends Component<Props, State> {
  state = { openModal: false };

  toggleModal = () => {
    if (Object.keys(this.props.data).length <= 1) return;
    this.setState({ openModal: !this.state.openModal });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ssb_sektor = event.currentTarget.id;
    const uno_id = this.props.unoId;

    this.props.onChange(this.props.unoId, ssb_sektor);
  };

  render() {
    const { data, selectedChoice, unoId } = this.props;
    if (!data) return <div />;
    const OpenIconDom =
      Object.keys(data).length > 1 ? (
        <OpenIcon unoId="" onClick={() => {}} />
      ) : null;
    const Modal = this.state.openModal ? (
      <div className={`${styles.modal}`}>
        <div className={`${styles.modal_header}`}>
          <div className={`${styles.modal_header_icon}`}>
            <CloseIcon2 unoId="" onClick={this.toggleModal} />
          </div>
          <div className={`${styles.modal_header_text}`}>
            <div className={`${styles.modal_header_text_header}`}>
              <Translate nb="Viser tall for:" />
            </div>
            <div className={`${styles.modal_header_text_content}`}>
              <RadioButtonGroup
                group={Object.keys(data).map(k => {
                  return {
                    text: k,
                    selected: selectedChoice === k,
                    valueKey: k,
                  } as any;
                })}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <ClickOutsideListener onOutsideClick={this.closeModal}>
        <div className={`${styles.container}`}>
          <div
            className={`${styles.box}`}
            onClick={this.toggleModal}
            style={{
              cursor: `${Object.keys(data).length > 1 ? "pointer" : "auto"}`,
            }}
          >
            <div className={`${styles.box_icon}`}>{OpenIconDom}</div>
            <div className={`${styles.box_text}`}>
              <div className={`${styles.box_text_header}`}>
                <Translate nb="Viser tall for:" />
              </div>
              <div>{selectedChoice}</div>
            </div>
          </div>
          {Modal}
        </div>
      </ClickOutsideListener>
    );
  }
}

export default LonnSpecificChoice;
