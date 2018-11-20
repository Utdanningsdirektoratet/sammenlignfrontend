import React from "react";
import styles from "./InteresseFilter.module.scss";

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  removeAllSelected: Function;
};

class InteresserFilter extends React.Component<Props> {
  checkIsChecked = (i: string) => {
    const interestIndex = this.props.selected.indexOf(i);
    return interestIndex > -1;
  };

  public render() {
    const {
      interesser,
      selected,
      toggleSelected,
      removeAllSelected,
    } = this.props;
    return (
      <div className={styles.interessefilter_container}>
        <p
          className={styles.interessefilter_container_nullstill}
          onClick={() => removeAllSelected()}
        >
          Nullstill X
        </p>
        <div className={styles.interessefilter_container_items}>
          {interesser.map((itrest: string, i: number) => (
            <div
              className={styles.interessefilter_container_items__item}
              key={i}
            >
              <label>
                <input
                  type="checkbox"
                  value={itrest}
                  checked={this.checkIsChecked(itrest)}
                  onChange={() => toggleSelected(itrest)}
                />{" "}
                {itrest}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InteresserFilter;
