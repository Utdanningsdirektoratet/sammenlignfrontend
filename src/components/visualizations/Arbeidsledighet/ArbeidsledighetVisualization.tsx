import React from "react";

import {
  Fullført,
  Visning,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
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
  kjønn: Kjønn;
  fullført: Fullført[];
  visning: Visning;
};

class ArbeidsledighetVisualization extends React.Component<Props> {
  getDataQuery = (fullført: Fullført, kjønn: string) => {
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
      num = num.toFixed(2);
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
      let data = null;
      if (kjønn === "A") data = this.getDataQuery(f, "A");
      dom.push({ key: f, value: key, data: data });
    });

    if (dom.every(d => d.data === null && kjønn === "A")) return <NoData />;

    if (kjønn === "A") {
      return (
        <div className={visualizationstyles.visualization_container}>
          {dom.map(d => {
            return (
              <div key={d.key}>
                {fullført.length > 1 ? (
                  <div className={styles.arbeidsledighetvisualization_text}>
                    {d.value}
                  </div>
                ) : (
                  ""
                )}
                {visning === "Andel" ? (
                  <div>
                    <PercentageBar value={d.data} />
                  </div>
                ) : (
                  <div className={styles.arbeidsledighetvisualization_kjonn}>
                    <div
                      className={
                        styles.arbeidsledighetvisualization_kjonn_container
                      }
                    >
                      <div
                        className={
                          styles.arbeidsledighetvisualization_kjonn_container_text
                        }
                      >
                        {d.data === null ? (
                          <Translate nb="Ingen data" nn="nynorsk" />
                        ) : (
                          d.data
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      let arr: any[] = [];
      fullført.forEach(f => {
        arr.push(this.getDataQuery(f, "K"));
        arr.push(this.getDataQuery(f, "M"));
      });

      if (arr.every(a => a === null)) return <NoData />;
      return (
        <div className={visualizationstyles.visualization_container}>
          {dom.map(d => {
            let kvinner = this.getDataQuery(d.key, "K");
            let menn = this.getDataQuery(d.key, "M");
            const array = [
              { key: "K", data: kvinner },
              { key: "M", data: menn },
            ];
            return (
              <div key={d.key}>
                {fullført.length > 1 ? (
                  <div className={styles.arbeidsledighetvisualization_text}>
                    {d.value}
                  </div>
                ) : (
                  ""
                )}

                <div>
                  {array.map(a => {
                    return visning === "Andel" ? (
                      <div key={a.key}>
                        <div
                          className={
                            styles.arbeidsledighetvisualization_kjonn_icon +
                            " " +
                            styles.arbeidsledighetvisualization_kjonn_icon_percentage
                          }
                        >
                          {a.key === "K" ? <Female /> : <Male />}
                        </div>
                        {a.data === null ? (
                          <div
                            className={
                              styles.arbeidsledighetvisualization_kjonn_container_text
                            }
                          >
                            <Translate nb="Ingen data" nn="nynorsk" />
                          </div>
                        ) : (
                          <PercentageBar value={a.data as number} />
                        )}
                      </div>
                    ) : (
                      <div
                        className={styles.arbeidsledighetvisualization_kjonn}
                      >
                        <div
                          className={
                            styles.arbeidsledighetvisualization_kjonn_icon
                          }
                        >
                          {a.key === "K" ? <Female /> : <Male />}
                        </div>
                        <div
                          className={
                            styles.arbeidsledighetvisualization_kjonn_container
                          }
                        >
                          {a.data === null ? (
                            <div
                              className={
                                styles.arbeidsledighetvisualization_kjonn_container_text
                              }
                            >
                              <Translate nb="Ingen data" nn="nynorsk" />
                            </div>
                          ) : (
                            <div
                              className={
                                styles.arbeidsledighetvisualization_kjonn_container_text
                              }
                            >
                              {a.data}
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
}

export default ArbeidsledighetVisualization;
