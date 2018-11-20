import React, { Component } from "react";
import { Main } from "../../data/ApiTypes";
import { getMain } from "../../data/main";

type Props = {
  uno_id: string;
};
type State = {
  main: Main;
};

class UnoId extends Component<Props, State> {
  state: State = { main: {} as Main };
  componentDidMount() {
    getMain(data => {
      this.setState({ main: data });
    });
  }
  render() {
    const element = this.state.main[this.props.uno_id];
    if (!element) return this.props.uno_id;
    return element.tittel;
  }
}

export default UnoId;
