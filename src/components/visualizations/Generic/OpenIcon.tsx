import React, { Component } from "react";
import styles from "./CloseIcon.module.scss";

type Props = {};

class OpenIcon extends Component<Props> {
  render() {
    return <span className={`${styles.icon_open}`} />;
  }
}

export default OpenIcon;
