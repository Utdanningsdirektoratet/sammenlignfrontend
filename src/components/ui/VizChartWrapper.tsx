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
    disaggregate: string[] | null
}

class VizChartWrapper extends Component<Props, State>{
    state: State = { layout: "bars", expanded: false, disaggregate: null };

    clickHandler = (e: any) => {
        console.log("i r clicked", e.target.attributes[0].nodeValue);
        if (e.target.attributes[0].nodeValue) {
            this.setState({ layout: e.target.attributes[0].nodeValue });
        }
    }

    toggleExpansion = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    // <button onClick={() => setDisaggregate(disaggregate ? null : disaggregationValues)}>{"Toggle disaggregations"}</button>
    render() {
        console.log("state", this.state);
        const { uno_ids, rowData, comparison } = this.props;

        const containerContent = (
            <div className={`${styles.containerContent}`}>
                <div className={`${styles.optionsFirst}`}>
                    <Translate nb="Vis som"></Translate>
                    <label>
                        <input type="radio" onChange={this.clickHandler} value={"tree"}></input>
                        Tre
                        </label>
                    <label>
                        <input type="radio" onChange={this.clickHandler} value={"bars"}></input>
                        Stolper
                    </label>
                </div>
                <div className={`${styles.optionsSecond}`}>
                    <Translate nb="Vis også(?)"></Translate>
                    <label>
                        <input type="radio" onChange={this.clickHandler} value={"all"}></input>
                        Alle
                        </label>
                    <label>
                        <input type="radio" onChange={this.clickHandler} value={"disaggregate"}></input>
                        Menn/Kvinner
                    </label>
                </div>
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