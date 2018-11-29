import React, { Component, Fragment } from "react";
import { LonnElement, Sektor } from "../../../data/ApiTypes";
import VisualizationHeaderLonn, {
  VisualizationHeaderConfigLonn,
} from "./VisualizationHeaderLonn";
import NoData from "../Old/NoData";
import LonnVisualization from "./LonnVisualization";
import LonnSpecificChoice from "./LonnSpecificChoice";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import LonnHeaderFilterDesktop from "./LonnHeaderFilterDesktop";

class LonnWrapper extends Component<
  ComparisonComponentProps<LonnElement>,
  VisualizationHeaderConfigLonn
> {
  constructor(props: ComparisonComponentProps<LonnElement>) {
    super(props);
    this.state = {
      Arbeidstid: "A",
      Sektor: "A",
      Tidsenhet: "Månedlig",
      Lønn: "Brutto",
      StatistiskMål: "Median og kvartiler",
      Kjønn: "KM",
      ssbSektor: {},
    };
  }

  //TODO: This must be set when embedding widget!!
  //Not true when embedding multiple widgets for different UNO_IDs, and true if embedding one with multiple UNO_IDs.
  showGraphics = true;

  onSelectedChoiceClick = (uno_id: string, ssbSektor: string) => {
    this.setState(prevState => {
      return { ssbSektor: { ...prevState.ssbSektor, [uno_id]: ssbSektor } };
    });
  };
  setConfig = (config: VisualizationHeaderConfigLonn) => {
    this.setState(config);
  };

  getTimeUnit = (wageCalc: number) => {
    switch (this.state.Tidsenhet) {
      case "Årlig":
        wageCalc *= 12;
        break;
      case "Månedlig":
        break;
      case "Ca. timelønn":
        wageCalc = wageCalc / 30 / 7.5;
    }
    return wageCalc;
  };

  getMaxValue = (kjønn: string, data: any) => {
    let wage = kjønn + "_wage";

    switch (this.state.Lønn) {
      case "Brutto":
        break;
      case "Med overtid":
        wage += "_overtime";
        break;
    }

    switch (this.state.StatistiskMål) {
      case "Median":
        wage += "_median";
        break;
      case "Gjennomsnitt":
        wage += "_avg";
        break;
      case "Median og kvartiler":
        wage += "_q3";
        break;
    }

    if (!data[this.state.Arbeidstid]) return 0;
    if (!data[this.state.Arbeidstid][wage]) return 0;
    let wageCalc = data[this.state.Arbeidstid][wage] as number;
    wageCalc = this.getTimeUnit(wageCalc);

    if (this.state.Lønn === "Med overtid") {
      let brutto = wage.replace("_overtime", "");
      let bruttoCalc = 0;
      if (data[this.state.Arbeidstid][brutto])
        bruttoCalc = data[this.state.Arbeidstid][brutto] as number;
      bruttoCalc = this.getTimeUnit(bruttoCalc);

      wageCalc += bruttoCalc;
    }

    return Math.round(wageCalc);
  };

  onFilterClicked = (event: any, key: string) => {
    let config = { ...this.state };
    var value = event.target.id;
    switch (key) {
      case "Arbeidstid":
        config.Arbeidstid = value;
        break;
      case "Sektor":
        config.Sektor = value;
        break;
      case "Tidsenhet":
        config.Tidsenhet = value;
        break;
      case "Lønn":
        config.Lønn = value;
        break;
      case "StatistiskMål":
        config.StatistiskMål = value;
        break;
      case "Kjønn":
        config.Kjønn = value;
        break;
      default:
        return;
    }
    this.setState(config);
  };

  getSsbSektor = (uno_id: string) => {
    const { data } = this.props;
    return this.state.ssbSektor[uno_id] || Object.keys(data[uno_id] || {})[0];
  };

  render() {
    const { data, uno_ids } = this.props;
    const { Sektor } = this.state;

    let maxValue: number = 0;

    this.props.uno_ids.forEach(uno_id => {
      const ssbSektor = this.getSsbSektor(uno_id);
      if (
        !ssbSektor ||
        !data[uno_id] ||
        !data[uno_id][ssbSektor] ||
        !data[uno_id][ssbSektor][Sektor]
      ) {
        return;
      }
      let unoData = data[uno_id][ssbSektor][Sektor];

      if (this.state.Kjønn === "A") {
        var wage = this.getMaxValue("A", unoData);
        if (maxValue < wage) maxValue = wage;
      } else {
        var wageM = this.getMaxValue("M", unoData);
        if (maxValue < wageM) maxValue = wageM;
        var wageK = this.getMaxValue("K", unoData);
        if (maxValue < wageK) maxValue = wageK;
      }
    });

    return (
      <div>
        <VisualizationHeaderLonn
          config={this.state}
          setConfig={this.setConfig}
          onFilterClicked={this.onFilterClicked}
        />
        <Fragment key={Sektor}>
          <ComparisonRow>
            {uno_ids.map(uno_id => {
              const ssbSektor = this.getSsbSektor(uno_id);

              if (data[uno_id] && data[uno_id][ssbSektor]) {
                const arbeidstid_data = data[uno_id][ssbSektor][Sektor]; // Typescript needs a temporary
                if (arbeidstid_data) {
                  return (
                    <LonnVisualization
                      key={uno_id}
                      data={arbeidstid_data}
                      arbeidstid={this.state.Arbeidstid}
                      kjønn={this.state.Kjønn}
                      lønn={this.state.Lønn}
                      statistiskMål={this.state.StatistiskMål}
                      tidsenhet={this.state.Tidsenhet}
                      maxValue={maxValue}
                      showGraphics={this.showGraphics}
                    />
                  );
                }
              }
              return <NoData key={uno_id} />;
            })}
          </ComparisonRow>
        </Fragment>
        <ComparisonRow>
          {uno_ids.map(uno_id => {
            return (
              <LonnSpecificChoice
                key={uno_id}
                data={data[uno_id]}
                onChange={this.onSelectedChoiceClick}
                unoId={uno_id}
                selectedChoice={this.getSsbSektor(uno_id)}
              />
            );
          })}
        </ComparisonRow>
        <LonnHeaderFilterDesktop
          config={this.state}
          onFilterClicked={this.onFilterClicked}
        />
      </div>
    );
  }
}

export default LonnWrapper;
