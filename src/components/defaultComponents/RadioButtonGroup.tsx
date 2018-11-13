import React, { Component, ChangeEventHandler } from "react";
import RadioButton from "./RadioButton";

type RadioButtonGroupType = {
  textNb: string;
  textNn: string;
  selected: boolean;
  valueKey: string;
};

type Props = {
  group: RadioButtonGroupType[];
  name: string;
  onChange: (event: ChangeEventHandler<HTMLInputElement>) => void;
};

class RadioButtonGroup extends Component<Props> {
  testOnChange = (event: any) => {
    this.props.onChange(event);
  };

  render() {
    return this.props.group.map(g => (
      <li key={g.valueKey}>
        <RadioButton
          textNb={g.textNb}
          textNn={g.textNn}
          isSelected={g.selected}
          name={this.props.name}
          valueKey={g.valueKey}
          onChange={this.testOnChange}
        />
      </li>
    ));
  }
}

export default RadioButtonGroup;
