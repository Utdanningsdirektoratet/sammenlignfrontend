import React, { Component } from "react";
import { Innholdstype, SuggestElement } from "../../data/ApiTypes";

import Translate from "../app/Translate";
import { Redirect } from "react-router";
import { with_app_state, AppStateProps } from "../app/AppContext";
import SearchBoxInternal from "./SearchBoxInternal";

type Props = {
  innholdstype?: Innholdstype;
  className?: string;
  placeholder?: string;
  onUnoIdClick?: (uno_id: string) => void;
  inlineSuggestions?: boolean;
  focusOnMount?: boolean;
};

type State = {
  redirect: boolean;
};

class SearchBox extends Component<Props & AppStateProps, State> {
  state: State = {
    redirect: false,
  };
  inputRef = React.createRef<HTMLInputElement>();

  componentDidMount = () => {
    if (this.inputRef.current && this.props.focusOnMount)
      this.inputRef.current.focus();
  };

  handleUnoIdClick = (uno_id: string) => {
    if (uno_id) {
      if (this.props.onUnoIdClick) {
        this.props.onUnoIdClick(uno_id);
        return;
      }
      this.setState({
        redirect: !this.props.innholdstype,
      });
      this.props.appState.toggleUnoId(uno_id);
    }
  };
  render() {
    const { redirect } = this.state;
    const {
      appState: { selected_uno_id },
      innholdstype,
      className,
      placeholder,
      inlineSuggestions,
      focusOnMount,
    } = this.props;
    if (redirect) {
      return (
        <Redirect
          push={true}
          to={
            selected_uno_id[selected_uno_id.length - 1][0] == "u"
              ? "sammenligne/utdanning"
              : "sammenligne/yrke"
          }
        />
      );
    }
    return (
      <SearchBoxInternal
        innholdstype={innholdstype}
        className={className}
        inlineSuggestions={inlineSuggestions}
        onUnoIdClick={this.handleUnoIdClick}
        placeholder={placeholder}
        inputRef={this.inputRef}
        hideUnoIds={selected_uno_id}
      />
    );
  }
}

export default with_app_state<Props>(SearchBox);
