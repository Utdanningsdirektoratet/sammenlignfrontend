import React, { Component } from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./InnholdButton.module.scss";

import Translate from "../app/Translate";
import { ReactComponent as ArrowDown } from "../../fontawesome/solid/angle-down.svg";
import { MIN_DESKTOP_PX } from "../../util/Constants";
import { active } from "d3";

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
        let el = document.getElementById('test');
        if (el && this.state.isActive)
            el.style.marginTop = "0px";
        else if (el && !this.state.isActive)
            el.style.marginTop = "64px";

        this.setState({ isActive: !this.state.isActive });          // Toggle button active class, If active, the button is displayed absolute. 
    }
    handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        this.toggleButton();
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
        // let showActive = this.state.isActive ? `${styles.selection_button_active}` : "";
        // let showActive = this.state.isActive == true && innerWidth >= MIN_DESKTOP_PX ? `${styles.selection_buttondesktop_active}` : "";
        let showActive = "";
        if (this.state.isActive && innerWidth >= MIN_DESKTOP_PX) {
            showActive = `${styles.selection_buttondesktop_active}`;
        } else if (this.state.isActive && !(innerWidth >= MIN_DESKTOP_PX)) {
            showActive = `${styles.selection_buttonmobile_active}`;
        }
        let desktop = innerWidth >= MIN_DESKTOP_PX ? `${styles.selection_buttondesktop}` : `${styles.selection_buttonmobile}`;
        let options = innerWidth >= MIN_DESKTOP_PX ? `${styles.selection_buttondesktop_options}` : `${styles.selection_buttonmobile_options}`;
        let activeOptions = "";
        if (this.state.isActive) {
            activeOptions = innerWidth >= MIN_DESKTOP_PX ? `${styles.selection_buttondesktop_options}` : `${styles.selection_buttonmobile_active_options}`; // Rewrite this sometime
        }
        if (!this.state.isActive) {
            return (
                // <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick}>
                <div className={`${desktop} ${showActive}`} onClick={this.handleInnholdClick} >
                    {/* <div className={`${styles.innhold_options}`}> */}
                    <div className={`${options}`}>
                        <p>{this.doPlural(this.props.innholdstype)}</p>
                        {<ArrowDown />}
                    </div>
                </div>
            )
        } else {
            if (this.props.innholdstype === "yrke") {
                return (
                    // <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick} >
                    <div className={`${desktop} ${showActive}`} onClick={this.handleInnholdClick} >
                        {/* <div className={`${styles.innhold_options}`}> */}
                        <div className={`${options} ${activeOptions}`}>
                            <p>{this.doPlural(this.props.innholdstype)} </p>
                            {<ArrowDown />}
                        </div>
                        {/* <div className={`${styles.innhold_options}`}> */}
                        <div className={`${options}`}>
                            <p><Link to={"/liste/utdanning"}>
                                <Translate nb="Utdanninger" />
                            </Link></p>
                        </div>
                    </ div>
                )
            } else if (this.props.innholdstype === "utdanning") {
                return (
                    // <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick} >
                    <div className={`${desktop} ${showActive}`} onClick={this.handleInnholdClick} >
                        {/* <div className={`${styles.innhold_options}`}> */}
                        <div className={`${options} ${activeOptions}`}>
                            <p>{this.doPlural(this.props.innholdstype)}</p>
                            {<ArrowDown />}
                        </div>
                        {/* <div className={`${styles.innhold_options}`}> */}
                        <div className={`${options}`}>
                            <p><Link to={"/liste/yrke"}>
                                <Translate nb="Yrker" />
                            </Link></p>
                        </div>
                    </ div>
                )
            }
        }
    }
}
