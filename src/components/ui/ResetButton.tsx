import React, { Component } from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./ResetButton.module.scss";

import Translate from "../app/Translate";
import { ReactComponent as ArrowDown } from "../../fontawesome/solid/angle-down.svg";
import { MIN_DESKTOP_PX } from "../../util/Constants";
import { active } from "d3";
import { with_app_state, AppStateProps } from "../app/AppContext";
import { DataList, MainElement, Innholdstype } from "../../data/ApiTypes";

type Props = {
    selected_uno_id: string[];
    toggleuno: Function;
}


export default class InnHoldButton extends Component<Props> {

    handleClick = () => {
        for (let i = 0; i < this.props.selected_uno_id.length; i++) {
            this.props.toggleuno(this.props.selected_uno_id[i]);
        }
    }

    render() {
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.container_button}`} onClick={this.handleClick}><Translate nb="nullstill" /></div>
            </div>
        )
    }
}
