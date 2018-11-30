import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";
import Translate from "../../app/Translate";

type Props = {
  children: JSX.Element[];
  emptyCellsText?: JSX.Element;
};

function ComparisonRow({ children }: Props) {
  const rowLength = children.length;
  const emptyCellsText = (
    <Translate nb="Du kan søke for å legge til flere kolonner" />
  );
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
