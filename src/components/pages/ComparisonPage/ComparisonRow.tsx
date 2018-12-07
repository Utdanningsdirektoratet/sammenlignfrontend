import React from "react";

import styles from "./ComparisonRow.module.scss";
import Translate from "../../app/Translate";
import {
  NUM_COMPARES_MOBILE,
  NUM_COMPARES_DESKTOP,
} from "../../../data/config";
import {
  num_compare_sizing,
  ScreenSizeProps,
} from "../../utils/NumCompareSizing";

type Props = {
  children: JSX.Element[];
  emptyCellsText?: JSX.Element;
  hideEmptyCells?: boolean;
};

function ComparisonRow({
  children,
  innerWidth,
  hideEmptyCells,
}: Props & ScreenSizeProps) {
  const rowLength = children.length;
  const emptyCellsText = (
    <Translate nb="Du kan søke for å legge til flere kolonner" />
  );

  const emptyCellsLength =
    innerWidth < 768
      ? NUM_COMPARES_MOBILE - rowLength
      : NUM_COMPARES_DESKTOP - rowLength;

  let emptyCells = [];
  if (!hideEmptyCells) {
    for (var i = 0; i < emptyCellsLength; i++) {
      emptyCells.push(
        <div className={`${styles.empty_cells_placeholder}`} key={i}>
          <div>{emptyCellsText}</div>
        </div>
      );
    }
  }

  let shownChildren = [];
  const numberOfRows =
    innerWidth < 768 ? NUM_COMPARES_MOBILE : NUM_COMPARES_DESKTOP;
  if (rowLength <= numberOfRows) {
    shownChildren = children;
  } else {
    for (var i = 0; i < numberOfRows; i++) {
      shownChildren.push(children[i]);
    }
  }
  return (
    <div className={`${styles.row_style}`}>
      {shownChildren}
      {emptyCells}
    </div>
  );
}

export default num_compare_sizing<Props>(ComparisonRow);
