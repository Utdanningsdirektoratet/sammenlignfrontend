import React, { Component, ChangeEventHandler } from "react";
import RadioButton from "./RadioButton";

type RadioButtonGroupType = {
  textNb: string;
  textNn: string;
  selected: boolean;
  valueKey: string;
  helpTextNb?: string;
  helpTextNn?: string;
  onHelpTextClick?: (open: boolean) => void;
  helpTextOpen?: boolean;
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
        textNb={g.textNb}
        textNn={g.textNn}
        isSelected={g.selected}
        name={this.props.name}
        valueKey={g.valueKey}
        onChange={this.testOnChange}
        helpTextNb={g.helpTextNb}
        helpTextNn={g.helpTextNn}
        onHelpTextClick={g.onHelpTextClick}
        helpTextOpen={g.helpTextOpen}
      />
    ));
  }
}

export default RadioButtonGroup;
