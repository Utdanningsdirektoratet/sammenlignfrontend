import React, { Component } from "react";

import { with_app_state, AppStateProps } from "./AppContext";
import { setUrlState } from "../../util/urlState";

class SyncUrlState extends Component<AppStateProps> {
  componentDidMount() {
    if (!window.location.hash) setUrlState(this.props.appState.selected_uno_id);
  }
  render() {
    return null;
  }
}

export default with_app_state(SyncUrlState);
