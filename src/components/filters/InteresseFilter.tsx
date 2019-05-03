import React from "react";
import styles from "./InteresseFilter.module.scss";
import Translate from "../app/Translate";
import CloseIcon from "../visualizations/Generic/CloseIcon";

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  toggleSelectedItems: Function;
  removeAllSelected: Function;
  onClick: Function;
};

class InteresserFilter extends React.Component<Props> {
  checkIsChecked = (i: string) => {
    const interestIndex = this.props.selected.indexOf(i);
    return interestIndex > -1;
  };

  handleFilterCloseClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    console.log(e);
    this.props.onClick();
  }

  public render() {
    const {
      interesser,
      selected,
      toggleSelected,
      toggleSelectedItems,
      removeAllSelected,
    } = this.props;
    return (
      <div>
        <div className={`${styles.interessefilter_container_filters}`}>
          <div>
            <label>
              <input
                type="checkbox"
                checked={
                  this.props.selected.length === this.props.interesser.length
                }
                onChange={() => toggleSelectedItems(this.props.interesser)}
              />
              <Translate nb="Velg alle" />
            </label>
          </div>
          <div
            className={`${styles.interessefilter_container_filters_nullstill}`}
            onClick={() => removeAllSelected()}
          >
            <Translate nb="Nullstill" />
            <CloseIcon />
          </div>
        </div>
        <div className={`${styles.interessefilter_container_title}`}>
          <h3><Translate nb="Velg interesser"></Translate></h3>
        </div>
        <div className={`${styles.interessefilter_container_items}`}>

          {interesser.map((itrest: string, i: number) => (
            <div
              className={`${styles.interessefilter_container_items__item}`}
              key={i}
            >
              <label>
                <input
                  type="checkbox"
                  value={itrest}
                  checked={this.checkIsChecked(itrest)}
                  onChange={() => toggleSelected(itrest)}
                />{" "}
                {itrest.charAt(0).toUpperCase() + itrest.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <div className={`${styles.interessefilter_container_close}`}>
          <h3 onClick={this.handleFilterCloseClick}>LUKK</h3>
        </div>
      </div>
    );
  }
}

export default InteresserFilter;
