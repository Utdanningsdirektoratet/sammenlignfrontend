import * as React from "react";

import PageChrome from "./PageChrome/PageChrome";
import CompareSelection from "./Shared/CompareSelection";

import styles from "./Frontpage.module.scss";

class Frontpage extends React.Component {
  public render() {
    return (
      <PageChrome>
        <main>
          <CompareSelection />
        </main>
      </PageChrome>
    );
  }
}

export default Frontpage;
