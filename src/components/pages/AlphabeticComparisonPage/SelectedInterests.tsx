import React, { Component } from "react";

import styles from "./SelectedInterests.module.scss";

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
                  {selected}
                </div>
                <button
                  className={`${styles.selection_row_item_close}`}
                  data-uno_id={selected}
                  onClick={this.handleRemoveClick}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default SelectedInterests;
