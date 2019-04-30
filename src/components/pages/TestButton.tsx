import React, { Component } from "react";


type Props = {
    handleClick?: any
}

export default class TestButton extends Component<Props> {

    handleClick = () => {
        this.props.handleClick();
    }


    render() {

        return (
            <button onClick={() => this.handleClick()}> Yrker</button >
        )
    }
}