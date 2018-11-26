import React from "react";
import styles from "./Vanligeyrker.module.scss";

type Props = {
  yrker: Array<{ id: number; title: string; percentage: number }>;
  yrkerShown: number;
  onLinkClicked: Function;
};

class Vanligeyrker extends React.Component<Props> {
  public render() {
    const { yrker, yrkerShown, onLinkClicked } = this.props;
    const vanligeYrker = yrker.slice(0, yrkerShown).map(yrke => {
      return (
        <div className={`${styles.vanligeyrker_container_yrke}`} key={yrke.id}>
          <div className={`${styles.vanligeyrker_container_yrke__title}`}>
            {yrke.title}
          </div>
          <div
            className={`${styles.vanligeyrker_container_yrke__bar}`}
            style={{ width: `${yrke.percentage}%` }}
          />
        </div>
      );
    });

    const link =
      yrker.length > yrkerShown ? (
        <div
          className={`${styles.vanligeyrker_container_link}`}
          onClick={() => onLinkClicked()}
        >
          Se flere yrker
        </div>
      ) : yrker.length === yrkerShown ? (
        <div
          className={`${styles.vanligeyrker_container_link}`}
          onClick={() => onLinkClicked()}
        >
          Se færre yrker
        </div>
      ) : (
        <div />
      );

    return (
      <div className={`${styles.vanligeyrker_container}`}>
        {vanligeYrker}
        {link}
      </div>
    );
  }
}

export default Vanligeyrker;
