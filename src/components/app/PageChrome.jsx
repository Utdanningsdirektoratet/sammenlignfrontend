import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";

//import './PageChrome.css'

class PageChrome extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  };
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default PageChrome;
