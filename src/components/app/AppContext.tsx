import React, { Component } from "react";

export type AppState = {
  selected: string[];
  toggleSelection: (typ: string) => void;
};

export interface AppStateProps {
  appState: AppState;
}

export const defaultAppState: AppState = {
  selected: [],
  toggleSelection: (typ: string) => {},
};

const AppContext = React.createContext(defaultAppState);

export function with_app_state<P>(WrappedComponent: React.ComponentClass<any>) {
  return (function(props: any) {
    return (
      <AppContext.Consumer>
        {appState => <WrappedComponent appState={appState} {...props} />}
      </AppContext.Consumer>
    );
  } as any) as React.ComponentClass<P>;
}

export default AppContext;
