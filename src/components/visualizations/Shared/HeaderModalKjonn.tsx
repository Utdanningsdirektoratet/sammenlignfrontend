import React, { Component } from "react";
import Translate from "../../app/Translate";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import { Kjønn } from "../../../data/ApiTypes";
import styles from "../Shared/VisualizationFilterHeader.module.scss";

type Props = {
  kjønn: Kjønn;
  onFilterClicked: (event: any, key: string) => void;
  showHelpText?: boolean;
  showHeaders?: boolean;
};

class HeaderModalKjønn extends Component<Props> {
  render() {
    const { kjønn, onFilterClicked, showHelpText, showHeaders } = this.props;
    return (
      <ul>
        {showHeaders ? (
          <div
            className={
              styles.visualizationheader_container_modal_filters_header
            }
          >
            <Translate nb="Kjønn" />
          </div>
        ) : null}
        <RadioButtonGroup
          group={[
            {
              text: <Translate nb="Alle" />,
              selected: kjønn === "A",
              valueKey: "A",
              helptext: showHelpText ? (
                <Translate nb="Viser tall beregnet på grunnlag av både kvinner og menn." />
              ) : (
                undefined
              ),
            },
            {
              text: <Translate nb="Kvinner / menn" />,
              selected: kjønn === "KM",
              valueKey: "KM",
              helptext: showHelpText ? (
                <Translate nb="Viser tall beregnet på grunnlag av kvinner og menn hver for seg." />
              ) : (
                undefined
              ),
            },
          ]}
          onChange={event => onFilterClicked(event, "Kjønn")}
        />
      </ul>
    );
  }
}

export default HeaderModalKjønn;
