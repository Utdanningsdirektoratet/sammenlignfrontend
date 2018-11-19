import React, { Component } from "react";
import { Main } from "../../data/ApiTypes";
import { getMain } from "../../data/main";
import { with_lang_props, LanguageProps } from "./TranslateContext";

type Props = {
  uno_id: string;
};
type State = {
  main: Main;
};

class UnoId extends Component<Props & LanguageProps, State> {
  state: State = { main: {} as Main };
  componentDidMount() {
    getMain(this.props.lang, data => {
      this.setState({ main: data });
    });
  }
  render() {
    const element = this.state.main[this.props.uno_id];
    if (!element) return this.props.uno_id;
    return element.tittel;
  }
}

export default with_lang_props<Props>(UnoId);
