import React, { Component, ChangeEventHandler } from "react";
import Translate from "../app/Translate";
import styles from "./DefaultComponents.module.scss";

type Props = {
  textNb: string;
  textNn: string;
  isSelected: boolean;
  valueKey: string;
  helpText?: string;
  onHelpTextClick?: (open: boolean) => void;
  helpTextOpen?: boolean;
  onChange: (event: ChangeEventHandler<HTMLInputElement>) => void;
};

class Checkbox extends Component<Props> {
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
    if (this.props.helpText)
      helpText = (
        <div className={`${styles.checkbox_helptext}`}>
          <span
            onClick={() => this.onHelpIconClick()}
            className={`${styles.checkbox_helptext_icon}`}
          >
            (?)
          </span>
          <div
            className={
              this.props.helpTextOpen
                ? `${styles.checkbox_helptext_container}`
                : `${styles.checkbox_helptext_container}` +
                  " " +
                  `${styles.checkbox_helptext_container__hidden}`
            }
          >
            <p>
              <b>
                <Translate nb={this.props.textNb} nn={this.props.textNn} />
                <span
                  className={`${styles.checkbox_helptext_container_icon}`}
                  onClick={() => this.onHelpIconClose()}
                />
              </b>
              <br /> {this.props.helpText}
            </p>
          </div>
        </div>
      );
    return (
      <li>
        <label>
          <input
            type="checkbox"
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

export default Checkbox;
