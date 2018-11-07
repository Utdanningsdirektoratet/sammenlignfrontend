import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TranslateContext from "./TranslateContext";

//import './PageChrome.css'

class PageChrome extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <TranslateContext.Consumer>
        {transContext => (
          <div lang={transContext.lang}>
            <Header />
            {this.props.children}
            {/* <Footer /> */}
          </div>
        )}
      </TranslateContext.Consumer>
    );
  }
}

export default PageChrome;
