import React, { Component } from "react";
import Translate from "../../app/Translate";
import styles from "../Shared/HeaderFilterDesktop.module.scss";
import OpenIcon from "../Generic/OpenIcon";
import CloseIcon2 from "../Generic/CloseIcon2";
import { UtdanningLonnConfig } from "./UtdanningLonnConfig";
import ClickOutsideListener from "../../utils/ClickOutsideListner";
import UtdanningLonnHeaderFilters from "./UtdanningLonnHeaderFilters";

type Props = {
  config: UtdanningLonnConfig;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  expanded: boolean;
};

class UtdanningLonnHeaderDesktop extends Component<Props, State> {
  state = { expanded: false };

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  closeExpansion = () => {
    this.setState({ expanded: false });
  };

  render() {
    const { config, onFilterClicked } = this.props;
    const containerContent = (
      <div className={`${styles.container_content}`}>
        <UtdanningLonnHeaderFilters
          config={config}
          onFilterClicked={onFilterClicked}
          showHeaders={true}
          showHeaderHelpText={true}
        />
      </div>
    );

    return (
      <ClickOutsideListener
        onOutsideClick={this.closeExpansion}
        className={`${styles.container}`}
      >
        <div
          className={`${styles.container_head}`}
          onClick={this.toggleExpansion}
        >
          <div className={`${styles.container_head_infotext}`}>
            <Translate nb="Se visningsalternativer" />
          </div>
          {/* <div className={`${styles.container_head_upper}`}>
            {" - "}
            <Translate nb="Lønn" />
          </div> */}
          <div className={`${styles.container_head_icon}`}>
            {this.state.expanded ? <CloseIcon2 /> : <OpenIcon />}
          </div>
        </div>
        {this.state.expanded ? containerContent : null}
      </ClickOutsideListener>
    );
  }
}

export default UtdanningLonnHeaderDesktop;
