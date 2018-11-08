import * as React from "react";
import { Link } from "react-router-dom";

import PageChrome from "../app/PageChrome";
import Translate from "../app/Translate";

import styles from "./Frontpage.module.scss";

class Frontpage extends React.Component {
  public render() {
    return (
      <PageChrome>
        <main>
          <h1>
            <Translate nb="Jeg vil sammenligne" nn="Eg vil sammenligna" />
          </h1>
          <div className={styles.button_row}>
            <Link
              to="/utdanning"
              className={`${styles.btn} ${styles.btn_primary}`}
            >
              <Translate nb="Utdanninger" nn="Utdanningar" />
            </Link>
            <Link to="/yrke" className={`${styles.btn} ${styles.btn_primary}`}>
              Yrker
            </Link>
          </div>
        </main>
      </PageChrome>
    );
  }
}

export default Frontpage;
