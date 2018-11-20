import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./SelectedCompare.module.scss";
import { Innholdstype } from "../../../data/ApiTypes";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import CloseIcon from "../../visualizations/Generic/CloseIcon";
import UnoId from "../../app/UnoId";
import { Grid, Row, Col } from "react-bootstrap";

type Props = {
  innholdstype: Innholdstype;
};

type CellCalcs = {
  xs: number;
  xsOffset: number;
  sm: number;
  smOffset: number;
  md: number;
  mdOffset: number;
  lg: number;
  lgOffset: number;
};

class SelectedCompares extends Component<AppStateProps & Props> {
  handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
    const {
      appState: { toggleUnoId },
    } = this.props;
    const key = e.currentTarget.getAttribute("data-uno_id");
    if (key) toggleUnoId(key);
  };

  render() {
    const {
      appState: { selected_uno_id },
      innholdstype,
    } = this.props;
    const filtered_uno_id = selected_uno_id.filter(
      uno_id => uno_id[0].toLowerCase() === innholdstype[0].toLowerCase()
    );

    if (filtered_uno_id.length === 0) {
      return null;
    }
    return (
      <>
        <div className={`${styles.selection}`}>
          <ul className={`${styles.selection_row}`}>
            <Row>
              {filtered_uno_id.map((uno_id: string, i: number) => (
                <Col
                  xs={filtered_uno_id.length === 3 ? 4 : 6}
                  xsOffset={
                    i === 0 ? (filtered_uno_id.length === 1 ? 3 : 0) : 0
                  }
                  sm={filtered_uno_id.length < 4 ? 4 : 3}
                  smOffset={
                    i === 0
                      ? filtered_uno_id.length === 1
                        ? 4
                        : filtered_uno_id.length === 2
                        ? 2
                        : 0
                      : 0
                  }
                  md={filtered_uno_id.length < 4 ? 4 : 3}
                  mdOffset={
                    i === 0
                      ? filtered_uno_id.length === 1
                        ? 4
                        : filtered_uno_id.length === 2
                        ? 2
                        : 0
                      : 0
                  }
                  lg={2}
                  lgOffset={
                    i === 0
                      ? filtered_uno_id.length === 1
                        ? 5
                        : filtered_uno_id.length === 2
                        ? 4
                        : filtered_uno_id.length === 3
                        ? 3
                        : filtered_uno_id.length === 4
                        ? 2
                        : filtered_uno_id.length === 5
                        ? 1
                        : 0
                      : 0
                  }
                >
                  <li key={uno_id} className={`${styles.selection_row_item}`}>
                    <div className={`${styles.selection_row_item_text}`}>
                      <UnoId uno_id={uno_id} />
                    </div>
                    <CloseIcon
                      unoId={uno_id}
                      onClick={this.handleRemoveClick}
                    />
                  </li>
                </Col>
              ))}
            </Row>
          </ul>
        </div>
      </>
    );
  }
}

export default with_app_state<Props>(SelectedCompares);
