import React, { Component } from "react";

import style from "./ScrollToTop.module.scss";
import { ReactComponent as Up } from "../../fontawesome/solid/chevron-up.svg";
import Translate from "../app/Translate";

type State = {
  yOffset: number;
};

type Props = {};

class ScrollToTop extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }
  state: State = {
    yOffset: window.pageYOffset,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.yOffsetListener);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.yOffsetListener);
  }

  yOffsetListener = () => {
    this.setState({ yOffset: window.pageYOffset });
  };

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    let hiddenStyle = this.state.yOffset < 600 ? style.container_hidden : "";

    return (
      <div
        className={`${style.container} ${hiddenStyle}`}
        onClick={this.scrollToTop}
      >
        <div className={`${style.container_text}`}>
          <Translate nb="Til toppen" />
        </div>
        <Up />
      </div>
    );
  }
}

export default ScrollToTop;
