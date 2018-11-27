import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactModal from "react-modal";

import styles from "./App.module.css";
import AlphabeticOverviewPage from "./components/pages/AlphabeticOverviewPage";
import Translate, { TranslateRoot, getLang } from "./components/app/Translate";
import AppContext, { AppState } from "./components/app/AppContext";
import ComparisonPage from "./components/pages/ComparisonPage";
import Frontpage from "./components/pages/Frontpage";
import { getUrlState, parseUrl, setUrlState } from "./util/urlState";
import D3TestPage from "./components/pages/D3TestPage";
import SearchBoxPage from "./components/pages/AlphabeticComparisonPage/SearchPage";
import Widget from "./components/widget/Widget";
import { NUM_COMPARES_MOBILE, NUM_COMPARES_DESKTOP } from "./data/config";
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
      toggleInterests: this.toggleInterests,
      clearInterest: this.clearInterest,
      allowMoreCompares: this.allowMoreCompares,
      errorModalContent: undefined,
      errorModalClear: this.errorModalClear,
    };
    window.addEventListener("hashchange", this.hashChangeListener);
  }
  hashChangeListener = (e: HashChangeEvent) => {
    const urlState = parseUrl(e.newURL);
    const reactState = this.state.selected_uno_id;
    if (
      urlState.length !== reactState.length ||
      !urlState.every((_, i) => urlState[i] === reactState[i])
    ) {
      this.setState({ selected_uno_id: urlState });
    }
  };

  allowMoreCompares = (length: number) => {
    const innerWidth = window.innerWidth;

    if (innerWidth < 768) {
      return length < NUM_COMPARES_MOBILE;
    } else if (innerWidth < 992) {
      return length < NUM_COMPARES_DESKTOP;
    } else if (innerWidth < 1200) {
      return length < NUM_COMPARES_DESKTOP;
    } else {
      return length < NUM_COMPARES_DESKTOP;
    }
  };
  errorModalClear = () => {
    this.setState({ errorModalContent: undefined });
  };
  toggleSelection = (uno_id: string) => {
    this.setState(prevState => {
      const selected = prevState.selected_uno_id.filter(sel => sel !== uno_id);
      const selectedInnholdstype = selected.filter(
        sel => sel[0].toLowerCase() === uno_id[0].toLowerCase()
      );

      if (
        selected.length === prevState.selected_uno_id.length &&
        this.allowMoreCompares(selectedInnholdstype.length)
      ) {
        selected.push(uno_id);
      } else if (
        selected.length === prevState.selected_uno_id.length &&
        !this.allowMoreCompares(selectedInnholdstype.length)
      ) {
        return {
          selected_uno_id: prevState.selected_uno_id,
          errorModalContent: (
            <div>
              <Translate nb="Du kan sammenligne max 5 stk samtidig" />
            </div>
          ),
        };
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
  toggleInterests = (interests: string[]) => {
    this.setState(prevState => {
      let i: string[] = [];
      if (prevState.selected_interests.length !== interests.length)
        i = interests;

      return { selected_interests: i };
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
              {/* Test route for å utvikle og vise frem widgets, replace before production */}
              <Route
                path="/widget/:widget_name/:uno_id"
                render={props => (
                  <Widget
                    lang={getLang()}
                    widget_name={props.match.params.widget_name}
                    uno_id={props.match.params.uno_id}
                  />
                )}
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
