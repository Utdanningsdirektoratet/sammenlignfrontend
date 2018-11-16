import React from "react";

import {
  Fullført,
  Visning,
} from "../../pages/ComparisonPage/Headers/VisualizationHeaderArbeidsledighet";
import { ArbeidsledighetObject, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";
import PercentageBar from "../Generic/PercentageBar";
import styles from "./ArbeidsledighetVisualization.module.scss";
import Translate from "../../app/Translate";

type Props = {
  data: ArbeidsledighetObject;
  kjønn: Kjønn[];
  fullført: Fullført[];
  visning: Visning;
};

class ArbeidsledighetVisualization extends React.Component<Props> {
  getDataQuery = (fullført: Fullført, kjønn: Kjønn) => {
    let qry = "arbeidsledige";

    switch (this.props.visning) {
      case "Andel":
        qry += "_andel";
        break;
      case "Antall":
        qry += "_antall";
        break;
      default:
        break;
    }
    switch (kjønn) {
      case "K":
        qry += "_kvinner";
        break;
      case "M":
        qry += "_menn";
        break;
      default:
        break;
    }

    switch (fullført) {
      case "710":
        qry += fullført;
        break;
      case "13":
        qry += fullført;
        break;
      case "A":
        break;
    }

    let num = (this.props.data as any)[qry];
    if (!num) return null;

    if (this.props.visning === "Andel") {
      num = (num * 100).toFixed(2);
    }

    return num;
  };

  render() {
    const { kjønn, fullført, visning } = this.props;
    let dom: any[] = [];
    fullført.sort().map(f => {
      let key = null;

      switch (f) {
        case "710":
          key = <Translate nb="7-10 år etter endt utdanning" nn="nynorsk" />;
          break;
        case "13":
          key = <Translate nb="1-3 år etter endt utdanning" nn="nynorsk" />;
          break;
        case "A":
          key = <Translate nb="Alle" nn="nynorsk" />;
          break;
      }

      let array: any[] = [];
      kjønn.map(k => {
        let num = this.getDataQuery(f, k);
        let key = null;
        switch (k) {
          case "K":
            key = <Female />;
            break;
          case "M":
            key = <Male />;
            break;
          case "A":
            key = (
              <div
                className={
                  styles.arbeidsledighetvisualization_kjonn_icon_container
                }
              >
                <Female />
                <Male />
              </div>
            );
            break;
        }

        array.push({ key: key, value: num });
      });
      dom.push({ key: key, value: array });
    });
    if (
      dom.every(d => {
        return d.value.every((a: any) => {
          return a.value === null;
        });
      })
    )
      return <NoData />;

    return (
      <div className={visualizationstyles.visualization_container}>
        {dom.map(d => {
          return (
            <div>
              {fullført.length > 1 ? (
                <div className={styles.arbeidsledighetvisualization_text}>
                  {d.key}
                </div>
              ) : (
                ""
              )}
              <div>
                {d.value.map((a: any) => {
                  return visning === "Andel" && a.value !== null ? (
                    <div>
                      <div
                        className={
                          styles.arbeidsledighetvisualization_kjonn_icon +
                          " " +
                          styles.arbeidsledighetvisualization_kjonn_icon_percentage
                        }
                      >
                        {kjønn.length > 1 ? a.key : ""}
                      </div>

                      <PercentageBar value={a.value} />
                    </div>
                  ) : (
                    <div className={styles.arbeidsledighetvisualization_kjonn}>
                      {kjønn.length > 1 ? (
                        <div
                          className={
                            styles.arbeidsledighetvisualization_kjonn_icon
                          }
                        >
                          {a.key}
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className={
                          styles.arbeidsledighetvisualization_kjonn_container
                        }
                      >
                        {a.value === null ? (
                          <div
                            style={
                              kjønn.length > 1 ? { marginBottom: `10px` } : {}
                            }
                            className={
                              styles.arbeidsledighetvisualization_kjonn_container_text
                            }
                          >
                            <Translate nb="Ingen data" nn="nynorsk" />
                          </div>
                        ) : visning === "Andel" ? (
                          <PercentageBar value={a.value} />
                        ) : (
                          <div
                            style={
                              kjønn.length > 1 ? { marginBottom: `10px` } : {}
                            }
                            className={
                              styles.arbeidsledighetvisualization_kjonn_container_text
                            }
                          >
                            {a.value}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArbeidsledighetVisualization;
