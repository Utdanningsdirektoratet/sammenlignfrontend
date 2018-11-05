import React, { PureComponent } from "react";
import PropTypes from "prop-types";

//import './ErrorBoundry.css'

class ErrorBoundry extends PureComponent {
  state = { error: true };
  componentDidCatch(error) {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      return (
        <>
          <h1>Noe feilet</h1>
          <p>Prøv å laste siden på nytt</p>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
