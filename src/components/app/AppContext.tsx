import React from "react";
import { Main } from "../../data/ApiTypes";

export type AppState = {
  selected_uno_id: string[];
  toggleUnoId: (uno_id: string) => void;
  selected_interests: string[];
  toggleInterest: (interest: string) => void;
  clearInterest: () => void;
};

export interface AppStateProps {
  appState: AppState;
}

// export const defaultAppState: AppState = {
//   selected: [],
//   toggleSelection: (typ: string) => {},
//   main: {},
//   updateMain: (main: Main) => {},
// };

const AppContext = React.createContext({} as AppState);

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
