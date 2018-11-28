import React, { Component } from "react";
import styles from "./HeaderVisualizations.module.scss";

type Props = {
  mainHeader: JSX.Element;
  secondHeader: JSX.Element;
};

class HeaderVisualizations extends Component<Props> {
  render() {
    return (
      <div className={styles.header}>
        <h2>{this.props.mainHeader}</h2>
        <h4>{this.props.secondHeader}</h4>
      </div>
    );
  }
}

export default HeaderVisualizations;
