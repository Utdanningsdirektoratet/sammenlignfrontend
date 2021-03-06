import React, { Component } from "react";

import {
  Fullført,
  Visning,
  Ledighetsintervall,
} from "./ArbeidsledighetWrapper";
import { ArbeidsledighetObject } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import PercentageBar from "../Generic/PercentageBar";
import VerticalPercentageBar, {
  VerticalPercentageBarValue,
} from "../Generic/VerticalPercentageBar";
import styles from "./ArbeidsledighetVisualization.module.scss";
import Translate from "../../app/Translate";
import { ReactComponent as Alle } from "../Generic/AlleIcon.svg";
import { ReactComponent as Nyutdannet } from "../Generic/NyutdannaIcon.svg";
import { ReactComponent as GreaterThan } from "../../../fontawesome/solid/greater-than.svg";
import { ReactComponent as ToolTip } from "../../../fontawesome/solid/question-circle.svg";
import { thresholdSturges } from "d3";
import Tooltip from "../../defaultComponents/Tooltip";

type Props = {
  data: ArbeidsledighetObject;
  fullført: Fullført[];
  visning: Visning;
  ledighetsintervaller: Ledighetsintervall[];
  maxValue: number;
};


type State = { showMore: boolean };

export interface IDictionary {
  [index: string]: any;
}

class ArbeidsledighetVisualization extends Component<Props, State> {
  state: State = { showMore: false };
  getDataQuery = (fullført: Fullført) => {
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
      num = num * 100;

      num = num.toFixed(2);
    }

    return num;
  };

  handleClick = (e: any) => {
    this.setState({ showMore: !this.state.showMore });
  }

  renderNumbersFrom = () => {
    if (!this.props.data.nus_kortnavn) {
      return null;
    }

    let nusNavn = this.props.data.nus_kortnavn.replace(new RegExp(" ;", "g"), "");
    let nusArr = nusNavn.split(',');

    const nusFrom = nusArr.map((nus, index) => {
      return <li key={index}>{nus}</li>
    })
    return nusFrom;
  }

  renderOption = (x: string, dataArr: any, intervaller: any) => {
    let riskClass = "";
    switch (intervaller[x].props.nb) {    // need to chane .nb to a variable which knows what language we should use. Currently it only works with nb.
      case "Lav":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_low}`;
        break;
      case "Middels":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_medium}`;
        break;
      case "Høy":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_high}`;
        break;
      case "Svært høy":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_vHigh}`;
        break;
      case "Svært lav":
        riskClass = `${styles.arbeidsledighetvisualization_percentageText_vLow}`;
        break;
      case "Ingen tall":
        riskClass = "";
        break;
      default:
        break;
    }
    let level = intervaller[x];
    let dataToShow = dataArr[x];
    let customEl = <p className={`${styles.arbeidsledighetvisualization_percentageRisk} ${riskClass}`}>{level}</p>;
    if (x === "13" && dataArr[x] == null) {   // Ingen data på 1-3 år etter utdannelse. Sjekk om det er 0% eller null.
      if (this.props.data.arbeidstakere_antall13 && this.props.data.arbeidstakere_antall13 < 99 && this.props.data.arbeidsledige_andel13 == 0) {
        dataToShow = "0";
        level = "Ingen ledighet";
        customEl = <p className={`${styles.arbeidsledighetvisualization_percentageRisk} ${riskClass}`}>{level}</p>;
        return (
          <div className={`${styles.arbeidsledighetvisualization_list_text}`}>
            <h3 className={`${styles.arbeidsledighetvisualization_heading}`}>
              <Translate nb="Nyutdanna: "></Translate>
            </h3>
            <p className={`${styles.arbeidsledighetvisualization_percentageText} ${riskClass}`}>{dataToShow}</p>
            <div className={styles.arbeidsledighetvisualization_dec}>
              {customEl}
              <div className={styles.arbeidsledighetvisualization_dec_tooltipContainer}>
                <ToolTip className={styles.arbeidsledighetvisualization_dec_tooltipContainer_tooltip}></ToolTip>
              </div>
              <div className={styles.arbeidsledighetvisualization_dec_tip}>
                <p><Translate nb="Færre enn 3 registrerte ledige."></Translate></p>
              </div>
            </div>

          </div>
        )
      } else if (this.props.data.arbeidstakere_antall13 && this.props.data.arbeidstakere_antall13 < 100) {
        return null;
      }
    }
    return (
      <div className={`${styles.arbeidsledighetvisualization_list_text}`}>
        <h3 className={`${styles.arbeidsledighetvisualization_heading}`}>
          {x === "A" ? <Translate nb="Alle totalt: "></Translate> : <Translate nb="Nyutdanna: "></Translate>}
        </h3>
        <p className={`${styles.arbeidsledighetvisualization_percentageText} ${riskClass}`}>{dataArr[x]}</p>
        <p className={`${styles.arbeidsledighetvisualization_percentageRisk} ${riskClass}`}>{intervaller[x]}</p>
      </div>
    )
  }

  render() {
    const { fullført, visning, ledighetsintervaller, maxValue } = this.props;
    var dataArr = {} as IDictionary;
    var emptyResults = 0;
    fullført.map(f => {
      console.log("data: f", f);
      dataArr[f] = this.getDataQuery(f);
      if (dataArr[f] == null) emptyResults++;
    });
    console.log("data: props", this.props.data);
    if (emptyResults == fullført.length) return <NoData />;

    var intervaller = {} as IDictionary;
    for (var i = 0; i < fullført.length; i++) {
      var foundIntervals = 0;
      ledighetsintervaller.forEach(element => {
        if (foundIntervals == fullført.length) return;
        if (
          dataArr[fullført[i]] >= element.verdi.fra &&
          dataArr[fullført[i]] < element.verdi.til
        ) {
          intervaller[fullført[i]] = element.text;
        }
      });
    }
    let full = fullført.slice(0);
    full = full.reverse();
    let iconClass = this.state.showMore ? styles.arbeidsledighetvisualization_showingDataFor_toggler_icon : styles.arbeidsledighetvisualization_showingDataFor_toggler_iconClosed;
    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.arbeidsledighetvisualization}`}>
          {/* <VerticalPercentageBar
            values={{
              left: { value: dataArr["A"], text: <Translate nb="A" /> },
              right: {
                value: dataArr["13"],
                text: <Translate nb="N" />,
              },
            }}
            max={maxValue}
          /> */}
          <div>
            {full.map(x => {
              console.log("data: x", x);
              // if (dataArr[x] == null) return null;
              return (
                <li
                  key={x}
                  className={`${styles.arbeidsledighetvisualization_list}`}
                >
                  {/* {x == "A" ? <Alle /> : <Nyutdannet />} */}
                  {/* <span
                    className={`${
                      styles.arbeidsledighetvisualization_list_text
                      }`}
                  >
                    {x == "A" &&
                      <Translate nb="Alle: " />
                      && dataArr["A"]
                    }
                    {x != "A" &&
                      <Translate nb="Nyutdanna: " />
                      && dataArr["13"]
                    } */}
                  {this.renderOption(x, dataArr, intervaller)}
                  {/* {x == "A" ? (
                      <Translate nb="Alle: " />

                    ) : (
                        <Translate nb="Nyutdanna: " />
                      )} */}
                  {/* {dataArr["13"]} */}
                  {/* </span> */}
                </li>
              );
            })}
            <div className={`${styles.arbeidsledighetvisualization_showingDataFor}`}>
              <p onClick={this.handleClick}>Viser tall for <GreaterThan className={iconClass} /></p>
              {this.state.showMore &&
                <React.Fragment>
                  <p><Translate nb="Andel av personer med disse utdanningene som var registrert arbeidsledig av NAV i november 2018:"></Translate></p>
                  <ul>
                    {this.renderNumbersFrom()}
                  </ul>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArbeidsledighetVisualization;
