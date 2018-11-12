import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

import AlphabeticOverviewPage from "./components/pages/AlphabeticOverviewPage";
import { TranslateRoot } from "./components/app/TranslateContext";
import AppContext, {
  AppState,
  defaultAppState,
} from "./components/app/AppContext";
import ComparisonPage from "./components/pages/ComparisonPage";
import Frontpage from "./components/pages/Frontpage";
import { getUrlState, parseUrl, setUrlState } from "./util/urlState";
// import ErrorBoundry from "./components/app/ErrorBoundry";

function render(Component: React.ComponentClass) {
  // This wrapper rendering is required because to ensure a full component unmount/mount cycle
  // when clicking on links. For some reason React-router does not provide this easily
  return (props: any) => <Component {...props} key={props.location.pathname} />;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...defaultAppState,
      toggleSelection: this.toggleSelection,
    };
  }
  componentDidMount() {
    const urlSelected = getUrlState();
    if (urlSelected) {
      this.setState({ selected: urlSelected });
    }
    window.addEventListener("hashchange", this.hashChangeListener);
  }
  hashChangeListener = (e: HashChangeEvent) => {
    const urlState = parseUrl(e.newURL);
    const reactState = this.state.selected;
    if (
      urlState.length !== reactState.length ||
      urlState.every((_, i) => urlState[i] === reactState[i])
    ) {
      this.setState({ selected: urlState });
    }
  };
  toggleSelection = (typ: string) => {
    this.setState(prevState => {
      const selected = prevState.selected.filter(sel => sel !== typ);
      if (selected.length === prevState.selected.length) {
        selected.push(typ);
      }
      setUrlState(selected);
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
              <Route path="/" exact={true} render={render(Frontpage)} />
              <Route
                path="/sammenligne/:innholdstype"
                render={render(ComparisonPage)}
              />
              <Route
                path="/:innholdstype"
                render={render(AlphabeticOverviewPage)}
              />
            </Switch>
          </BrowserRouter>
        </TranslateRoot>
      </AppContext.Provider>
      // </ErrorBoundry>
    );
  }
}

export default App;
