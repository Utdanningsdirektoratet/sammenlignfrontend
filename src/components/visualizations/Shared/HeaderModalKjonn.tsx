import React, { Component } from "react";
import Translate from "../../app/Translate";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { Kjønn } from "../../../data/ApiTypes";

type Props = {
  kjønn: Kjønn;
  onHelpTextClick: (open: boolean, key: string) => void;
  onFilterClicked: (event: any, key: string) => void;
  openHelpText: string;
};

class HeaderModalKjønn extends React.Component<Props> {
  render() {
    const {
      kjønn,
      onHelpTextClick,
      onFilterClicked,
      openHelpText,
    } = this.props;
    return (
      <ul>
        <RadioButtonGroup
          group={[
            {
              text: <Translate nb="Alle" nn="nynorsk" />,
              selected: kjønn === "A",
              valueKey: "A",
              helptext: (
                <Translate
                  nb="Viser tall beregnet på grunnlag av både kvinner og menn."
                  nn="nynorsk"
                />
              ),
              onHelpTextClick: open =>
                this.props.onHelpTextClick(open, "Kjønn-A"),
              helpTextOpen: this.props.openHelpText === "Kjønn-A",
            },
            {
              text: <Translate nb="Kvinner og menn" nn="nynorsk" />,
              selected: kjønn === "KM",
              valueKey: "KM",
              helptext: (
                <Translate
                  nb="Viser tall beregnet på grunnlag av kvinner og menn hver for seg."
                  nn="nynorsk"
                />
              ),
              onHelpTextClick: open =>
                this.props.onHelpTextClick(open, "Kjønn-KM"),
              helpTextOpen: this.props.openHelpText === "Kjønn-KM",
            },
          ]}
          name="Kjønn"
          onChange={event => this.props.onFilterClicked(event, "Kjønn")}
        />
      </ul>
    );
  }
}

export default HeaderModalKjønn;
