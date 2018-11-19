import React, { Component, ChangeEventHandler } from "react";
import Tooltip from "./Tooltip";

type Props = {
  text: JSX.Element;
  isSelected: boolean;
  valueKey: string;
  helpText?: JSX.Element;
  onChange: (event: ChangeEventHandler<HTMLInputElement>) => void;
};

class Checkbox extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  render() {
    const { text, helpText } = this.props;
    return (
      <li>
        <label>
          <input
            type="checkbox"
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

export default Checkbox;
