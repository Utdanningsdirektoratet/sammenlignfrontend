import React, { Component } from "react";

import styles from "./SelectedInterests.module.scss";
import CloseIcon from "../../visualizations/Generic/CloseIcon";

type Props = {
  selectedInterests: string[];
  selectedNivåer: string[];
  toggleSelectedInterests: Function;
  toggleSelectedNivåer: Function;
};

class SelectedInterests extends Component<Props> {
  handleRemoveInterestClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.toggleSelectedInterests(
      e.currentTarget.getAttribute("data-uno_id")
    );
  };

  handleRemoveNivåClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.toggleSelectedNivåer(
      e.currentTarget.getAttribute("data-uno_id")
    );
  };

  render() {
    const { selectedInterests, selectedNivåer } = this.props;
    let filters: { [key: string]: string[] } = {};
    filters["nivå"] = selectedNivåer;
    filters["interesse"] = selectedInterests;

    return (
      <>
        <div className={`${styles.selection}`}>
          <ul className={`${styles.selection_row}`}>
            {Object.keys(filters).map(filterKey => {
              if (filterKey === "nivå") {
                return filters[filterKey].map(selected => {
                  return (
                    <li
                      key={selected}
                      className={`${styles.selection_row_item}`}
                    >
                      <div className={`${styles.selection_row_item_text}`}>
                        {selected.charAt(0).toUpperCase() + selected.slice(1)}
                      </div>
                      <span
                        onClick={this.handleRemoveNivåClick}
                        data-uno_id={selected}
                      >
                        <CloseIcon />
                      </span>
                    </li>
                  );
                });
              } else {
                return filters[filterKey].map(selected => {
                  return (
                    <li
                      key={selected}
                      className={`${styles.selection_row_item}`}
                    >
                      <div className={`${styles.selection_row_item_text}`}>
                        {selected.charAt(0).toUpperCase() + selected.slice(1)}
                      </div>
                      <span
                        onClick={this.handleRemoveInterestClick}
                        data-uno_id={selected}
                      >
                        <CloseIcon />
                      </span>
                    </li>
                  );
                });
              }
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default SelectedInterests;
