import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";

type Props = {
  children: JSX.Element[];
  emptyCellsText?: JSX.Element;
};

function ComparisonRow({ children }: Props) {
  const rowLength = children.length;
  const emptyCellsText = "Legg til yrke for å sammenligne tallene";
  return (
    <div className={`${styles.row_style}`}>
      {children}

      <div className={`${styles.empty_cells_placeholder}`}>
        <div>{emptyCellsText}</div>
      </div>
      <div className={`${styles.empty_cells_placeholder}`}>
        <div>{emptyCellsText}</div>
      </div>
      <div className={`${styles.empty_cells_placeholder}`}>
        <div>{emptyCellsText}</div>
      </div>
      <div className={`${styles.empty_cells_placeholder}`}>
        <div>{emptyCellsText}</div>
      </div>
    </div>
  );
}

export default ComparisonRow;
