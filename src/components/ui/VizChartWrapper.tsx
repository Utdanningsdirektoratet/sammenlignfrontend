import React, { useState, Component } from "react";
import { Visualization } from "job-market-visuals";

// import styles from "./ComparisonPageVisualization.module.scss";

import ComparisonPageVisualization from "../ui/ComparisonPageVisualization";
import VizChartOptions from "./VizChartOptions";
import ComparisonRow from "../pages/ComparisonPage/ComparisonRow";
import { SammenligningTemplate } from "../comparisonsConfig";
import IsolatedComparisonPart from "../pages/ComparisonPage/IsolatedComparisonPart";
import Translate from "../app/Translate";
import styles from "./VizChartWrapper.module.scss";
import OpenIcon from "../visualizations/Generic/OpenIcon";
import CloseIcon2 from "../visualizations/Generic/CloseIcon2";

type Props = {
    uno_ids: string[];
    rowData: { [uno_id: string]: any };
    comparison: SammenligningTemplate;
}

type State = {
    layout: string
    expanded: Boolean
    disaggregate: string[] | null,
    showDisagg: Boolean,
    lastSelection: string
}

class VizChartWrapper extends Component<Props, State>{
    state: State = { layout: "bars", expanded: false, disaggregate: null, showDisagg: true, lastSelection: "all" };

    clickHandler = (e: any) => {
        if (e.target.attributes[2].nodeValue) {
            if (e.target.attributes[2].nodeValue === "all") {
                this.setState({ disaggregate: null, lastSelection: "all" })
            } else if (e.target.attributes[2].nodeValue === "gender") {
                const disaggregationValues = ["antall_kvinner", "antall_menn", "antall_ukjent_kjonn"]
                this.setState({ disaggregate: disaggregationValues, lastSelection: "gender" })
            } else if (e.target.attributes[2].nodeValue === "40") {
                const disaggregationValues = ["antall_40", "over_40", "40"]
                this.setState({ disaggregate: disaggregationValues, lastSelection: "40" })
            } else if (e.target.attributes[2].nodeValue === "sector") {
                const disaggregationValues = ["antall_offentlig", "antall_privat", "antall_ukjent_sektor", "sector"]
                this.setState({ disaggregate: disaggregationValues, lastSelection: "sector" })
            } else if (e.target.attributes[2].nodeValue === "experience") {
                const disaggregationValues = ["antall_13", "antall_710", "other_experience", "experience"]
                this.setState({ disaggregate: disaggregationValues, lastSelection: "experience" })
            } else {
                if (e.target.attributes[2].nodeValue === "tree")
                    this.setState({ layout: e.target.attributes[2].nodeValue, showDisagg: false });
                else
                    this.setState({ layout: e.target.attributes[2].nodeValue, showDisagg: true });
            }
        }
    }

    toggleExpansion = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const { uno_ids, rowData, comparison } = this.props;
        const values = [
            "all",
            "gender",
            "40",
            "sector",
            "experience"
        ];
        const containerContent = (
            <div className={`${styles.containerContent}`}>
                <div className={`${styles.optionsFirst}`}>
                    <ul>
                        <div className={`${styles.optionsFirst_text}`}>
                            <Translate nb="Vis som"></Translate>
                        </div>
                        <VizChartOptions type={["diagramtype"]} widget_id={comparison.widget_id} val={["bars", "tree"]} text={["Stolper", "Tre"]} changeHandler={this.clickHandler} lastSelection={null}></VizChartOptions>
                    </ul>
                </div>
                {this.state.showDisagg && <div className={`${styles.optionsSecond}`}>
                    <ul>
                        <Translate nb="Vis også (?)"></Translate>
                        {/* <VizChartOptions type="disaggregate" widget_id={comparison.widget_id} val={["all", "disaggregate",""]} text={["Alle", "Menn/Kvinner", "Under 40/Over 40", "Sektor", "Erfaring"]} changeHandler={this.clickHandler} lastSelection={this.state.lastSelection}></VizChartOptions> */}
                        <VizChartOptions type={values} widget_id={comparison.widget_id} val={values} text={["Alle", "Menn/Kvinner", "Under 40/Over 40", "Sektor", "Erfaring"]} changeHandler={this.clickHandler} lastSelection={this.state.lastSelection}></VizChartOptions>
                    </ul>
                </div>}
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
                <ComparisonRow>
                    {uno_ids.map(uno_id => (
                        <IsolatedComparisonPart
                            key={uno_id}
                            uno_idsz={uno_id}
                            data={rowData[uno_id]}
                            template={comparison}
                            widget={false}
                            layout={this.state.layout}
                            disaggregate={this.state.disaggregate}
                        />
                    ))}
                </ComparisonRow>
            </React.Fragment>
        )
    }
}

export default VizChartWrapper;