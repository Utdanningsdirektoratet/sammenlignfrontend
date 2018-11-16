import React, { Component } from "react";
import InteresseModal from "../../app/InteresseModal";
import SelectedInterests from "./SelectedInterests";
import SearchBox from "./SearchBox";
import { Innholdstype } from "../../../data/ApiTypes";

import style from "./InterestsHeader.module.scss";

type Props = {
  innholdstype: Innholdstype;
  interesser: string[];
  selected: string[];
  removeAllSelected: Function;
  toggleSelectedInterests: Function;
};

class InterestsHeader extends Component<Props> {
  render() {
    const {
      innholdstype,
      interesser,
      selected,
      toggleSelectedInterests,
      removeAllSelected,
    } = this.props;

    return (
      <div className={`${style.selection}`}>
        <div className={`${style.selection_row}`}>
          <InteresseModal
            interesser={interesser}
            selected={selected}
            toggleSelected={toggleSelectedInterests}
            removeAllSelected={removeAllSelected}
          />
          <div className={`${style.selection_search}`}>
            <SearchBox innholdstype={innholdstype} />
          </div>
        </div>
        <div>
          <SelectedInterests
            selected={selected}
            toggleSelectedInterests={toggleSelectedInterests}
          />
        </div>
      </div>
    );
  }
}

export default InterestsHeader;
