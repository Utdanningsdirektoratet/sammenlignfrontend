import * as React from "react";

import PageChrome from "../app/PageChrome";
import CompareSelection from "../app/CompareSelection";

import styles from "./Frontpage.module.scss";

class Frontpage extends React.Component {
  public render() {
    return (
      <PageChrome>
        <main>
          <CompareSelection innholdstype={"..."} />
        </main>
      </PageChrome>
    );
  }
}

export default Frontpage;
