import React, { Component } from "react";

import styles from "./ComparisonHeader.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";

export type ComparisonHeaderProps = {
  comparison: SammenligningTemplate;
  config: any;
  setConfig: (config: any) => void;
};

class ComparisonHeader extends Component<ComparisonHeaderProps> {
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
