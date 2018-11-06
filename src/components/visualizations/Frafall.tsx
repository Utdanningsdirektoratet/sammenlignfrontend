import React from "react";
import "./Frafall.scss";
import {ReactComponent as FrafallThumbsup} from "./Frafall-thumbsup.svg";
import {ReactComponent as FrafallThumbsdown} from "./Frafall-thumbsdown.svg";

type Props = {
  value: number;
};

class Frafall extends React.Component<Props> {
  public render() {
    const { value } = this.props;
    const faceIcons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const negIcons = faceIcons.slice(0, Math.round(value / 10)).map(i => {
      return FrafallThumbsup;
    });
    const posIcons = faceIcons.slice(0, Math.round(10 - value / 10)).map(i => {
      return FrafallThumbsdown;
    });
    const allIcons = negIcons.concat(posIcons);

    return (
      <div className="visualization_container">
        <div className="frafall_container">
          <div className="frafall_container-icons">
            <div className="frafall_container-icons--firstline">
              {allIcons.slice(0, 5).map(I => {
                return <I className="frafall_container-icons--icon" />;
              })}
            </div>
            <div className="frafall_container-icons--secondline">
              {allIcons.slice(5, 10).map(I => {
                return <I className="frafall_container-icons--icon" />;
              })}
            </div>
          </div>
          <div className="frafall_container-percentage">{value} %</div>
        </div>
      </div>
    );
  }
}

export default Frafall;
