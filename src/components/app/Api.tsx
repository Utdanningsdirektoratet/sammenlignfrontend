import React, { Component } from "react";
import { with_app_state, AppStateProps } from "./AppContext";
import { with_lang_props, LanguageProps } from "./TranslateContext";

type MyProps = {
  url: string;
  children: (data: any) => JSX.Element;
};
type Props = MyProps & AppStateProps & LanguageProps;

class Api extends Component<Props> {
  componentDidMount() {
    const { url, lang } = this.props;
    const res = fetch(`${url}?lang=${lang}`)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }
  state = { data: null };
  render() {
    const { data } = this.state;
    if (!data) return null;
    return this.props.children(data);
  }
}

export default with_lang_props<MyProps>(with_app_state<MyProps>(Api));
