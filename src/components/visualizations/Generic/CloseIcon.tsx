import React, { Component } from "react";
import styles from "./CloseIcon.module.scss";

type Props = {};

class CloseIcon extends Component<Props> {
  render() {
    return <span className={`${styles.icon_close}`} />;
  }
}

export default CloseIcon;
