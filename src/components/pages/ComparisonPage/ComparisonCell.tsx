import React, { Component } from "react";
import { SammenligningTemplate } from "../../comparisonsConfig";

import styles from "./ComparisonCell.module.scss";
import NoData from "../../visualizations/Old/NoData";

type Props = {
  data: any;
  config: any;
  comparison: SammenligningTemplate;
};

type State = { error: boolean };

class ComparisonCell extends Component<Props, State> {
  state: State = { error: false };
  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (!this.state.error)
      try {
        const { data, config, comparison } = this.props;
        return (
          <div className={`${styles.flex_item} ${styles.item}`}>
            {data ? comparison.render(data, config) : <NoData />}
          </div>
        );
      } catch (error) {
        this.setState({ error: true });
      }
    return <div className={`${styles.flex_item} ${styles.item}`}>Error</div>;
  }
}

export default ComparisonCell;
