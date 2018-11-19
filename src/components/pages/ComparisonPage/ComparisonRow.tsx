import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";
import ComparisonHeader from "../../visualizations/Shared/ComparisonHeader";
import ComparisonCell from "./ComparisonCell";

type Props = {
  comparison: SammenligningTemplate;
  comparisonTypes: string[];
  rowData: { [uno_id: string]: any };
};

type State = any;

class ComparisonRow extends Component<Props, State> {
  state: State = {};
  setConfig = (config: any) => {
    this.setState(config);
  };
  renderRow(rowIndex: number) {
    const { comparison, comparisonTypes, rowData } = this.props;
    const config = this.state;

    return comparisonTypes.map((uno_id, i) => {
      const data = rowData ? rowData[uno_id] : null;
      return (
        <ComparisonCell
          key={i}
          data={data}
          config={config}
          comparison={comparison}
          rowIndex={rowIndex}
        />
      );
    });
  }
  render() {
    const { comparison, comparisonTypes, rowData } = this.props;
    const config = this.state;
    const HeaderComponent = comparison.HeaderComponent || ComparisonHeader;
    let content: JSX.Element[];
    if (config.rows) {
      content = (config.rows as string[]).map((row, rowIndex) => (
        <div key={rowIndex}>
          <h4>{row}</h4>
          {this.renderRow(rowIndex)}
        </div>
      ));
    } else {
      content = this.renderRow(0);
    }
    return (
      <div>
        <div className={styles.flex_container_row}>
          <HeaderComponent
            comparison={comparison}
            config={config}
            setConfig={this.setConfig}
          >
            {content}
          </HeaderComponent>
        </div>
      </div>
    );
  }
}

export default ComparisonRow;
