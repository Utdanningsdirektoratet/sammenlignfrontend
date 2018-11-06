import * as React from "react";
import "./Vanligeyrker.scss";
import "./Visualization.scss";
import Vanligeyrker from "../visualizations/Vanligeyrker";

type Props = {
  yrker: Array<{ title: string; percentage: number; info: any }>;
};

type MyState = {
  yrkerShown: number;
};

class VanligeYrkerYrke extends React.Component<Props, MyState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      yrkerShown: 4
    };
  }

  public handleLinkClicked() {
    if (this.state.yrkerShown === this.props.yrker.length) {
      this.setState({ yrkerShown: 4 });
    } else {
      const toShow = this.state.yrkerShown * 2;
      if (this.props.yrker.length <= toShow) {
        this.setState({ yrkerShown: this.props.yrker.length });
      } else {
        this.setState({ yrkerShown: toShow });
      }
    }
  }

  public render() {
    const { yrker } = this.props;

    return (
      <div className="visualization_container">
        <Vanligeyrker
          yrker={yrker}
          yrkerShown={this.state.yrkerShown}
          onLinkClicked={() => this.handleLinkClicked()}
        />
      </div>
    );
  }
}

export default VanligeYrkerYrke;
