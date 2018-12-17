import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.scss";

import { Innholdstype } from "../../../data/ApiTypes";
import Translate from "../../app/Translate";
import SearchBox from "../../ui/SearchBox";
import Button from "../../ui/Button";
import { num_compare_sizing } from "../../utils/NumCompareSizing";
import { MIN_DESKTOP_PX } from "../../../util/Constants";

type Props = {
  innholdstype: Innholdstype;
};

class Breadcrumb extends Component<Props> {
  render() {
    const { innholdstype } = this.props;
    switch (innholdstype) {
      case "yrke":
        return (
          <div className={`${styles.breadcrumb}`}>
            <SearchBox
              innholdstype={innholdstype}
              className={`${styles.SearchBox}`}
              focusOnMount={innerWidth >= MIN_DESKTOP_PX}
            />

            <Button to={"/liste/yrke"} type="light">
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Oversikt over alle yrker" />
              ) : (
                <Translate nb="Se oversikt over alle yrker" />
              )}
            </Button>
            <Button to={"/sammenligne/utdanning"} type="light" selected>
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Se utdanninger" />
              ) : (
                <Translate nb="Bytt til å se på utdanninger" />
              )}
            </Button>
          </div>
        );
      case "utdanning":
        return (
          <div className={`${styles.breadcrumb}`}>
            <SearchBox
              innholdstype={innholdstype}
              className={`${styles.SearchBox}`}
              focusOnMount={innerWidth >= MIN_DESKTOP_PX}
            />
            <Button to={"/liste/utdanning"} type="light">
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Oversikt over alle utdanninger" />
              ) : (
                <Translate nb="Se oversikt over alle utdanninger" />
              )}
            </Button>
            <Button to={"/sammenligne/yrke"} type="light" selected>
              {innerWidth < MIN_DESKTOP_PX ? (
                <Translate nb="Se yrker" />
              ) : (
                <Translate nb="Bytt til å se på yrker" />
              )}
            </Button>
          </div>
        );
    }
  }
}
export default num_compare_sizing<Props>(Breadcrumb);
