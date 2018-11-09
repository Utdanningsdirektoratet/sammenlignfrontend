import React, { Component } from "react";
import { with_app_state, AppStateProps } from "./AppContext";
import { with_lang_props, LanguageProps } from "./TranslateContext";
import { API_DOMAIN } from "../../data/config";
import { objectToQueryString } from "../../util/querystring";

export type QueryObject = { [a: string]: string };

type MyProps = {
  path: string;
  query?: QueryObject;
  children: (data: any) => JSX.Element;
};
type Props = MyProps & AppStateProps & LanguageProps;

type State = {
  data: any;
};

class Api extends Component<Props, State> {
  componentDidMount() {
    const { path, query, lang } = this.props;
    const querystring = objectToQueryString({ ...query, sprak: lang });

    fetch(`${API_DOMAIN}${path}?${querystring}`)
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
