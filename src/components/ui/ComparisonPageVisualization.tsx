import React, { useState } from "react";
import { Visualization } from "job-market-visuals";

import styles from "./ComparisonPageVisualization.module.scss";

const disaggregationValues = ["antall_kvinner", "antall_menn", "antall_ukjent_kjonn"];
const disaggregationLabels = ["kvinner", "menn", "ukjent kjonn"];

const ComparisonPageVisualization = (props: any) => {
    const { uno_id, direction } = props;
    const [layout, setLayout] = useState("bars");
    let setDisaggregate: any;
    let disaggregate: any = null;
    [disaggregate, setDisaggregate] = useState(null);
    return (
        <React.Fragment>
            <button className={`${styles.button}`} onClick={() => setLayout("tree")}>{"Tre"}</button>
            <button className={`${styles.button}`} onClick={() => setLayout("bars")}>{"Stolpe"}</button>
            <button className={`${styles.button} ${styles.fordeling}`} onClick={() => setDisaggregate(disaggregate ? null : disaggregationValues)}>{"Kjønnsfordeling"}</button>
            <Visualization
                unoId={uno_id}
                limit={8}
                layout={layout}
                disaggregateBy={disaggregate}
                disaggregateLabels={disaggregationLabels}
                direction={direction}
                colors={{
                    text: "#333",
                    textTree: "#333",
                    primary: "#ff9800",
                    disaggregations: ["#ffcc80", "#f57c00", "#ddd"],
                    notWorking: "#ff5722",
                    unemployed: "#f44336",
                    inEducation: "#ff9800",
                    selfEmployed: "#ff9800",
                    other: "#9e9e9e",
                }}
            />
        </React.Fragment>
    )
}

export default ComparisonPageVisualization;