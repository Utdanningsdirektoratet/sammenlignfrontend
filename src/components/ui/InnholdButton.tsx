import React, { Component } from "react";

import styles from "./InnholdButton.module.scss";

import Translate from "../app/Translate";

type Props = {
    innholdstype?: string
}

export default class InnHoldButton extends Component<Props> {

    handleClick = () => {
        /*
        TODO 
        Klikk på knappen skal åpne en liste med options
        I dette tilfellet blir det kun 2

        Valgt: yrke. Klikk.

        ----------------|
        | Yrker(Bold) /\|   Boksen skal være en overlay, altså absolute(maybe not faktisk) posisjonering med z-index høyere enn bakgrunnen. Bredde like stor som før klikk. Høyde må selvsagt utvides. 
        | Utdanninger   |
        |---------------|
        
        Endringen må endre innholdstypen, vi må altså rerendere AlphabeticOverviewPage, for å få med oss endringene. Dette krever at innholdstype er en del av alpha.. sin state. 
        
        */


    }

    doPlural = (innholdstype: string | any) => {
        if (innholdstype === "yrke") {
            return <Translate nb="yrker" />;
        }
        if (innholdstype === "utdanning") {
            return <Translate nb="utdanninger" />;
        }
    }

    render() {
        return (
            <button className={`${styles.ost}`} onClick={() => this.handleClick()}>{this.doPlural(this.props.innholdstype)}</button>
        )
    }
}