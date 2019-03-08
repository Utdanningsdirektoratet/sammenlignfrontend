import React, { Component, Fragment, RefObject } from "react";
import { LonnElement } from "../../../data/ApiTypes";
import VisualizationHeaderLonn, {
  VisualizationHeaderConfigLonn,
  Tidsenhet,
  Lønn,
  StatistiskMål,
} from "./VisualizationHeaderLonn";
import NoData from "../Old/NoData";
import LonnVisualization from "./LonnVisualization";
import LonnSpecificChoice from "./LonnSpecificChoice";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import LonnHeaderFilterDesktop from "./LonnHeaderFilterDesktop";
import HeaderLonnFilters from "./HeaderLonnFilters";
import styles from "./LonnWrapper.module.scss";

export function getTimeUnit(wageCalc: number, tidsenhet: Tidsenhet) {
  switch (tidsenhet) {
    case "Årlig":
      wageCalc *= 12;
      break;
    case "Månedlig":
      break;
    case "Ca. timelønn":
      wageCalc = wageCalc / 162.5;
  }
  return wageCalc;
}

export function getMaxValue(
  kjønn: string,
  data: any,
  lønn: Lønn,
  statistiskMål: StatistiskMål,
  dataSelector: any,
  tidsenhet: Tidsenhet
) {
  let wage = kjønn + "_wage";

  switch (lønn) {
    case "Brutto":
      break;
    case "Med overtid":
      wage += "_overtime";
      break;
  }

  switch (statistiskMål) {
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

  if (!data[dataSelector]) return 0;
  if (!data[dataSelector][wage] && lønn !== "Med overtid") return 0;
  let wageCalc = (data[dataSelector][wage] as number) || 0;
  wageCalc = getTimeUnit(wageCalc, tidsenhet);

  if (lønn === "Med overtid") {
    let brutto = wage.replace("_overtime", "");
    let bruttoCalc = 0;
    if (data[dataSelector][brutto])
      bruttoCalc = data[dataSelector][brutto] as number;
    bruttoCalc = getTimeUnit(bruttoCalc, tidsenhet);

    wageCalc += bruttoCalc;
  }

  return Math.round(wageCalc);
}
class LonnWrapper extends Component<
  ComparisonComponentProps<LonnElement>,
  VisualizationHeaderConfigLonn
> {
  constructor(props: ComparisonComponentProps<LonnElement>) {
    super(props);
    this.state = {
      Arbeidstid: "A",
      Sektor: "A",
      Tidsenhet: "Årlig",
      Lønn: "Brutto",
      StatistiskMål: "Median og kvartiler",
      Kjønn: "A",
      ssbSektor: {},
      widgetShowMobileMenu: false,
      lonnDivRef: React.createRef(),
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    if (this.state.lonnDivRef && this.state.lonnDivRef.current) {
      if (this.state.lonnDivRef.current.offsetWidth < 685) {
        this.setState(prevState => {
          return { widgetShowMobileMenu: true };
        });
      } else {
        this.setState(prevState => {
          return { widgetShowMobileMenu: false };
        });
      }
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  onSelectedChoiceClick = (uno_id: string, ssbSektor: string) => {
    this.setState(prevState => {
      return { ssbSektor: { ...prevState.ssbSektor, [uno_id]: ssbSektor } };
    });
  };
  setConfig = (config: VisualizationHeaderConfigLonn) => {
    this.setState(config);
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
    const { data, uno_ids, widget } = this.props;
    const { Sektor, widgetShowMobileMenu, lonnDivRef } = this.state;

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
        var wage = getMaxValue(
          "A",
          unoData,
          this.state.Lønn,
          this.state.StatistiskMål,
          this.state.Arbeidstid,
          this.state.Tidsenhet
        );
        if (maxValue < (wage || 0)) maxValue = wage || 0;
      } else {
        var wageM = getMaxValue(
          "M",
          unoData,
          this.state.Lønn,
          this.state.StatistiskMål,
          this.state.Arbeidstid,
          this.state.Tidsenhet
        );
        if (maxValue < (wageM || 0)) maxValue = wageM || 0;
        var wageK = getMaxValue(
          "K",
          unoData,
          this.state.Lønn,
          this.state.StatistiskMål,
          this.state.Arbeidstid,
          this.state.Tidsenhet
        );
        if (maxValue < (wageK || 0)) maxValue = wageK || 0;
      }
    });

    // Render in widget context (without rows)
    if (true) {
      const uno_id = uno_ids[0];
      if (!uno_id) return <NoData />;
      const ssbSektor = this.getSsbSektor(uno_id);
      const arbeidstid_data = data[uno_id][ssbSektor][Sektor];
      if (!arbeidstid_data) return <NoData />;
      return (
        <div ref={lonnDivRef}>
          <LonnVisualization
            key={uno_ids[0]}
            data={arbeidstid_data}
            arbeidstid={this.state.Arbeidstid}
            kjønn={this.state.Kjønn}
            lønn={this.state.Lønn}
            statistiskMål={this.state.StatistiskMål}
            tidsenhet={this.state.Tidsenhet}
            maxValue={maxValue}
            showGraphics={false}
          />
          {widgetShowMobileMenu ? null : ( //TODO: Insert mobile menu
            <div className={`${styles.widget_header_container}`}>
              <HeaderLonnFilters
                config={this.state}
                onFilterClicked={this.onFilterClicked}
                showHeaders={true}
                showHeaderHelpText={true}
              />
            </div>
          )}
          <LonnSpecificChoice
            key={uno_id}
            data={data[uno_id]}
            onChange={this.onSelectedChoiceClick}
            unoId={uno_id}
            selectedChoice={this.getSsbSektor(uno_id)}
          />
        </div>
      );
    }
    return (
      <div>
        <VisualizationHeaderLonn
          config={this.state}
          setConfig={this.setConfig}
          onFilterClicked={this.onFilterClicked}
          widget={false}
        />
        <LonnHeaderFilterDesktop
          config={this.state}
          onFilterClicked={this.onFilterClicked}
        />
        <Fragment key={Sektor}>
          <ComparisonRow noPadding>
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
                      showGraphics={true}
                    />
                  );
                }
              }
              return <NoData key={uno_id} />;
            })}
          </ComparisonRow>
        </Fragment>
        <ComparisonRow hideEmptyCells>
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
      </div>
    );
  }
}

export default LonnWrapper;
