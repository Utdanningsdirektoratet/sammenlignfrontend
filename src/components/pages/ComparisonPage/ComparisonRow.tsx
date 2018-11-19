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
          unoId={uno_id}
          setConfig={this.setConfig}
        />
      );
    });
  }
  render() {
    const { comparison, comparisonTypes, rowData } = this.props;
    const config = this.state;
    const HeaderComponent = comparison.HeaderComponent || ComparisonHeader;
    let content: any;
    if (config.rows) {
      content = (config.rows as string[]).map((row, rowIndex) => (
        <div key={rowIndex}>
          {row ? <h4 className={styles.row_headline}>{row}</h4> : null}
          <div className={styles.flex_container_row}>
            {this.renderRow(rowIndex)}
          </div>
        </div>
      ));
    } else {
      content = (
        <div className={styles.flex_container_row}>{this.renderRow(0)}</div>
      );
    }
    return (
      <div>
        <HeaderComponent
          comparison={comparison}
          config={config}
          setConfig={this.setConfig}
        >
          {content}
        </HeaderComponent>
      </div>
    );
  }
}

export default ComparisonRow;
