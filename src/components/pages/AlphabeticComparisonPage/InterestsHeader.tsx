import React, { Component } from "react";
import InteresseModal from "../../app/InteresseModal";
import SelectedInterests from "./SelectedInterests";
import SearchBox from "../../ui/SearchBox";
import { Innholdstype } from "../../../data/ApiTypes";

import { ReactComponent as ChevronDown } from "../../../fontawesome/solid/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../fontawesome/solid/chevron-up.svg";

import style from "./InterestsHeader.module.scss";
import InteresserFilter from "../../filters/InteresseFilter";
import Translate from "../../app/Translate";
import NivåFilter from "../../filters/NivåFilter";
import ClickOutsideListener from "../../utils/ClickOutsideListner";
import { num_compare_sizing } from "../../utils/NumCompareSizing";
import { MIN_DESKTOP_PX } from "../../../util/Constants";

type State = { showInterestFilter: boolean; showNivåFilter: boolean };

type Props = {
  innholdstype: Innholdstype;
  interesser: string[];
  nivåer: string[];
  selectedInterests: string[];
  selectedNivåer: string[];
  removeAllSelectedInterests: Function;
  toggleSelectedNivå: Function;
  toggleSelectedInterest: Function;
  toggleSelectedInterests: Function;
};

class InterestsHeader extends Component<Props, State> {
  state: State = { showInterestFilter: false, showNivåFilter: false };

  handleToggleInterestFilter = () => {
    this.setState(prevState => ({
      showInterestFilter: !prevState.showInterestFilter,
    }));
  };

  handleToggleNivåFilter = () => {
    this.setState(prevState => ({
      showNivåFilter: !prevState.showNivåFilter,
    }));
  };

  handleNivåBlur = () => {
    if (this.state.showNivåFilter) this.setState({ showNivåFilter: false });
  };

  handleArrowClickOnNivå = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      this.handleToggleNivåFilter();
    }
  };

  render() {
    const {
      innholdstype,
      interesser,
      nivåer,
      selectedInterests,
      selectedNivåer,
      toggleSelectedInterest,
      toggleSelectedNivå,
      toggleSelectedInterests,
      removeAllSelectedInterests,
    } = this.props;

    return (
      <div className={`${style.selection}`}>
        <div className={`${style.selection_row}`}>
          <div className={`${style.searchbox}`}>
            <SearchBox
              innholdstype={innholdstype}
              focusOnMount={innerWidth >= MIN_DESKTOP_PX}
            />
          </div>
          <div className={`${style.filterContainer}`}>
            <div className={`${style.dropdown_container}`}>
              <ClickOutsideListener onOutsideClick={this.handleNivåBlur}>
                <button
                  onKeyDown={this.handleArrowClickOnNivå}
                  onClick={this.handleToggleNivåFilter}
                  className={`${style.btn} ${
                    this.state.showInterestFilter ? style.unselected : ""
                  }`}
                >
                  {selectedNivåer.length > 0 ? (
                    selectedNivåer.length === 1 ? (
                      <Translate
                        nb="%number% nivå"
                        replacements={{
                          "%number%": selectedNivåer.length.toString(),
                        }}
                      />
                    ) : (
                      <Translate
                        nb="%number% nivåer"
                        replacements={{
                          "%number%": selectedNivåer.length.toString(),
                        }}
                      />
                    )
                  ) : (
                    <Translate nb="Alle nivåer" />
                  )}

                  {this.state.showNivåFilter ? <ChevronUp /> : <ChevronDown />}
                </button>
                {this.state.showNivåFilter ? (
                  <div className={`${style.dropdown}`}>
                    <NivåFilter
                      nivåer={nivåer}
                      selected={selectedNivåer}
                      toggleSelected={toggleSelectedNivå}
                      closeDropdown={this.handleNivåBlur}
                    />
                  </div>
                ) : null}
              </ClickOutsideListener>
            </div>

            <button
              onClick={this.handleToggleInterestFilter}
              className={`${style.btn} ${style.btn_interests}`}
            >
              <Translate nb="Interesser" />{" "}
              {this.state.showInterestFilter ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>

        {this.state.showInterestFilter ? (
          <div className={`${style.notdropdown}`}>
            <InteresserFilter
              interesser={interesser}
              selected={selectedInterests}
              toggleSelected={toggleSelectedInterest}
              toggleSelectedItems={toggleSelectedInterests}
              removeAllSelected={removeAllSelectedInterests}
            />
          </div>
        ) : null}
        <div>
          <SelectedInterests
            selectedInterests={selectedInterests}
            selectedNivåer={selectedNivåer}
            toggleSelectedInterests={toggleSelectedInterest}
            toggleSelectedNivåer={toggleSelectedNivå}
          />
        </div>
      </div>
    );
  }
}

export default num_compare_sizing<Props>(InterestsHeader);
