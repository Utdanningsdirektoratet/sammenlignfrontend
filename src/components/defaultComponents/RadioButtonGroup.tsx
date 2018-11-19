import React, { Component, ChangeEventHandler } from "react";
import RadioButton from "./RadioButton";

type RadioButtonGroupType = {
  text: JSX.Element;
  selected: boolean;
  valueKey: string;
  helptext?: JSX.Element;
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
      <RadioButton
        key={g.valueKey}
        text={g.text}
        isSelected={g.selected}
        name={this.props.name}
        valueKey={g.valueKey}
        onChange={this.testOnChange}
        helpText={g.helptext}
      />
    ));
  }
}

export default RadioButtonGroup;
