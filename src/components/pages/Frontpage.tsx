import * as React from "react";

import PageChrome from "./PageChrome/PageChrome";
import CompareSelection from "./Shared/CompareSelection";

import styles from "./Frontpage.module.scss";
import SearchBox from "./AlphabeticComparisonPage/SearchBox";
import Translate from "../app/Translate";
import { Link } from "react-router-dom";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import Button from "../ui/Button";
import { num_compare_sizing, ScreenSizeProps } from "../utils/NumCompareSizing";
import { Innholdstype } from "../../data/ApiTypes";

type Props = {
  innholdstype?: Innholdstype;
};

class Frontpage extends React.Component<Props & ScreenSizeProps> {
  getFrontpageOptions = () => {
    if (!this.props.innholdstype) {
      return (
        <div className={`${styles.frontpage_options}`}>
          <SearchBox
            className={`${styles.frontpage_options_searchbox}`}
            clearOnBlur={true}
          />
          <Button to="/liste/yrke" type="light">
            {innerWidth < 576 ? (
              <Translate nb="Yrker" />
            ) : (
              <Translate nb="Se oversikt over alle yrker" />
            )}
          </Button>
          <Button to="/liste/utdanning" type="light">
            {innerWidth < 576 ? (
              <Translate nb="Utdanninger" />
            ) : (
              <Translate nb="Se oversikt over alle utdanninger" />
            )}
          </Button>
        </div>
      );
    } else {
      switch (this.props.innholdstype) {
        case "yrke":
          return (
            <div className={`${styles.frontpage_options}`}>
              <SearchBox
                className={`${styles.frontpage_options_searchbox}`}
                clearOnBlur={true}
                innholdstype={this.props.innholdstype}
              />
              <Button to="/liste/yrke" type="light">
                {innerWidth < 576 ? (
                  <Translate nb="Yrker" />
                ) : (
                  <Translate nb="Se oversikt over alle yrker" />
                )}
              </Button>
              <Button to="/sammenligne/utdanning" type="light" selected>
                {innerWidth < 576 ? (
                  <Translate nb="Utdanninger" />
                ) : (
                  <Translate nb="Bytt til å se på utdanninger" />
                )}
              </Button>
            </div>
          );
        case "utdanning":
          return (
            <div className={`${styles.frontpage_options}`}>
              <SearchBox
                className={`${styles.frontpage_options_searchbox}`}
                clearOnBlur={true}
                innholdstype={this.props.innholdstype}
              />
              <Button to="/liste/utdanning" type="light">
                {innerWidth < 576 ? (
                  <Translate nb="Utdanninger" />
                ) : (
                  <Translate nb="Se oversikt over alle utdanninger" />
                )}
              </Button>
              <Button to="/sammenligne/yrke" type="light" selected>
                {innerWidth < 576 ? (
                  <Translate nb="Yrker" />
                ) : (
                  <Translate nb="Bytt til å se på yrker" />
                )}
              </Button>
            </div>
          );
      }
    }
  };

  public render() {
    const { innerWidth, innholdstype } = this.props;
    return (
      <PageChrome>
        <h1 className={`${styles.frontpage_header}`}>
          <Translate nb="Jeg vil sammenligne" />{" "}
          {innholdstype ? (
            innholdstype === "utdanning" ? (
              <Translate nb="utdanninger" />
            ) : innholdstype === "yrke" ? (
              <Translate nb="yrker" />
            ) : (
              innholdstype
            )
          ) : (
            "..."
          )}
        </h1>
        {this.getFrontpageOptions()}
      </PageChrome>
    );
  }
}

export default num_compare_sizing<Props>(Frontpage);
