import React, { Component } from "react";
import InteresseModal from "../../app/InteresseModal";
import SelectedInterests from "./SelectedInterests";
import SearchBox from "./SearchBox";
import { Innholdstype } from "../../../data/ApiTypes";

import { ReactComponent as ChevronDown } from "../../../fontawesome/solid/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../fontawesome/solid/chevron-up.svg";

import style from "./InterestsHeader.module.scss";
import InteresserFilter from "../../filters/InteresseFilter";

type State = { showInterestFilter: boolean };

type Props = {
  innholdstype: Innholdstype;
  interesser: string[];
  selected: string[];
  removeAllSelected: Function;
  toggleSelectedInterests: Function;
};

class InterestsHeader extends Component<Props, State> {
  state: State = { showInterestFilter: false };

  handleToggleInterestFilter = () => {
    this.setState(prevState => ({
      showInterestFilter: !prevState.showInterestFilter,
    }));
  };

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
          <button
            className={`${style.btn} ${
              this.state.showInterestFilter ? style.unselected : ""
            }`}
          >
            Nivå <ChevronDown />
          </button>
          <button
            onClick={this.handleToggleInterestFilter}
            className={`${style.btn}`}
          >
            Interesser{" "}
            {this.state.showInterestFilter ? <ChevronUp /> : <ChevronDown />}
          </button>
          {/* <SearchBox innholdstype={innholdstype} /> */}
        </div>

        {this.state.showInterestFilter ? (
          <div className={`${style.dropdown}`}>
            <InteresserFilter
              interesser={interesser}
              selected={selected}
              toggleSelected={toggleSelectedInterests}
              removeAllSelected={removeAllSelected}
            />
          </div>
        ) : null}
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
