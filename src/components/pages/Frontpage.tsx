import * as React from "react";
import { Link } from "react-router-dom";

import PageChrome from "../app/PageChrome";

import "./Frontpage.scss";

class Frontpage extends React.Component {
  public render() {
    return (
      <PageChrome>
        <main>
          <h1>{"Jeg vil sammenligne"}</h1>
          <div className="button-row">
            <Link to="/utdanning" className="btn btn-primary">
              Utdanninger
            </Link>
            <Link to="/yrke" className="btn btn-primary">
              Yrker
            </Link>
          </div>
        </main>
      </PageChrome>
    );
  }
}

export default Frontpage;
