import React, { Component } from "react";
import { LonnElement } from "../../../data/ApiTypes";
import OpenIcon from "../Generic/OpenIcon";
import CloseIcon2 from "../Generic/CloseIcon2";
import Translate from "../../app/Translate";
import styles from "./LonnSpecificChoice.module.scss";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";

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
    this.setState({ openModal: !this.state.openModal });
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
        <OpenIcon unoId="" onClick={this.toggleModal} />
      ) : null;
    const Modal = this.state.openModal ? (
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <div className={styles.modal_header_icon}>
            <CloseIcon2 unoId="" onClick={this.toggleModal} />
          </div>
          <div className={styles.modal_header_text}>
            <div className={styles.modal_header_text_header}>
              <Translate nb="Viser tall for: " nn="nynorsk" />
            </div>
            <div className={styles.modal_header_text_content}>
              <RadioButtonGroup
                group={Object.keys(data).map(k => {
                  return {
                    text: k,
                    selected: selectedChoice === k,
                    valueKey: k,
                  } as any;
                })}
                name={"specificChoice_" + unoId}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.box_icon}>{OpenIconDom}</div>
          <div className={styles.box_text}>
            <div className={styles.box_text_header}>
              <Translate nb="Viser tall for: " nn="nynorsk" />
            </div>
            <div className={styles.box_text_choice}>{selectedChoice}</div>
          </div>
        </div>
        {Modal}
      </div>
    );
  }
}

export default LonnSpecificChoice;
