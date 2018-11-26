import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import {
  Fullført,
  Visning,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import Translate from "../../app/Translate";
import styles from "../Shared/VisualizationHeader.module.scss";
import Checkbox from "../../defaultComponents/Checkbox";
import RadioButtonGroup from "../../defaultComponents/RadioButtonGroup";
import CloseIcon from "../Generic/CloseIcon";
import HeaderModalKjonn from "../Shared/HeaderModalKjonn";

export type EntreprenorskapHeaderConfig = {
  Kjønn: Kjønn;
  Fullført: Fullført;
  Visning: Visning;
};

type Props = {
  config: EntreprenorskapHeaderConfig;
  onFilterClicked: (event: any, key: string) => void;
  showHeaders?: boolean;
  showHelpText?: boolean;
  showHeaderHelpText?: boolean;
};

type State = {
  shownHelpText: string;
};

class EntreprenorskapHeaderFilters extends Component<Props, State> {
  state = { shownHelpText: "" };

  onClickHelpText = (type: string) => {
    if (this.state.shownHelpText === type) {
      this.setState({ shownHelpText: "" });
      return;
    }

    this.setState({ shownHelpText: type });
  };

  render() {
    const { Kjønn, Fullført, Visning } = this.props.config;
    const {
      showHelpText,
      showHeaders,
      showHeaderHelpText,
      onFilterClicked,
    } = this.props;

    return (
      <div className={`${styles.visualizationheader_container_modal_filters}`}>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="År etter utdannelse" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("År")}
                >
                  (?)
                  {this.state.shownHelpText === "År" ? (
                    <div
                      className={
                        styles.visualizationheader_container_modal_filters_header_helptext
                      }
                    >
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_content
                        }
                      >
                        <Translate nb="Vis tall på antall som har staret egen virksomhet basert på antall år etter endt utdannelse, eller alle som har staret egen virksomhet." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                      >
                        <CloseIcon
                          unoId=""
                          onClick={() => this.onClickHelpText("")}
                        />
                      </div>
                    </div>
                  ) : null}
                </span>
              ) : null}
            </div>
          ) : null}
          <RadioButtonGroup
            group={[
              {
                text: <Translate nb="7-10 år etter endt utdannelse" />,
                selected: Fullført === "710",
                valueKey: "710",
                helptext: showHelpText ? (
                  <Translate nb="Viser antall som har staret egen virksomhet 7-10 år etter endt utdannelse." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="1-3 år etter endt utdannelse" />,
                selected: Fullført === "13",
                valueKey: "13",
                helptext: showHelpText ? (
                  <Translate nb="Viser antall som har staret egen virksomhet 1-3 år etter endt utdannelse." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Alle" />,
                selected: Fullført === "A",
                valueKey: "A",
                helptext: showHelpText ? (
                  <Translate nb="Viser alle som har staret egen virksomhet." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => onFilterClicked(event, "Fullført")}
          />
        </ul>
        <ul>
          {showHeaders ? (
            <div
              className={
                styles.visualizationheader_container_modal_filters_header
              }
            >
              <Translate nb="Presentasjon" />
              {showHeaderHelpText ? (
                <span
                  className={
                    styles.visualizationheader_container_modal_filters_header_icon
                  }
                  onClick={() => this.onClickHelpText("Presentasjon")}
                >
                  (?)
                  {this.state.shownHelpText === "Presentasjon" ? (
                    <div
                      className={
                        styles.visualizationheader_container_modal_filters_header_helptext
                      }
                    >
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_content
                        }
                      >
                        <Translate nb="Vis tall på antall som har staret egen virksomhet som prosent for andel, eller som tall for antall." />
                      </div>
                      <div
                        className={
                          styles.visualizationheader_container_modal_filters_header_helptext_closeIcon
                        }
                      >
                        <CloseIcon
                          unoId=""
                          onClick={() => this.onClickHelpText("")}
                        />
                      </div>
                    </div>
                  ) : null}
                </span>
              ) : null}
            </div>
          ) : null}
          <RadioButtonGroup
            group={[
              {
                text: <Translate nb="Andel" />,
                selected: Visning === "Andel",
                valueKey: "Andel",
                helptext: showHelpText ? (
                  <Translate nb="Viser andel som har staret egen virksomhet som prosent." />
                ) : (
                  undefined
                ),
              },
              {
                text: <Translate nb="Antall" />,
                selected: Visning === "Antall",
                valueKey: "Antall",
                helptext: showHelpText ? (
                  <Translate nb="Viser antall som har staret egen virksomhet." />
                ) : (
                  undefined
                ),
              },
            ]}
            onChange={event => onFilterClicked(event, "Visning")}
          />
        </ul>
        <HeaderModalKjonn
          kjønn={Kjønn}
          onFilterClicked={onFilterClicked}
          showHelpText={showHelpText}
          showHeaders={showHeaders}
        />
      </div>
    );
  }
}

export default EntreprenorskapHeaderFilters;
