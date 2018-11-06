import React from "react";
import "./Vanligeyrker.scss";

type Props = {
  yrker: Array<{ id: number, title: string; percentage: number }>;
  yrkerShown: number;
  onLinkClicked: Function;
};

class Vanligeyrker extends React.Component<Props> {
  public render() {
    const { yrker, yrkerShown, onLinkClicked } = this.props;
    const vanligeYrker = yrker.slice(0, yrkerShown).map(yrke => {
      return (
        <div className="vanligeyrker_container-yrke" key={yrke.id}>
          <div className="vanligeyrker_container-yrke--title">{yrke.title}</div>
          <div
            className="vanligeyrker_container-yrke--bar"
            style={{ width: `${yrke.percentage}%` }}
          />
        </div>
      );
    });

    const link =
      yrker.length > yrkerShown ? (
        <div className="vanligeyrker_container-link"
          onClick={() => onLinkClicked()}>
          Se flere yrker
        </div>
      ) : yrker.length === yrkerShown ? (
        <div className="vanligeyrker_container-link"
          onClick={() => onLinkClicked()}>
          Se færre yrker
        </div>
      ) : (
        <div />
      );

    return (
      <div className="vanligeyrker_container">
        {vanligeYrker}
        {link}
      </div>
    );
  }
}

export default Vanligeyrker;
