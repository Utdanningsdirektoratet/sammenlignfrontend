import React, { PureComponent } from "react";
import LanguagePicker from "./LanguagePicker";

//import './Header.css'

class Header extends PureComponent {
  render() {
    return (
      <div className="Header">
        <LanguagePicker />
      </div>
    );
  }
}

export default Header;
