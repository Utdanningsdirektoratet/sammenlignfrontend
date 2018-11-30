import * as React from "react";

import PageChrome from "./PageChrome/PageChrome";
import CompareSelection from "./Shared/CompareSelection";

import styles from "./Frontpage.module.scss";
import SearchBox from "./AlphabeticComparisonPage/SearchBox";
import Translate from "../app/Translate";
import { Link } from "react-router-dom";
import ComparisonRow from "./ComparisonPage/ComparisonRow";
import Button from "../ui/Button";

class Frontpage extends React.Component {
  public render() {
    return (
      <PageChrome>
        <h1 className={`${styles.frontpage_header}`}>
          <Translate nb="Jeg vil sammenligne..." />
        </h1>
        <div className={`${styles.frontpage_options}`}>
          <SearchBox />
          <Button to="/liste/yrke" type="light">
            <Translate nb="Se oversikt over alle yrker" />
          </Button>
          <Button to="/liste/utdanning" type="light">
            <Translate nb="Se oversikt over alle utdanninger" />
          </Button>
        </div>
      </PageChrome>
    );
  }
}

export default Frontpage;
