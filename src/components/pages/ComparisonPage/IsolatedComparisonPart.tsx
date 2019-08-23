import React, { Component } from "react";
import { SammenligningTemplate } from "../../comparisonsConfig";

import visualizationStyles from "../../visualizations/Visualization.module.scss";

import NoData from "../../visualizations/Old/NoData";

type Props = {
  data: any;
  template: SammenligningTemplate;
  uno_ids?: string[];
  widget: boolean;
  uno_idsz?: string;
  layout: string;
  disaggregate: string[] | null;
};

type State = { error: boolean };

class IsolatedComparisonPart extends Component<Props, State> {
  state: State = { error: false };
  componentDidCatch(e: any) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    this.setState({ error: true });
  }

  render() {
    const { data, template, uno_ids, widget, uno_idsz, layout, disaggregate } = this.props;
    if (this.state.error) {
      return <div>Error {template.title}</div>;
    }
    if (template.Component && uno_ids) {
      return (
        <template.Component
          data={data}
          template={template}
          uno_ids={uno_ids}
          widget={widget}
        />
      );
    }
    if (!template.render) {
      return <div>missing method render() on {template.title}</div>;
    }
    if (!data && template.title !== "Utdanningsbakgrunn") {
      return <NoData />;
    }
    try {
      return (
        <div className={`${visualizationStyles.visualization_container}`}>
          {template.render(uno_idsz, layout, disaggregate)}
        </div>
      );
    } catch (error) {
      this.setState({ error: true });
    }
    return <div>Error {template.title}</div>;
  }
}

export default IsolatedComparisonPart;
