import React, { Component } from "react";
import { VisualizationHeaderConfigArbeidsledighet } from "./VisualizationHeaderArbeidsledighet";
import OpenIcon from "../Generic/OpenIcon";
import CloseIcon2 from "../Generic/CloseIcon2";
import Translate from "../../app/Translate";
import styles from "../Shared/HeaderFilterDesktop.module.scss";
import HeaderArbeidsledighetFilters from "./HeaderArbeidsledighetFilters";
import ClickOutsideListener from "../../utils/ClickOutsideListner";

type Props = {
  config: VisualizationHeaderConfigArbeidsledighet;
  onFilterClicked: (event: any, key: string) => void;
};

type State = {
  expanded: boolean;
};

class ArbeidsledighetHeaderFilterDesktop extends Component<Props, State> {
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
      <div className={styles.container_content_arbeidsledighet}>
        <HeaderArbeidsledighetFilters
          config={config}
          onFilterClicked={onFilterClicked}
          showHeaders={true}
          showHeaderHelpText={true}
        />
      </div>
    );

    return (
      <ClickOutsideListener
        className={styles.container}
        onOutsideClick={this.closeExpansion}
      >
        <div className={styles.container_head}>
          <div className={styles.container_head_infotext}>
            <Translate nb="Visningsalternativer" />
          </div>
          <div className={styles.container_head_upper}>
            {" - "}
            <Translate nb="Ledighet" />
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
      </ClickOutsideListener>
    );
  }
}

export default ArbeidsledighetHeaderFilterDesktop;
