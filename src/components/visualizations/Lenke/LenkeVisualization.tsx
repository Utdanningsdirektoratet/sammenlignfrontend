import React, { Component } from "react";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { MainElement } from "../../../data/ApiTypes";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import Translate from "../../app/Translate";
import styles from "./LenkeVisualization.module.scss";
import { ReactComponent as Greaterthan } from "../../../fontawesome/solid/greater-than.svg";

class LenkeVisualization extends Component<
  ComparisonComponentProps<MainElement>
> {
  render() {
    const { data, uno_ids } = this.props;
    return (
      <ComparisonRow hideEmptyCells>
        {uno_ids.map(uno_id => {
          let unoIdData = data[uno_id];
          if (!unoIdData || !unoIdData.url) return <div />;
          return (
            <div className={`${styles.container}`}>
              <h1 className={`${styles.container_title}`}>
                <Translate nb="Vil du vite mer om" />{" "}
                {unoIdData.innholdstype === "yrke" ? (
                  <Translate nb="yrket" />
                ) : (
                  <Translate nb="utdannelse til" />
                )}
                {" " + unoIdData.tittel.toLowerCase() + "?"}
              </h1>
              <a
                className={`${styles.container_link}`}
                href={unoIdData.url}
                target="_blank"
              >
                <Translate nb="Les mer" />
                <Greaterthan className={`${styles.container_link_icon}`} />
              </a>
            </div>
          );
        })}
      </ComparisonRow>
    );
  }
}

export default LenkeVisualization;
