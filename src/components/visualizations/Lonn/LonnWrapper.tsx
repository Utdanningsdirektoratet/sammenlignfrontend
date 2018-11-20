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

class LonnWrapper extends Component<
  ComparisonComponentProps<LonnElement>,
  VisualizationHeaderConfigLonn
> {
  constructor(props: ComparisonComponentProps<LonnElement>) {
    super(props);
    const ssbSektor: { [uno_id: string]: string } = {};
    this.props.uno_ids.forEach(uno_id => {
      ssbSektor[uno_id] = Object.keys(this.props.data[uno_id] || {})[0];
    });
    this.state = {
      Arbeidstid: "A",
      Sektor: ["A"],
      Tidsenhet: "Månedlig",
      Lønn: "Brutto",
      StatistiskMål: "Median",
      Kjønn: "A",
      ssbSektor: ssbSektor,
    };
  }

  onSelectedChoiceClick = (uno_id: string, ssbSektor: string) => {
    this.setState(prevState => {
      return { ssbSektor: { ...prevState.ssbSektor, [uno_id]: ssbSektor } };
    });
  };
  setConfig = (config: VisualizationHeaderConfigLonn) => {
    this.setState(config);
  };

  render() {
    const { data, uno_ids, template } = this.props;
    const { Sektor: sektorArray } = this.state;

    return (
      <div>
        <VisualizationHeaderLonn
          config={this.state}
          setConfig={this.setConfig}
        />
        {sektorArray.map(sektor => {
          return (
            <Fragment key={sektor}>
              {sektorArray.length > 1 ? <h4>{sektor}</h4> : null}
              <ComparisonRow>
                {uno_ids.map(uno_id => {
                  const ssbSektor = this.state.ssbSektor[uno_id];
                  if (
                    data[uno_id] &&
                    data[uno_id][ssbSektor] &&
                    data[uno_id][ssbSektor][sektor]
                  )
                    return (
                      <LonnVisualization
                        key={uno_id}
                        data={data[uno_id][ssbSektor][sektor]}
                        arbeidstid={this.state.Arbeidstid}
                        kjønn={this.state.Kjønn}
                        lønn={this.state.Lønn}
                        statistiskMål={this.state.StatistiskMål}
                        tidsenhet={this.state.Tidsenhet}
                      />
                    );
                  return <NoData key={uno_id} />;
                })}
              </ComparisonRow>
            </Fragment>
          );
        })}
        <ComparisonRow>
          {uno_ids.map(uno_id => {
            return (
              <LonnSpecificChoice
                key={uno_id}
                data={data[uno_id]}
                onChange={this.onSelectedChoiceClick}
                unoId={uno_id}
                selectedChoice={this.state.ssbSektor[uno_id]}
              />
            );
          })}
        </ComparisonRow>
      </div>
    );
  }
}

export default LonnWrapper;
