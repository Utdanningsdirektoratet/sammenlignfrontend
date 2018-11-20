import React, { Component } from "react";
import styles from "./Tooltip.module.scss";

type Props = {
  icon: any;
  header: any;
  content: any;
};

type State = {
  open: boolean;
};
// store open tooltips in a global variable, so that we can ensure only
// a single tootip is open at the same time,
let CLOSE_OPEN_TOOLTIP: (() => void) | null = null;

function ReplaceOpenTooltip(close: () => void) {
  if (CLOSE_OPEN_TOOLTIP) CLOSE_OPEN_TOOLTIP();
  CLOSE_OPEN_TOOLTIP = close;
}
function ClearOpenTooltip() {
  if (CLOSE_OPEN_TOOLTIP) CLOSE_OPEN_TOOLTIP();
  CLOSE_OPEN_TOOLTIP = null;
}

class Tooltip extends Component<Props, State> {
  state: State = { open: false };

  close = () => {
    this.setState({ open: false });
  };
  componentWillUnmount() {
    if (this.state.open) {
      ClearOpenTooltip();
    }
  }
  handleToogle = () => {
    if (this.state.open) {
      ClearOpenTooltip();
    } else {
      this.setState({ open: true });
      ReplaceOpenTooltip(this.close);
    }
  };
  handleOpen = () => {
    this.setState({ open: true });
    ReplaceOpenTooltip(this.close);
  };

  blurHandler = () => {};

  render() {
    const { header, icon, content } = this.props;
    const { open } = this.state;

    return (
      <div className={`${styles.tooltip_helptext}`}>
        <button
          onClick={this.handleToogle}
          className={`${styles.tooltip_helptext_icon}`}
          tabIndex={0}
          onBlur={ClearOpenTooltip}
        >
          {icon}
        </button>
        <div
          onClick={this.handleToogle}
          className={
            open
              ? `${styles.tooltip_helptext_container}`
              : `${styles.tooltip_helptext_container}` +
                " " +
                `${styles.tooltip_helptext_container__hidden}`
          }
        >
          <p>
            <b>
              {header}
              <span className={`${styles.tooltip_helptext_container_icon}`} />
            </b>
            <br /> {content}
          </p>
        </div>
      </div>
    );
  }
}

export default Tooltip;
