import React, { Component } from "react";

import comparisonsConfig, { SammenligningTemplate } from "../comparisonsConfig";
import IsolatedComparisonPart from "../pages/ComparisonPage/IsolatedComparisonPart";
import { Lang, TranslateRoot, setLang } from "../app/Translate";
import { API_DOMAIN } from "../../config";
import { objectToQueryString } from "../../util/querystring";

type Props = {
  uno_id: string;
  widget_name: string;
  lang: Lang;
};

type State = {
  error: string | false;
  template?: SammenligningTemplate;
  data?: any;
};

class Widget extends Component<Props, State> {
  state: State = { error: false };
  componentDidMount() {
    const { widget_name, uno_id } = this.props;
    let template: SammenligningTemplate | undefined;
    Object.keys(comparisonsConfig).map(innholdstype => {
      const comparisons = comparisonsConfig[innholdstype];
      comparisons.forEach(comparison => {
        if (comparison.widget_id === widget_name) {
          template = comparison;
        }
      });
    });
    if (template) {
      this.setState({ template: template });
      fetch(
        API_DOMAIN +
        template.path +
        "?" +
        objectToQueryString({ ...template.query, uno_id: uno_id })
      )
        .then(r => r.json())
        .then(data => {
          if (data.error) {
            throw new Error("404");
          }
          this.setState({ data });
        })
        .catch(e => this.setState({ error: "fetch failed:" + e.toString() }));
    } else {
      this.setState({ error: "Fant ikke widget " + widget_name });
    }
  }
  render() {
    const { widget_name, uno_id } = this.props;
    const { template, error, data } = this.state;
    if (error) return <div>{error}!!!</div>;
    if (template && data) {
      return (
        <IsolatedComparisonPart
          data={template.render ? data[uno_id] : data}
          template={template}
          uno_ids={uno_id.split(",")}
          widget={true}
          layout={""}
          disaggregate={null}
        />
      );
    }
    return <div>{widget_name}</div>;
  }
}
export default function (props: Props) {
  setLang(props.lang);

  return (
    <TranslateRoot>
      <Widget {...props} />
    </TranslateRoot>
  );
}
