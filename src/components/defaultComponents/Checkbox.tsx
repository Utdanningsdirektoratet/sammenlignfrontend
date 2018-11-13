import React, { Component, ChangeEventHandler } from "react";
import Translate from "../app/Translate";
import styles from "./DefaultComponents.module.scss";

type Props = {
  textNb: string;
  textNn: string;
  isSelected: boolean;
  valueKey: string;
  helpTextNb?: string;
  helpTextNn?: string;
  onHelpTextClick?: (open: boolean) => void;
  helpTextOpen?: boolean;
  onChange: (event: ChangeEventHandler<HTMLInputElement>) => void;
};

class Checkbox extends Component<Props> {
  onChange = (event: any) => {
    this.props.onChange(event);
  };

  onHelpIconClick = (open: boolean) => {
    if (this.props.onHelpTextClick) this.props.onHelpTextClick(open);
  };

  render() {
    let helpText = null;
    if (this.props.helpTextNb && this.props.helpTextNn)
      helpText = (
        <div className={`${styles.checkbox_helptext}`}>
          <span
            onClick={() => this.onHelpIconClick(true)}
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
                  onClick={() => this.onHelpIconClick(false)}
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
