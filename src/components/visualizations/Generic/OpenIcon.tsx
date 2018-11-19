import React, { Component } from "react";
import styles from "./CloseIcon.module.scss";

type Props = {
  onClick: (event: any) => void;
  unoId: string;
};

class OpenIcon extends Component<Props> {
  render() {
    return (
      <span
        className={styles.icon_open}
        data-uno_id={this.props.unoId}
        onClick={this.props.onClick}
      />
    );
  }
}

export default OpenIcon;
