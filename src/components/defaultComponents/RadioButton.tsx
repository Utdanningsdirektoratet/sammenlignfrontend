import React, { Component, ChangeEventHandler } from "react";
import styles from "./DefaultComponents.module.scss";

type Props = {
  text: JSX.Element;
  isSelected: boolean;
  name: string;
  valueKey: string;
  helpText?: JSX.Element;
  onHelpTextClick?: (open: boolean) => void;
  helpTextOpen?: boolean;
  onChange: (event: any) => void;
};

class RadioButton extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  onHelpIconClick = (open: boolean) => {
    if (this.props.onHelpTextClick) this.props.onHelpTextClick(open);
  };

  render() {
    const { text, helpText } = this.props;
    let helpTextDom = null;
    if (this.props.helpText)
      helpTextDom = (
        <div className={`${styles.radio_helptext}`}>
          <span
            onClick={() => this.onHelpIconClick(true)}
            className={`${styles.radio_helptext_icon}`}
          >
            (?)
          </span>
          <div
            className={
              this.props.helpTextOpen
                ? `${styles.radio_helptext_container}`
                : `${styles.radio_helptext_container}` +
                  " " +
                  `${styles.radio_helptext_container__hidden}`
            }
          >
            <p>
              <b>
                {text}
                <span
                  className={`${styles.radio_helptext_container_icon}`}
                  onClick={() => this.onHelpIconClick(false)}
                />
              </b>
              <br /> {helpText}
            </p>
          </div>
        </div>
      );
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
        {helpTextDom}
      </li>
    );
  }
}

export default RadioButton;
