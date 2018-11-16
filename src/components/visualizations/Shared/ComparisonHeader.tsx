import React, { Component } from "react";

import styles from "./ComparisonHeader.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";

export interface ComparisonHeaderProps<T> {
  comparison: SammenligningTemplate;
  children: JSX.Element[];
  config: T;
  setConfig: (config: T) => void;
}

class ComparisonHeader extends Component<ComparisonHeaderProps<any>> {
  render() {
    const { comparison, children } = this.props;
    return (
      <div>
        <h3 className={`${styles.flex_item} ${styles.item_title}`}>
          {comparison.title}
        </h3>
        {children}
      </div>
    );
  }
}

export default ComparisonHeader;
