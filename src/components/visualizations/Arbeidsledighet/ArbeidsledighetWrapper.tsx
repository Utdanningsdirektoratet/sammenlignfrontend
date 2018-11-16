import React from "react";
import { ArbeidsledighetObject, Kjønn } from "../../../data/ApiTypes";
import {
  VisualizationHeaderConfigArbeidsledighet,
  Fullført,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";

type Props = {
  data: ArbeidsledighetObject;
  config: VisualizationHeaderConfigArbeidsledighet;
};

class ArbeidsledighetWrapper extends React.Component<Props> {
  render() {
    const { data, config } = this.props;
    if (!data || Object.keys(data).length === 0) return null;
    let kjønnData: Kjønn[] =
      config.Kjønn.length > 0 ? config.Kjønn : ["A", "K", "M"];
    let fullførtData: Fullført[] =
      config.Fullført.length > 0 ? config.Fullført : ["710", "13", "A"];

    return (
      <ArbeidsledighetVisualization
        data={data}
        kjønn={kjønnData}
        fullført={fullførtData}
        visning={config.Visning}
      />
    );
  }
}

export default ArbeidsledighetWrapper;
