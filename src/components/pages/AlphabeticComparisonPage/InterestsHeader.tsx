import React, { Component } from "react";
import InteresseModal from "../../app/InteresseModal";
import SelectedInterests from "./SelectedInterests";
import SearchBox from "./SearchBox";
import { Innholdstype } from "../../../data/ApiTypes";

import { ReactComponent as ChevronDown } from "../../../fontawesome/solid/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../fontawesome/solid/chevron-up.svg";

import style from "./InterestsHeader.module.scss";
import InteresserFilter from "../../filters/InteresseFilter";
import Translate from "../../app/Translate";

type State = { showInterestFilter: boolean };

type Props = {
  innholdstype: Innholdstype;
  interesser: string[];
  selected: string[];
  removeAllSelected: Function;
  toggleSelectedInterest: Function;
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
      toggleSelectedInterest,
      toggleSelectedInterests,
      removeAllSelected,
    } = this.props;

    return (
      <div className={`${style.selection}`}>
        <div className={`${style.selection_row}`}>
          <div>
            <SearchBox innholdstype={innholdstype} />
          </div>
          <div>
            <button
              className={`${style.btn} ${
                this.state.showInterestFilter ? style.unselected : ""
              }`}
            >
              <Translate nb="Nivå" />
              <ChevronDown />
            </button>
            <button
              onClick={this.handleToggleInterestFilter}
              className={`${style.btn}`}
            >
              <Translate nb="Interesser" />{" "}
              {this.state.showInterestFilter ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>

        {this.state.showInterestFilter ? (
          <div className={`${style.dropdown}`}>
            <InteresserFilter
              interesser={interesser}
              selected={selected}
              toggleSelected={toggleSelectedInterest}
              toggleSelectedItems={toggleSelectedInterests}
              removeAllSelected={removeAllSelected}
            />
          </div>
        ) : null}
        <div>
          <SelectedInterests
            selected={selected}
            toggleSelectedInterests={toggleSelectedInterest}
          />
        </div>
      </div>
    );
  }
}

export default InterestsHeader;
