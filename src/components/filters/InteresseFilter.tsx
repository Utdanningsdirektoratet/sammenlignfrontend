import React from "react";
import "./InteresseFilter.scss";

type Props = {
  interesser: string[];
  selected: string[];
  toggleSelected: Function;
  removeSelected: Function
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
        <h2 className="interessefilter_container-header">Interesser/kategorier</h2>
        <p className="interessefilter_container-nullstill" onClick={() => removeSelected()}>Nullstill X</p>
        {interesser.map((itrest: string, i: number) => (
          <span key={i}>
            <input
              type="checkbox"
              value={itrest}
              checked={this.checkIsChecked(itrest)}
              onChange={() => toggleSelected(itrest)}              
            /> {itrest}
          </span>
        ))}
      </div>
    );
  }
}

export default InteresserFilter;
