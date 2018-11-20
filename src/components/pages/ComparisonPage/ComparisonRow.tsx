import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";

type Props = {
  children: JSX.Element[];
};

function ComparisonRow({ children }: Props) {
  const rowLength = children.length;
  return <div className={`${styles.row_style}`}>{children}</div>;
}

export default ComparisonRow;
