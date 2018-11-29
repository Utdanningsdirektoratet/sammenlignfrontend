import React, { Component } from "react";

import styles from "./SelectedInterests.module.scss";
import CloseIcon from "../../visualizations/Generic/CloseIcon";

type Props = {
  selected: string[];
  toggleSelectedInterests: Function;
};

class SelectedInterests extends Component<Props> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.toggleSelectedInterests(
      e.currentTarget.getAttribute("data-uno_id")
    );
  };
  render() {
    const { selected } = this.props;
    return (
      <>
        <div className={`${styles.selection}`}>
          <ul className={`${styles.selection_row}`}>
            {selected.map(selected => (
              <li className={`${styles.selection_row_item}`}>
                <div className={`${styles.selection_row_item_text}`}>
                  {selected.charAt(0).toUpperCase() + selected.slice(1)}
                </div>
                <span onClick={this.handleRemoveClick} data-unoId={selected}>
                  <CloseIcon />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default SelectedInterests;
