import React, { Component } from "react";
import { ArbeidsledighetObject } from "../../../data/ApiTypes";
import {
  VisualizationHeaderConfigArbeidsledighet,
  Fullført,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";

type Props = {
  data: ArbeidsledighetObject;
  config: VisualizationHeaderConfigArbeidsledighet;
};

class ArbeidsledighetWrapper extends Component<Props> {
  render() {
    const { data, config } = this.props;
    if (!data || Object.keys(data).length === 0) return <NoData />;
    let fullførtData: Fullført[] =
      config.Fullført.length > 0 ? config.Fullført : ["710", "13", "A"];

    return (
      <ArbeidsledighetVisualization
        data={data}
        kjønn={config.Kjønn}
        fullført={fullførtData}
        visning={config.Visning}
      />
    );
  }
}

export default ArbeidsledighetWrapper;
