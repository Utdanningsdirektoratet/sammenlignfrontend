import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";

import { SammenligningTemplate } from "../../comparisonsConfig";
import ComparisonHeader from "./ComparisonHeader";
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
  render() {
    const { comparison, comparisonTypes, rowData } = this.props;
    const config = this.state;
    return (
      <div>
        {comparison.HeaderComponent ? (
          <comparison.HeaderComponent
            comparison={comparison}
            config={config}
            setConfig={this.setConfig}
          />
        ) : (
          <ComparisonHeader
            comparison={comparison}
            config={config}
            setConfig={this.setConfig}
          />
        )}
        <div className={styles.flex_container_row}>
          {comparisonTypes.map((uno_id, i) => {
            const data = rowData ? rowData[uno_id] : null;
            return (
              <ComparisonCell
                key={i}
                data={data}
                config={config}
                comparison={comparison}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComparisonRow;
