import React from "react";
import styles from "./NivåFilter.module.scss";
import Translate from "../app/Translate";

type Props = {
  nivåer: string[];
  selected: string[];
  toggleSelected: Function;
  closeDropdown: Function;
};

class NivåFilter extends React.Component<Props> {
  checkIsChecked = (i: string) => {
    const nivåIndex = this.props.selected.indexOf(i);
    return nivåIndex > -1;
  };

  handleArrowClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let value = e.currentTarget.getAttribute("value");
      if (value) this.props.toggleSelected(value);
    } else if (e.key === "Escape") {
      this.props.closeDropdown();
    }
  };

  render() {
    const { nivåer, toggleSelected } = this.props;

    return (
      <div className={`${styles.container}`}>
        <div>
          <div className={`${styles.container_title}`}>
            <h3><Translate nb="Velg nivå"></Translate></h3>
          </div>
          {nivåer.map((nivå: string, i: number) => (
            <label key={i}>
              <input
                type="checkbox"
                value={nivå}
                checked={this.checkIsChecked(nivå)}
                onChange={() => toggleSelected(nivå)}
                onKeyDown={this.handleArrowClick}
              />
              {this.checkIsChecked(nivå) == true &&
                <span className={`${styles.container_radio} ${styles.container_checked}`}></span>
              }
              {this.checkIsChecked(nivå) != true &&
                <span className={`${styles.container_radio}`}></span>
              }
              {" "}
              {nivå.charAt(0).toUpperCase() + nivå.slice(1)}
            </label>
          ))}
        </div>
        <div className={`${styles.container_close}`}>
          <h3 onClick={() => this.props.closeDropdown()}>LUKK</h3>
        </div>
      </div>
    );
  }
}

export default NivåFilter;
