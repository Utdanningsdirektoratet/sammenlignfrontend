import * as React from "react";

import PageChrome from "./PageChrome/PageChrome";

import styles from "./Frontpage.module.scss";
import SearchBox from "../ui/SearchBox";
import Translate from "../app/Translate";
import Button from "../ui/Button";
import { num_compare_sizing, ScreenSizeProps } from "../utils/NumCompareSizing";
import { Innholdstype } from "../../data/ApiTypes";
import { MIN_DESKTOP_PX } from "../../util/Constants";


// testing start 
import AlphabeticOverviewPage from "./AlphabeticOverviewPage";
import TestButton from "./TestButton";
// testing end 

type Props = {
  innholdstype?: Innholdstype;
};

class Frontpage extends React.Component<Props & ScreenSizeProps> {

  handleClick = (kake: any) => {
    console.log("hei");
  }

  getFrontpageOptions = () => {
    if (!this.props.innholdstype) {
      return (
        <div className={`${styles.frontpage_options}`}>
          {/* <Button to="/liste/yrke" type="light"> */}
          {/* <Button to="" type="light">
            {innerWidth < MIN_DESKTOP_PX ? (
              <Translate nb="Yrker" />
            ) : (
                <Translate nb="Se oversikt over alle yrker" />
              )}
          </Button> */}
          <TestButton handleClick={() => this.handleClick()} />
          <Button to="/liste/utdanning" type="light">
            {innerWidth < MIN_DESKTOP_PX ? (
              <Translate nb="Utdanninger" />
            ) : (
                <Translate nb="Se oversikt over alle utdanninger" />
              )}
          </Button>
          <SearchBox
            className={`${styles.frontpage_options_searchbox}`}
            focusOnMount={innerWidth >= MIN_DESKTOP_PX}
          />
        </div>
      );
    } else {
      switch (this.props.innholdstype) {
        case "yrke":
          return (
            <div className={`${styles.frontpage_options}`}>
              <SearchBox
                className={`${styles.frontpage_options_searchbox}`}
                innholdstype={this.props.innholdstype}
                focusOnMount={innerWidth >= MIN_DESKTOP_PX}
              />
              <Button to="/liste/yrke" type="light">
                {innerWidth < MIN_DESKTOP_PX ? (
                  <Translate nb="Yrker" />
                ) : (
                    <Translate nb="Se oversikt over alle yrker" />
                  )}
              </Button>
              <Button to="/sammenligne/utdanning" type="light" selected>
                {innerWidth < MIN_DESKTOP_PX ? (
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
                innholdstype={this.props.innholdstype}
                focusOnMount={innerWidth >= MIN_DESKTOP_PX}
              />
              <Button to="/liste/utdanning" type="light">
                {innerWidth < MIN_DESKTOP_PX ? (
                  <Translate nb="Utdanninger" />
                ) : (
                    <Translate nb="Se oversikt over alle utdanninger" />
                  )}
              </Button>
              <Button to="/sammenligne/yrke" type="light" selected>
                {innerWidth < MIN_DESKTOP_PX ? (
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
              <p>mine muligheter</p>
            )}
        </h1>
        {this.getFrontpageOptions()}
      </PageChrome>
    );
  }
}

export default num_compare_sizing<Props>(Frontpage);
