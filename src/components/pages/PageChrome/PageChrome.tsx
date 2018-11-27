import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import SecondHeader from "./SecondHeader";
import { getLang } from "../../app/Translate";
import ErrorModal from "./ErrorModal";

//import './PageChrome.css'

class PageChrome extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <div lang={getLang()}>
        <Header />
        <SecondHeader />
        {this.props.children}
        {/* <Footer /> */}
        <ErrorModal />
      </div>
    );
  }
}

export default PageChrome;
