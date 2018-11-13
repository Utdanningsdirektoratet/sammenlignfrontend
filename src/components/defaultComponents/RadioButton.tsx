import React, { Component, ChangeEventHandler } from "react";
import Translate from "../app/Translate";

type Props = {
  textNb: string;
  textNn: string;
  isSelected: boolean;
  name: string;
  valueKey: string;
  onChange: (event: any) => void;
};

class RadioButton extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  render() {
    return (
      <label>
        <input
          type="radio"
          name={this.props.name}
          id={this.props.valueKey}
          checked={this.props.isSelected}
          onChange={this.onChange}
        />
        {<Translate nb={this.props.textNb} nn={this.props.textNn} />}
      </label>
    );
  }
}

export default RadioButton;
