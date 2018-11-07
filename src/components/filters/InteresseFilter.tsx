import React from "react";
import "./InteresseFilter.scss";

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  removeSelected: Function;
};

class InteresserFilter extends React.Component<Props> {
  checkIsChecked = (i: string) => {
    const interestIndex = this.props.selected.indexOf(i);
    return interestIndex > -1;
  };

  public render() {
    const { interesser, selected, toggleSelected, removeSelected } = this.props;
    return (
      <div className="interessefilter_container">
        <h2 className="interessefilter_container-header">
          Interesser/kategorier
        </h2>
        <p
          className="interessefilter_container-nullstill"
          onClick={() => removeSelected()}>Nullstill X</p>
        <div className="interessefilter_container-items">
          {interesser.map((itrest: string, i: number) => (
            <div className="interessefilter_container-items--item" key={i}>
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
