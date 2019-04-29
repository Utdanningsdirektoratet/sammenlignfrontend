import React, { Component } from "react";

export default class TestButton extends Component {

    handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e);
    }

    render() {
        return (
            <button onClick={this.handleClick}>Yrker</button>
        )
    }
}