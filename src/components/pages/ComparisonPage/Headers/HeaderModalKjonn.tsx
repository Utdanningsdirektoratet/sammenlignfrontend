import React, { Component } from "react";
import Translate from "../../../app/Translate";
import Checkbox from "../../../defaultComponents/Checkbox";
import { Kjønn } from "../../../../data/ApiTypes";

type Props = {
  kjønn: Kjønn[];
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
        <Checkbox
          text={<Translate nb="Kvinner" nn="nynorsk" />}
          valueKey="K"
          isSelected={kjønn.some((a: Kjønn) => {
            return a === "K";
          })}
          helpText={
            <Translate
              nb="Viser tall beregnet på grunnlag av kvinner."
              nn="nynorsk"
            />
          }
          onHelpTextClick={open => onHelpTextClick(open, "Kjønn-K")}
          helpTextOpen={openHelpText === "Kjønn-K"}
          onChange={event => onFilterClicked(event, "Kjønn")}
        />
        <Checkbox
          text={<Translate nb="Menn" nn="nynorsk" />}
          valueKey="M"
          isSelected={kjønn.some((a: Kjønn) => {
            return a === "M";
          })}
          helpText={
            <Translate
              nb="Viser tall beregnet på grunnlag av menn."
              nn="nynorsk"
            />
          }
          onHelpTextClick={open => onHelpTextClick(open, "Kjønn-M")}
          helpTextOpen={openHelpText === "Kjønn-M"}
          onChange={event => onFilterClicked(event, "Kjønn")}
        />
        <Checkbox
          text={<Translate nb="Begge" nn="nynorsk" />}
          valueKey="A"
          isSelected={kjønn.some((a: Kjønn) => {
            return a === "A";
          })}
          helpText={
            <Translate
              nb="Viser tall beregnet på grunnlag av både kvinner og menn."
              nn="nynorsk"
            />
          }
          onHelpTextClick={open => onHelpTextClick(open, "Kjønn-A")}
          helpTextOpen={openHelpText === "Kjønn-A"}
          onChange={event => onFilterClicked(event, "Kjønn")}
        />
      </ul>
    );
  }
}

export default HeaderModalKjønn;
