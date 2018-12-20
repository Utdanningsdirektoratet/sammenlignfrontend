import React, { Component, Fragment } from "react";
import { UtdanningLonnConfig, FullførtUtdanning } from "./UtdanningLonnConfig";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { UtdanningLonnElement } from "../../../data/ApiTypes";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import NoData from "../Old/NoData";
import UtdanningLonnHeaderMobile from "./UtdanningLonnHeaderMobile";
import LonnSpecificChoice from "../Lonn/LonnSpecificChoice";
import UtdanningLonnHeaderDesktop from "./UtdanningLonnHeaderDesktop";
import UtdanningLonnVisualization from "./UtdanningLonnVisualization";
import { getMaxValue } from "../Lonn/LonnWrapper";

class UtdanningLonnWrapper extends Component<
  ComparisonComponentProps<UtdanningLonnElement>,
  UtdanningLonnConfig
> {
  constructor(props: ComparisonComponentProps<UtdanningLonnElement>) {
    super(props);
    this.state = {
      Tidsenhet: "Årlig",
      Lønn: "Brutto",
      StatistiskMål: "Median og kvartiler",
      Fullført: "A",
      ssbSektor: {},
    };
  }

  getFullførtString = (fullført: FullførtUtdanning) => {
    switch (fullført) {
      case "04":
        return "00-04";
      case "5":
        return "05-";
      default:
        return fullført;
    }
  };

  onSelectedChoiceClick = (uno_id: string, ssbSektor: string) => {
    this.setState(prevState => {
      return { ssbSektor: { ...prevState.ssbSektor, [uno_id]: ssbSektor } };
    });
  };

  setConfig = (config: UtdanningLonnConfig) => {
    this.setState(config);
  };

  onFilterClicked = (event: any, key: string) => {
    let config = { ...this.state };
    var value = event.target.id;
    switch (key) {
      case "Tidsenhet":
        config.Tidsenhet = value;
        break;
      case "Lønn":
        config.Lønn = value;
        break;
      case "StatistiskMål":
        config.StatistiskMål = value;
        break;
      case "Fullført":
        config.Fullført = value;
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

    let maxValue: number = 0;

    this.props.uno_ids.forEach(uno_id => {
      const ssbSektor = this.getSsbSektor(uno_id);
      if (
        !ssbSektor ||
        !data[uno_id] ||
        !data[uno_id][ssbSektor] ||
        !data[uno_id][ssbSektor]["A"]["A"]["A"]
      ) {
        return;
      }
      let unoData = data[uno_id][ssbSektor]["A"]["A"]["A"];
      let fullført = this.getFullførtString(this.state.Fullført);
      var wage = getMaxValue(
        "A",
        unoData,
        this.state.Lønn,
        this.state.StatistiskMål,
        fullført,
        this.state.Tidsenhet
      );
      if (maxValue < (wage || 0)) maxValue = wage || 0;
    });

    if (widget) {
      const uno_id = uno_ids[0];
      if (!uno_id) return <NoData />;
      const ssbSektor = this.getSsbSektor(uno_id);
      const fullfort_data = data[uno_id][ssbSektor]["A"]["A"]["A"];
      if (!fullfort_data) return <NoData />;
      return (
        <div>
          <UtdanningLonnHeaderMobile
            config={this.state}
            setConfig={this.setConfig}
            onFilterClicked={this.onFilterClicked}
            widget={true}
          />
          <UtdanningLonnVisualization
            key={uno_id}
            data={fullfort_data}
            lønn={this.state.Lønn}
            statistiskMål={this.state.StatistiskMål}
            tidsenhet={this.state.Tidsenhet}
            fullført={this.state.Fullført}
            maxValue={maxValue}
            showGraphics={false}
            getFullførtString={this.getFullførtString}
          />
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
        <UtdanningLonnHeaderMobile
          config={this.state}
          setConfig={this.setConfig}
          onFilterClicked={this.onFilterClicked}
          widget={false}
        />
        <UtdanningLonnHeaderDesktop
          config={this.state}
          onFilterClicked={this.onFilterClicked}
        />
        <Fragment>
          <ComparisonRow noPadding>
            {uno_ids.map(uno_id => {
              const ssbSektor = this.getSsbSektor(uno_id);

              if (data[uno_id] && data[uno_id][ssbSektor]) {
                const fullfort_data = data[uno_id][ssbSektor]["A"]["A"]["A"]; // Typescript needs a temporary
                if (fullfort_data) {
                  return (
                    <UtdanningLonnVisualization
                      key={uno_id}
                      data={fullfort_data}
                      lønn={this.state.Lønn}
                      statistiskMål={this.state.StatistiskMål}
                      tidsenhet={this.state.Tidsenhet}
                      fullført={this.state.Fullført}
                      maxValue={maxValue}
                      showGraphics={true}
                      getFullførtString={this.getFullførtString}
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

export default UtdanningLonnWrapper;
