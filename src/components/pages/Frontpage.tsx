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

class Frontpage extends React.Component<ScreenSizeProps> {
  public render() {
    const { innerWidth } = this.props;
    return (
      <PageChrome>
        <h1 className={`${styles.frontpage_header}`}>
          <Translate nb="Jeg vil sammenligne..." />
        </h1>
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
      </PageChrome>
    );
  }
}

export default num_compare_sizing(Frontpage);
