import * as React from "react";

import PageChrome from "./PageChrome/PageChrome";

import styles from "./Frontpage.module.scss";
import SearchBox from "../ui/SearchBox";
import Translate from "../app/Translate";
import Button from "../ui/Button";
import { num_compare_sizing, ScreenSizeProps } from "../utils/NumCompareSizing";
import { Innholdstype } from "../../data/ApiTypes";
import { MIN_DESKTOP_PX } from "../../util/Constants";

import { Visualization } from "job-market-visuals"

type Props = {
  innholdstype?: Innholdstype;
};

class Frontpage extends React.Component<Props & ScreenSizeProps> {
  getFrontpageOptions = () => {
    console.log(styles);
    if (!this.props.innholdstype) {
      return (
        <div>
          <div className={`${styles.frontpage_options}`}>

            <Button to="/liste/yrke" type="light">
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Yrker" />
              ) : (
                  <Translate nb="yrker" />
                )}
            </Button>
            <Button to="/liste/utdanning" type="light">
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Utdanninger" />
              ) : (
                  <Translate nb="utdanninger" />
                )}
            </Button>
          </div>
          <div className={`${styles.frontpage_searchcontainer}`}>
            <SearchBox
              className={`${styles.frontpage_options_searchbox}`}
              focusOnMount={innerWidth >= MIN_DESKTOP_PX} />
          </div>
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
                    <Translate nb="yrker" />
                  )}
              </Button>
              <Button to="/sammenligne/utdanning" type="light" selected>
                {innerWidth < MIN_DESKTOP_PX ? (
                  <Translate nb="Utdanninger" />
                ) : (
                    <Translate nb="utdanninger" />
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
                    <Translate nb="utdanninger" />
                  )}
              </Button>
              <Button to="/sammenligne/yrke" type="light" selected>
                {innerWidth < MIN_DESKTOP_PX ? (
                  <Translate nb="Yrker" />
                ) : (
                    <Translate nb="yrker" />
                  )}
              </Button>
            </div>
          );
      }
    }
  };

  public render() {
    const { innerWidth, innholdstype } = this.props;
    let isDesk = innerWidth >= MIN_DESKTOP_PX ? `${styles.frontpage_undertitle}` : "";
    return (
      <PageChrome>
        <Visualization
          unoId="u_bioingeniorfag"
          limit={8}
          disaggregatedBy={["antall_offentlig", "antall_privat", "antall_ukjent_sektor"]}
          disaggregateLabels={["Offentlig", "Privat", "Ukjent sektor"]}
        />
        <Visualization
          unoId="u_bioingeniorfag"
          limit={8}
          disaggregatedBy={["antall_40", "over_40"]}
          disaggregateLabels={["under 40", "Over 40"]}
        />
        <Visualization
          unoId="u_bioingeniorfag"
          limit={8}
          disaggregatedBy={["antall_13", "antall_710", "other_experience"]}
          disaggregateLabels={["1-3 years", "7-10 years", "Other"]}
          layout={"tree"}
        />
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
              <p className={`${isDesk}`}>mine muligheter</p>
            )}
        </h1>
        {this.getFrontpageOptions()}
      </PageChrome>
    );
  }
}

export default num_compare_sizing<Props>(Frontpage);
