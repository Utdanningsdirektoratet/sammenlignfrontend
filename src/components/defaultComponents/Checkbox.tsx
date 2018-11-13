import React, { Component, ChangeEventHandler } from "react";
import Translate from "../app/Translate";

type Props = {
  textNb: string;
  textNn: string;
  isSelected: boolean;
  valueKey: string;
  onChange: (event: ChangeEventHandler<HTMLInputElement>) => void;
};

class Checkbox extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };
  render() {
    return (
      <label>
        <input
          type="checkbox"
          id={this.props.valueKey}
          checked={this.props.isSelected}
          onChange={this.onChange}
        />
        {<Translate nb={this.props.textNb} nn={this.props.textNn} />}
      </label>
    );
  }
}

export default Checkbox;
