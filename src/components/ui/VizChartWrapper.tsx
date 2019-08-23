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
        if (e.target.attributes[2].nodeValue) {
            if (e.target.attributes[2].nodeValue === "all") {
                this.setState({ disaggregate: null })
            } else if (e.target.attributes[2].nodeValue === "disaggregate") {
                const disaggregationValues = ["antall_kvinner", "antall_menn", "antall_ukjent_kjonn"]
                this.setState({ disaggregate: disaggregationValues })
            } else
                this.setState({ layout: e.target.attributes[2].nodeValue });
        }
    }

    toggleExpansion = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    render() {
        const { uno_ids, rowData, comparison } = this.props;
        const containerContent = (
            <div className={`${styles.containerContent}`}>
                <div className={`${styles.optionsFirst}`}>
                    <ul>
                        <div className={`${styles.optionsFirst_text}`}>
                            <Translate nb="Vis som"></Translate>
                        </div>
                        <li>
                            <label>
                                <input type="radio" name="diagramtype" onChange={this.clickHandler} value={"bars"} defaultChecked></input>
                                Stolper
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="diagramtype" onChange={this.clickHandler} value={"tree"}></input>
                                Tre
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={`${styles.optionsSecond}`}>
                    <ul>
                        <Translate nb="Vis også (?)"></Translate>
                        <li>
                            <label>
                                <input type="radio" name="disaggregate" onChange={this.clickHandler} value={"all"} defaultChecked></input>
                                Alle
                                </label>
                        </li>
                        <li>
                            <label>
                                <input type="radio" name="disaggregate" onChange={this.clickHandler} value={"disaggregate"}></input>
                                Menn/Kvinner
                            </label>
                        </li>
                    </ul>
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