import React, { Component } from "react";

interface State {
  innerWidth: number;
  innerHeight: number;
}

export type ScreenSizeProps = {
  innerWidth: number;
  innerHeight: number;
};

export function num_compare_sizing<P>(
  WrappedComponent: React.ComponentClass<any> | any
) {
  return (class GetScreenSize extends Component<State> {
    constructor(props: any) {
      super(props);
    }

    state: State = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };

    componentDidMount() {
      window.addEventListener("resize", this.screenResizeListener);
      this.screenResizeListener;
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.screenResizeListener);
    }

    screenResizeListener = (e: UIEvent) => {
      this.setState({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    render() {
      return (
        <WrappedComponent
          innerWidth={this.state.innerWidth}
          innerHeight={this.state.innerHeight}
          {...this.props}
        />
      );
    }
  } as any) as React.ComponentClass<P>;
}
