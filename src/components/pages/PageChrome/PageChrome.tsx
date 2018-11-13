import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import SecondHeader from "./SecondHeader";
import TranslateContext from "../../app/TranslateContext";

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
            <SecondHeader />
            {this.props.children}
            {/* <Footer /> */}
          </div>
        )}
      </TranslateContext.Consumer>
    );
  }
}

export default PageChrome;
