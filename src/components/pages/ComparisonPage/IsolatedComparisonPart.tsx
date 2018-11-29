import React, { Component } from "react";
import { SammenligningTemplate } from "../../comparisonsConfig";

// import styles from "./IsolatedComparisonPart.module.scss";
import NoData from "../../visualizations/Old/NoData";

type Props = {
  data: any;
  template: SammenligningTemplate;
  uno_ids?: string[];
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
    const { data, template, uno_ids } = this.props;
    if (this.state.error) {
      return <div>Error {template.title}</div>;
    }
    if (template.Component && uno_ids) {
      return (
        <template.Component data={data} template={template} uno_ids={uno_ids} />
      );
    }
    if (!template.render) {
      return <div>missing method render() on {template.title}</div>;
    }
    try {
      return <div>{data ? template.render(data) : <NoData />}</div>;
    } catch (error) {
      this.setState({ error: true });
    }
    return <div>Error {template.title}</div>;
  }
}

export default IsolatedComparisonPart;
