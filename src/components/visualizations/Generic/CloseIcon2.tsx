import React, { Component } from "react";
import styles from "./CloseIcon.module.scss";

type Props = {
  onClick: (event: any) => void;
  unoId: string;
};

class CloseIcon2 extends Component<Props> {
  render() {
    return (
      <span
        className={`${styles.icon_close2}`}
        data-uno_id={this.props.unoId}
        onClick={this.props.onClick}
      />
    );
  }
}

export default CloseIcon2;
