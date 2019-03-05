import React, { Component } from "react";

import styles from "./SelectedCompare.module.scss";
import { NUM_COMPARES_MOBILE } from "../../../config";
import { with_app_state, AppStateProps } from "../../app/AppContext";
import { Innholdstype } from "../../../data/ApiTypes";
import { MIN_DESKTOP_PX } from "../../../util/Constants";

type Props = {
  innholdstype: Innholdstype;
  data: any;
  nivåer: any;
};

class UnoIdNivaLine extends Component<AppStateProps & Props> {
  render() {
    const {
      appState: { selected_uno_id },
      innholdstype,
      data,
      nivåer,
    } = this.props;

    const filtered_uno_id = selected_uno_id.filter(
      uno_id => uno_id[0].toLowerCase() === innholdstype[0].toLowerCase()
    );

    if (filtered_uno_id.length === 0 && innerWidth > MIN_DESKTOP_PX) {
      return null;
    }

    var nivå = (
      <div className={`${styles.nivåSelection}`}>
        {filtered_uno_id.map((d: any, index: number) => (
          <div className={`${styles.nivåSelection_cell}`} key={index}>
            {data
              ? data[filtered_uno_id[index]].utdanningstype.map((u: any) => (
                  <div>{u}</div>
                ))
              : nivåer &&
                (nivåer as any[]).find(x => x.uno_id === filtered_uno_id[index])
              ? (nivåer as any[])
                  .find(x => x.uno_id === filtered_uno_id[index])
                  .utdanningstype.map((u: any) => <div>{u}</div>)
              : ""}
          </div>
        ))}
      </div>
    );

    if (innerWidth < MIN_DESKTOP_PX) {
      var nivåBoxes = [];
      for (var i = 0; i < NUM_COMPARES_MOBILE; i++) {
        nivåBoxes.push(
          <div className={`${styles.nivåSelection_cell}`} key={i}>
            {data
              ? data[filtered_uno_id[i]].utdanningstype.map((u: any) => (
                  <div>{u}</div>
                ))
              : nivåer &&
                (nivåer as any[]).find(x => x.uno_id === filtered_uno_id[i])
              ? (nivåer as any[])
                  .find(x => x.uno_id === filtered_uno_id[i])
                  .utdanningstype.map((u: any) => <div>{u}</div>)
              : ""}
          </div>
        );
      }
      nivå = <div className={`${styles.nivåSelection}`}>{nivåBoxes}</div>;
    }

    return nivå;
  }
}

export default with_app_state<Props>(UnoIdNivaLine);
