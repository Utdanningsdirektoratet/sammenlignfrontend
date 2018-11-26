import React, { Component, HTMLAttributes } from "react";

type Props = {
  children: any;
  onOutsideClick: () => void;
};

class ClickOutsideListener extends Component<
  Props & HTMLAttributes<HTMLDivElement>
> {
  insideRef = React.createRef<HTMLDivElement>();
  componentDidMount() {
    document.addEventListener("click", this.handleOutsideEvent, true);
    document.addEventListener("focus", this.handleOutsideEvent, true);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideEvent, true);
    document.removeEventListener("focus", this.handleOutsideEvent, true);
  }
  handleOutsideEvent = (e: any) => {
    if (
      !(this.insideRef.current && this.insideRef.current.contains(e.target))
    ) {
      this.props.onOutsideClick();
    }
  };
  render() {
    const { children, ...props } = this.props;
    return (
      <div ref={this.insideRef} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export default ClickOutsideListener;
