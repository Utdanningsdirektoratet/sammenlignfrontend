import React, { Component } from "react";

import styles from "./ComparisonRow.module.scss";
import Translate from "../../app/Translate";
import {
  NUM_COMPARES_MOBILE,
  NUM_COMPARES_DESKTOP,
} from "../../../data/config";

type Props = {
  children: JSX.Element[];
  emptyCellsText?: JSX.Element;
};

function ComparisonRow({ children }: Props) {
  const rowLength = children.length;
  const emptyCellsText = (
    <Translate nb="Du kan søke for å legge til flere kolonner" />
  );

  const emptyCellsLength =
    window.innerWidth < 768
      ? NUM_COMPARES_MOBILE - rowLength
      : NUM_COMPARES_DESKTOP - rowLength;

  let emptyCells = [];
  for (var i = 0; i < emptyCellsLength; i++) {
    emptyCells.push(
      <div className={`${styles.empty_cells_placeholder}`} key={i}>
        <div>{emptyCellsText}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.row_style}`}>
      {children}
      {emptyCells}
    </div>
  );
}

export default ComparisonRow;
