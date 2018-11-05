import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import AlphabeticOverviewPage from "./components/pages/AlphabeticOverviewPage";
import ComparisonPage from "./components/pages/ComparisonPage";
import Frontpage from "./components/pages/Frontpage";
// import ErrorBoundry from "./components/app/ErrorBoundry";

class App extends Component {
  render() {
    return (
      // <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Frontpage} />
          <Route path="/sammenligne" component={ComparisonPage} />
          <Route path="/:area" component={AlphabeticOverviewPage} />
        </Switch>
      </BrowserRouter>
      // </ErrorBoundry>
    );
  }
}

export default App;
