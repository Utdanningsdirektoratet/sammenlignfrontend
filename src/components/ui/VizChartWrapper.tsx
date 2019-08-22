import React, { useState, Component } from "react";
import { Visualization } from "job-market-visuals";

// import styles from "./ComparisonPageVisualization.module.scss";

import ComparisonPageVisualization from "../ui/ComparisonPageVisualization";
import ComparisonRow from "../pages/ComparisonPage/ComparisonRow";
import { SammenligningTemplate } from "../comparisonsConfig";
import IsolatedComparisonPart from "../pages/ComparisonPage/IsolatedComparisonPart";
import Translate from "../app/Translate";
import styles from "./VizChartWrapper.module.scss";
import OpenIcon from "../visualizations/Generic/OpenIcon";
import CloseIcon2 from "../visualizations/Generic/CloseIcon2";

const disaggregationValues = ["antall_kvinner", "antall_menn", "antall_ukjent_kjonn"];
const disaggregationLabels = ["kvinner", "menn", "ukjent kjonn"];

type Props = {
    uno_ids: string[];
    rowData: { [uno_id: string]: any };
    comparison: SammenligningTemplate;
}

type State = {
    layout: string
    expanded: Boolean
}

class VizChartWrapper extends Component<Props, State>{
    state: State = { layout: "bars", expanded: false };

    clickHandler = (e: any) => {
        console.log("i r clicked", e.target.attributes[0].nodeValue);
        if (e.target.attributes[0].nodeValue) {
            this.setState({ layout: e.target.attributes[0].nodeValue });
        }
    }

    toggleExpansion = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        console.log("state", this.state);
        const { uno_ids, rowData, comparison } = this.props;

        const containerContent = (
            <div className={`${styles.container_content}`}>
                <button onClick={this.clickHandler} value={"tree"}>tree</button>
                <button onClick={this.clickHandler} value={"bars"}>bar</button>
            </div>
        );
        return (
            <React.Fragment>
                <div className={`${styles.buttonContainer}`} onClick={this.toggleExpansion}>
                    <div className={`${styles.header}`}><Translate nb="Se visningsalternativer" /></div>
                    <div className={`${styles.head_icon}`}>
                        {this.state.expanded ? <CloseIcon2 /> : <OpenIcon />}
                    </div>
                </div>
                {this.state.expanded ? containerContent : null}
                {/* <button onClick={this.clickHandler} value={"kjonn"}>bar</button> */}
                <ComparisonRow>
                    {uno_ids.map(uno_id => (
                        <IsolatedComparisonPart
                            key={uno_id}
                            uno_idsz={uno_id}
                            data={rowData[uno_id]}
                            template={comparison}
                            widget={false}
                            layout={this.state.layout}
                        />
                    ))}
                </ComparisonRow>
            </React.Fragment>
        )
    }
}

export default VizChartWrapper;