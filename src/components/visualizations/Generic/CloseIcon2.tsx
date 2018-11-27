import React, { Component } from "react";
import styles from "./CloseIcon.module.scss";

type Props = {};

class CloseIcon2 extends Component<Props> {
  render() {
    return <span className={`${styles.icon_close2}`} />;
  }
}

export default CloseIcon2;
