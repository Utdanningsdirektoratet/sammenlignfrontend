import React, { Component, ChangeEventHandler } from "react";
import Translate from "../app/Translate";
import styles from "./DefaultComponents.module.scss";

type Props = {
  textNb: string;
  textNn: string;
  isSelected: boolean;
  name: string;
  valueKey: string;
  helpTextNb?: string;
  helpTextNn?: string;
  onHelpTextClick?: (open: boolean) => void;
  helpTextOpen?: boolean;
  onChange: (event: any) => void;
};

class RadioButton extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  onHelpIconClick = () => {
    if (this.props.onHelpTextClick && !this.props.helpTextOpen)
      this.props.onHelpTextClick(true);
  };

  onHelpIconClose = () => {
    if (this.props.onHelpTextClick && this.props.helpTextOpen)
      this.props.onHelpTextClick(false);
  };

  render() {
    let helpText = null;
    if (this.props.helpTextNb && this.props.helpTextNn)
      helpText = (
        <div className={`${styles.radio_helptext}`}>
          <span
            onClick={() => this.onHelpIconClick()}
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
                <Translate nb={this.props.textNb} nn={this.props.textNn} />
                <span
                  className={`${styles.radio_helptext_container_icon}`}
                  onClick={() => this.onHelpIconClose()}
                />
              </b>
              <br />{" "}
              <Translate
                nb={this.props.helpTextNb}
                nn={this.props.helpTextNn}
              />
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
          {<Translate nb={this.props.textNb} nn={this.props.textNn} />}
        </label>
        {helpText}
      </li>
    );
  }
}

export default RadioButton;
