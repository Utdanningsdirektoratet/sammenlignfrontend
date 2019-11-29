import React from "react";
import { Context3 } from "job-market-visuals";

// const disaggregationValues = ["antall_kvinner", "antall_menn", "antall_ukjent_kjonn"];
// const disaggregationLabels = ["kvinner", "menn", "ukjent kjonn"];

let disaggregationLabels: string[];
let labelExperience = ["1-3 years", "7-10 years", "Other"];
let labelGender = ["Kvinner", "Menn", "Ukjent kjonn"];
let label40 = ["Under 40", "Over 40"];
let labelSector = ["Offentlig", "Privat", "Ukjent sektor"];

const ComparisonPageVisualization = (props: any) => {
    const { uno_id, direction, layout, disaggregate } = props;

    let dis = disaggregate;
    if (disaggregate) {
        switch (disaggregate[disaggregate.length - 1]) {
            case "experience":
                disaggregationLabels = labelExperience;
                break;
            case "40":
                disaggregationLabels = label40;
                break;
            case "sector":
                disaggregationLabels = labelSector;
                break;
            default:
                disaggregationLabels = labelGender;
        }
        dis = disaggregate.slice(0, disaggregate.length - 1);
    }

    return (
        <React.Fragment>
            <Context3
                id={uno_id}
                limit={8}
                layout={layout}
                disaggregateBy={dis}
                disaggregateLabels={disaggregationLabels}
                direction={direction}
                colors={{
                    text: "#333",
                    textTree: "#333",
                    primary: "#ff9800",
                    disaggregations: ["#84012e", "#9bbad3", "#ddd"],
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