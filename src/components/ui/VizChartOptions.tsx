import React, { Component } from "react";

// import styles from "./ComparisonPageVisualization.module.scss";

import { SammenligningTemplate } from "../comparisonsConfig";
import Translate from "../app/Translate";

type Props = {
    type: string,
    widget_id: string,
    val: string[],
    text: string[],
    changeHandler: Function,
    lastSelection: string | null
}


class VizChartOptions extends Component<Props>{

    handleClick = (e: any) => {
        this.props.changeHandler(e);
    }

    render() {
        const { type, widget_id, val, text, lastSelection } = this.props;

        if (type === "disaggregate") {
            return (
                <React.Fragment>
                    <li key={widget_id + type + "0"}>
                        <label>
                            <input type="radio" name={type + widget_id} onClick={this.handleClick} value={val[0]} defaultChecked></input>
                            {<Translate nb={text[0]}></Translate>}
                        </label>
                    </li>

                    <li key={widget_id + type + "1"}>
                        <label>
                            <input type="radio" name={type + widget_id} onClick={this.handleClick} value={val[1]} checked={lastSelection === type}></input>
                            {<Translate nb={text[1]}></Translate>}
                        </label>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <li key={widget_id + type + "0"}>
                        <label>
                            <input type="radio" name={type + widget_id} onClick={this.handleClick} value={val[0]} defaultChecked></input>
                            {<Translate nb={text[0]}></Translate>}
                        </label>
                    </li>

                    <li key={widget_id + type + "1"}>
                        <label>
                            <input type="radio" name={type + widget_id} onClick={this.handleClick} value={val[1]}></input>
                            {<Translate nb={text[1]}></Translate>}
                        </label>
                    </li>
                </React.Fragment>
            )
        }
    }
}

export default VizChartOptions;
