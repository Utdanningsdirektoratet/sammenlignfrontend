import React, { Component } from "react";
import Translate from "../../app/Translate";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { Kjønn } from "../../../data/ApiTypes";

type Props = {
  kjønn: Kjønn;
  onFilterClicked: (event: any, key: string) => void;
};

class HeaderModalKjønn extends React.Component<Props> {
  render() {
    const { kjønn, onFilterClicked } = this.props;
    return (
      <ul>
        <RadioButtonGroup
          group={[
            {
              text: <Translate nb="Alle" />,
              selected: kjønn === "A",
              valueKey: "A",
              helptext: (
                <Translate nb="Viser tall beregnet på grunnlag av både kvinner og menn." />
              ),
            },
            {
              text: <Translate nb="Kvinner og menn" />,
              selected: kjønn === "KM",
              valueKey: "KM",
              helptext: (
                <Translate nb="Viser tall beregnet på grunnlag av kvinner og menn hver for seg." />
              ),
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
