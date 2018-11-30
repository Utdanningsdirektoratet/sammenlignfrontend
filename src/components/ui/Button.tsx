import React, { Component } from "react";

import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

export type ButtonTypes = "light" | "dark";

type Props = {
  to: string;
  type: ButtonTypes;
  children: any;
  selected?: boolean;
};

export default function({ to, type, children, selected }: Props) {
  let className = `${styles.button}`;
  if (type == "dark") className += ` ${styles.button_dark}`;
  if (type == "light") className += ` ${styles.button_light}`;
  if (selected) className += ` ${styles.button_selected}`;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
