import React, { Component, ChangeEvent } from "react";
import RadioButton from "./RadioButton";
import { randId } from "../../util/Rand";

type RadioButtonGroupType = {
  text: JSX.Element;
  selected: boolean;
  valueKey: string;
  helptext?: JSX.Element;
};

type Props = {
  group: RadioButtonGroupType[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class RadioButtonGroup extends Component<Props> {
  name: string = randId(15);
  render() {
    return this.props.group.map(g => (
      <RadioButton
        key={g.valueKey}
        text={g.text}
        isSelected={g.selected}
        name={this.name}
        valueKey={g.valueKey}
        onChange={this.props.onChange}
        helpText={g.helptext}
      />
    ));
  }
}

export default RadioButtonGroup;
