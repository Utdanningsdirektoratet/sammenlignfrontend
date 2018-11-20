import React from "react";
import { LonnElement, Sektor } from "../../../data/ApiTypes";
import { VisualizationHeaderConfigLonn } from "./VisualizationHeaderLonn";
import NoData from "../Old/NoData";
import LonnVisualization from "./LonnVisualization";
import LonnSpecificChoice from "./LonnSpecificChoice";

type Props = {
  data: LonnElement;
  config: VisualizationHeaderConfigLonn;
  rowIndex?: number;
  unoId?: string;
  setConfig?: (config: any) => void;
};

type State = {
  selectedChoice: string;
};

class LonnWrapper extends React.Component<Props, State> {
  state = {
    selectedChoice: Object.keys(this.props.data)[0],
  };

  componentDidMount = () => {
    var config = this.props.config;
    config.ssbSektor[this.props.unoId as string] = Object.keys(
      this.props.data
    )[0];
    if (this.props.setConfig) this.props.setConfig(config);
  };

  onSelectedChoiceClick = (event: any) => {
    this.setState({
      selectedChoice: event.target.id,
    });
    var config = {
      ...this.props.config,
      ssbSektor: {
        ...this.props.config.ssbSektor,
        [this.props.unoId as string]: event.target.id,
      },
    };
    if (this.props.setConfig) this.props.setConfig(config);
  };

  render() {
    const { data, config, unoId } = this.props;
    const ssbSektor =
      config.ssbSektor[this.props.unoId as string] || Object.keys(data)[0];
    if (!data || Object.keys(data).length === 0) return <NoData />;

    let sektorData: Sektor[] =
      config.Sektor.length > 0 ? config.Sektor : ["A", "S", "P", "K"];
    let sektor = sektorData[this.props.rowIndex || 0];
    if (!sektor)
      return (
        <LonnSpecificChoice
          data={data}
          onSelected={this.onSelectedChoiceClick}
          selectedChoice={this.state.selectedChoice}
          unoId={unoId}
        />
      );
    if (!data[ssbSektor] || !data[ssbSektor][sektor]) return <NoData />;
    return (
      <LonnVisualization
        data={data[ssbSektor][sektor]}
        arbeidstid={config.Arbeidstid}
        kjønn={config.Kjønn}
        lønn={config.Lønn}
        statistiskMål={config.StatistiskMål}
        tidsenhet={config.Tidsenhet}
      />
    );
  }
}

export default LonnWrapper;
