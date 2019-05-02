import React, { Component } from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./InnholdButton.module.scss";

import Translate from "../app/Translate";
import { ReactComponent as ArrowDown } from "../../fontawesome/solid/angle-down.svg";

type Props = {
    innholdstype?: string
}

type State = {
    isActive: boolean
}

export default class InnHoldButton extends Component<Props, State> {
    state = {
        isActive: false
    };

    toggleButton = () => {
        this.setState({ isActive: !this.state.isActive });          // Toggle button active class, If active, the button is displayed absolute. 
    }
    handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        this.toggleButton();
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

    handleInnholdClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        this.toggleButton();
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
        let showActive = this.state.isActive ? `${styles.selection_button_active}` : "";
        if (!this.state.isActive) {
            return (
                // <button className={`${styles.selection_button} ${showActive}`} onClick={this.handleClick}>{this.doPlural(this.props.innholdstype)}{<ArrowDown />}</button>
                <div className={`${styles.selection_button} ${showActive}`} >
                    <p onClick={this.handleInnholdClick}>{this.props.innholdstype}</p>
                    {<ArrowDown />}
                </div>
                // <p className={`${styles.selection_button} ${showActive}`} onClick={this.handleClick}>{this.doPlural(this.props.innholdstype)}{<ArrowDown />}</p>
            )
        } else {
            if (this.props.innholdstype === "yrke") {
                return (
                    // <button className={`${styles.selection_button} ${showActive}`} onClick={() => this.handleClick()}>{this.doPlural(this.props.innholdstype)}</button>
                    <div className={`${styles.selection_button} ${showActive}`} >
                        <p onClick={this.handleInnholdClick}>Yrker </p>
                        {<ArrowDown />}
                        <p><Link to={"/liste/utdanning"}>
                            <Translate nb="Utdanninger" />
                        </Link></p>
                    </ div>
                )
            } else if (this.props.innholdstype === "utdanning") {
                return (
                    // <button className={`${styles.selection_button} ${showActive}`} onClick={() => this.handleClick()}>{this.doPlural(this.props.innholdstype)}</button>
                    <div className={`${styles.selection_button} ${showActive}`} >
                        <p onClick={this.handleInnholdClick}>Utdanninger {<ArrowDown />}</p>
                        <p><Link to={"/liste/yrke"}>
                            <Translate nb="Yrker" />
                        </Link></p>
                    </ div>
                )
            }
            // return (
            //     // <button className={`${styles.selection_button} ${showActive}`} onClick={() => this.handleClick()}>{this.doPlural(this.props.innholdstype)}</button>
            //     <div className={`${styles.selection_button}`} >
            //         <Link to={"/liste/yrke"}>
            //             Yrker
            //         </Link>
            //         {/* <p onClick={this.handleInnholdClick}>Yrker</p> */}
            //         {/* <p onClick={this.handleInnholdClick}>Utdanninger</p> */}
            //     </ div>
            // )
        }
    }
}
