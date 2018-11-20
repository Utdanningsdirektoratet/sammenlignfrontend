import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "./HeaderFilterDesktop.module.scss";
import OpenIcon from "../Generic/OpenIcon";
import CloseIcon2 from "../Generic/CloseIcon2";
import { VisualizationHeaderConfigLonn } from "./VisualizationHeaderLonn";
import HeaderLonnFilters from "./HeaderLonnFilters";

type Props = {
  config: VisualizationHeaderConfigLonn;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  expanded: boolean;
};

class HeaderFilterDesktop extends Component<Props, State> {
  state = { expanded: false };

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { config, onFilterClicked } = this.props;
    const containerContent = (
      <div className={styles.container_content}>
        <HeaderLonnFilters
          config={config}
          onFilterClicked={onFilterClicked}
          showHeaders={true}
          showHeaderHelpText={true}
        />
      </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.container_head}>
          <div className={styles.container_head_infotext}>
            <Translate nb="Visningsalternativer" nn="nynorsk" />
          </div>
          <div className={styles.container_head_upper}>
            {" - "}
            <Translate nb="Lønn" nn="nynorsk" />
          </div>
          <div className={styles.container_head_icon}>
            {this.state.expanded ? (
              <CloseIcon2 onClick={this.toggleExpansion} unoId="" />
            ) : (
              <OpenIcon onClick={this.toggleExpansion} unoId="" />
            )}
          </div>
        </div>
        {this.state.expanded ? containerContent : null}
      </div>
    );
  }
}

export default HeaderFilterDesktop;
