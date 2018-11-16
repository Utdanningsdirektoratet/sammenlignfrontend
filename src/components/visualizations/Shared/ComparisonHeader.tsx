import React, { Component } from "react";

import styles from "./ComparisonHeader.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";

export interface ComparisonHeaderProps<T> {
  comparison: SammenligningTemplate;
  config: T;
  setConfig: (config: T) => void;
}

class ComparisonHeader extends Component<ComparisonHeaderProps<any>> {
  render() {
    const { comparison } = this.props;
    return (
      <h3 className={`${styles.flex_item} ${styles.item_title}`}>
        {comparison.title}
      </h3>
    );
  }
}

export default ComparisonHeader;
