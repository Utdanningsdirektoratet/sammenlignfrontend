import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.scss";

import { Innholdstype } from "../../../data/ApiTypes";
import Translate from "../../app/Translate";
import SearchBox from "../AlphabeticComparisonPage/SearchBox";
import Button from "../../ui/Button";

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
            />
            <Button to={"/liste/yrke"} type="light">
              <Translate nb="Se oversikt over alle yrker" />
            </Button>
            <Button to={"/sammenligne/utdanning"} type="light" selected>
              <Translate nb="Bytt til å se på utdanninger" />
            </Button>
          </div>
        );
      case "utdanning":
        return (
          <div className={`${styles.breadcrumb}`}>
            <SearchBox
              innholdstype={innholdstype}
              className={`${styles.SearchBox}`}
            />
            <Button to={"/liste/utdanning"} type="light">
              <Translate nb="Se oversikt over alle utdanninger" />
            </Button>
            <Button to={"/sammenligne/yrke"} type="light" selected>
              <Translate nb="Bytt til å se på yrker" />
            </Button>
          </div>
        );
    }
  }
}
export default Breadcrumb;
