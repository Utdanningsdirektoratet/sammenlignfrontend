import React, { Component } from "react";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { MainElement } from "../../../data/ApiTypes";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import Translate from "../../app/Translate";
import styles from "./LenkeVisualizationWrapper.module.scss";
import { ReactComponent as GreaterThan } from "../../../fontawesome/solid/greater-than.svg";

class LenkeVisualizationWrapper extends Component<
  ComparisonComponentProps<MainElement>
> {
  render() {
    const { data, uno_ids } = this.props;
    return (
      <ComparisonRow hideEmptyCells>
        {uno_ids.map(uno_id => {
          let unoIdData = data[uno_id];
          if (!unoIdData || !unoIdData.url) return <div key={uno_id} />;
          return (
            <div className={`${styles.container}`} key={uno_id}>
              <h1 className={`${styles.container_title}`}>
                {unoIdData.innholdstype === "yrke" ? (
                  <Translate
                    nb="Vil du vite mer om yrket %yrke%?"
                    replacements={{ "%yrke%": unoIdData.tittel.toLowerCase() }}
                  />
                ) : (
                  <Translate
                    nb="Vil du vite mer om utdannelse til %utdannelse%?"
                    replacements={{
                      "%utdannelse%": unoIdData.tittel.toLowerCase(),
                    }}
                  />
                )}
              </h1>
              <a
                className={`${styles.container_link}`}
                href={unoIdData.url}
                target="_blank"
              >
                <Translate nb="Les mer" />
                <GreaterThan className={`${styles.container_link_icon}`} />
              </a>
            </div>
          );
        })}
      </ComparisonRow>
    );
  }
}

export default LenkeVisualizationWrapper;
