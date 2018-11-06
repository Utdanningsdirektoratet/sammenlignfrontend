import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import AlphabeticOverviewPage from "./components/pages/AlphabeticOverviewPage";
import { TranslateRoot } from "./components/app/TranslateContext";
import AppContext, {
  AppState,
  defaultAppState,
} from "./components/app/AppContext";
import ComparisonPage from "./components/pages/ComparisonPage";
import Frontpage from "./components/pages/Frontpage";
// import ErrorBoundry from "./components/app/ErrorBoundry";

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultAppState,
      toggleSelection: this.toggleSelection,
    };
  }
  componentDidMount() {
    // window.addEventListener("hashchange", this.updateUrlState);
  }
  componentWillUnmount() {
    // window.removeEventListener("hashchange", this.updateUrlState);
  }
  toggleSelection = (typ: string) => {
    this.setState(prevState => {
      const selected = prevState.selected.filter(sel => sel !== typ);
      if (selected.length === prevState.selected.length) {
        selected.push(typ);
      }
      return { selected };
    });
  };

  render() {
    return (
      // <ErrorBoundry>
      <AppContext.Provider value={this.state}>
        <TranslateRoot>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Frontpage} />
              <Route path="/sammenligne" component={ComparisonPage} />
              <Route path="/:area" component={AlphabeticOverviewPage} />
            </Switch>
          </BrowserRouter>
        </TranslateRoot>
      </AppContext.Provider>
      // </ErrorBoundry>
    );
  }
}

export default App;
