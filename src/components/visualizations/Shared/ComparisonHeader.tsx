import React, { Component } from "react";

import styles from "./ComparisonHeader.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";

export interface Props {
  comparison: SammenligningTemplate;
}

class ComparisonHeader extends Component<Props> {
  render() {
    const { comparison, children } = this.props;
    return (
      <div>
        <h2 className={`${styles.flex_item} ${styles.item_title}`}>
          {comparison.title}
        </h2>
      </div>
    );
  }
}

export default ComparisonHeader;
