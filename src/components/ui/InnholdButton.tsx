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
        let showActive = this.state.isActive ? `${styles.selection_button_active}` : "";
        if (!this.state.isActive) {
            return (
                <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick}>
                    <div className={`${styles.innhold_options}`}>
                        <p>{this.doPlural(this.props.innholdstype)}</p>
                        {<ArrowDown />}
                    </div>
                </div>
            )
        } else {
            if (this.props.innholdstype === "yrke") {
                return (
                    <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick} >
                        <div className={`${styles.innhold_options}`}>
                            <p>{this.doPlural(this.props.innholdstype)} </p>
                            {<ArrowDown />}
                        </div>
                        <div className={`${styles.innhold_options}`}>
                            <p><Link to={"/liste/utdanning"}>
                                <Translate nb="Utdanninger" />
                            </Link></p>
                        </div>
                    </ div>
                )
            } else if (this.props.innholdstype === "utdanning") {
                return (
                    <div className={`${styles.selection_button} ${showActive}`} onClick={this.handleInnholdClick} >
                        <div className={`${styles.innhold_options}`}>
                            <p>{this.doPlural(this.props.innholdstype)}</p>
                            {<ArrowDown />}
                        </div>
                        <div className={`${styles.innhold_options}`}>
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
