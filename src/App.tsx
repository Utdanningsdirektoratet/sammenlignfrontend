import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styles from "./App.module.css";
import AlphabeticOverviewPage from "./components/pages/AlphabeticOverviewPage";
import { TranslateRoot } from "./components/app/TranslateContext";
import AppContext, { AppState } from "./components/app/AppContext";
import ComparisonPage from "./components/pages/ComparisonPage";
import Frontpage from "./components/pages/Frontpage";
import { getUrlState, parseUrl, setUrlState } from "./util/urlState";
import D3TestPage from "./components/pages/D3TestPage";
import SearchBoxPage from "./components/pages/AlphabeticComparisonPage/SearchPage";
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
      toggleUnoId: this.toggleSelection,
      selected_uno_id: getUrlState(), // Somewhat ugly to do side effects in constructor, but we really need this before rendering
      selected_interests: [],
      toggleInterest: this.toggleInterest,
      clearInterest: this.clearInterest,
    };
    window.addEventListener("hashchange", this.hashChangeListener);
  }
  hashChangeListener = (e: HashChangeEvent) => {
    const urlState = parseUrl(e.newURL);
    const reactState = this.state.selected_uno_id;
    if (
      urlState.length !== reactState.length ||
      urlState.every((_, i) => urlState[i] === reactState[i])
    ) {
      this.setState({ selected_uno_id: urlState });
    }
  };
  toggleSelection = (uno_id: string) => {
    this.setState(prevState => {
      const selected = prevState.selected_uno_id.filter(sel => sel !== uno_id);
      if (selected.length === prevState.selected_uno_id.length) {
        selected.push(uno_id);
      }
      setUrlState(selected);
      return { selected_uno_id: selected };
    });
  };
  toggleInterest = (interest: string) => {
    this.setState(prevState => {
      const interests = prevState.selected_interests.filter(
        sel => sel !== interest
      );
      if (interests.length === prevState.selected_interests.length) {
        interests.push(interest);
      }
      return { selected_interests: interests };
    });
  };
  clearInterest = () => {
    this.setState({ selected_interests: [] });
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
              <Route path="/d3test" render={D3TestPage} />
              <Route path="/search" render={SearchBoxPage} />
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
