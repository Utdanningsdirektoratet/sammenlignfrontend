import React, { Component, ChangeEventHandler } from "react";
import Tooltip from "./Tooltip";

type Props = {
  text: JSX.Element;
  isSelected: boolean;
  name: string;
  valueKey: string;
  helpText?: JSX.Element;
  onChange: (event: any) => void;
};

class RadioButton extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  render() {
    const { text, helpText } = this.props;
    return (
      <li key={this.props.valueKey}>
        <label>
          <input
            type="radio"
            name={this.props.name}
            id={this.props.valueKey}
            checked={this.props.isSelected}
            onChange={this.onChange}
          />
          {text}
        </label>
        {helpText ? (
          <Tooltip icon="(?)" header={text} content={helpText} />
        ) : null}
      </li>
    );
  }
}

export default RadioButton;
