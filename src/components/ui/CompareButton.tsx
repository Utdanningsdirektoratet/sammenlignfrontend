import React, { Component } from "react";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";

import styles from "./InnholdButton";

import Translate from "../app/Translate";
import { ReactComponent as ArrowDown } from "../../fontawesome/solid/angle-down.svg";

type Props = {
    innholdstype?: string
}

type State = {
    isActive: boolean
}

export default class CompareButton extends Component<Props, State> {
    render() {
        return (
            null
        )
    }
}
