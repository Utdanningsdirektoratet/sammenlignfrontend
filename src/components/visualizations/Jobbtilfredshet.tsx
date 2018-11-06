import * as React from "react";
import "./Jobbtilfredshet.scss";
import {ReactComponent as JobbtilfredshetSmiley} from "./Jobbtilfredshet-smiley.svg";
import {ReactComponent as JobbtilfredshetSadface} from "./Jobbtilfredshet-sadface.svg";

type Props = {
    value: number;
  };
  
  class Jobbtilfredshet extends React.Component<Props> {      
    public render() {
        const { value } = this.props;
        const icons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const negIcons = icons.slice(0, Math.round(value / 10)).map(i => {
            return JobbtilfredshetSmiley;
        });
        const posIcons = icons.slice(0, Math.round(10 - value / 10)).map(i => {
            return JobbtilfredshetSadface;
        });
        const allIcons = negIcons.concat(posIcons);

        return (
            <div className="visualization_container">
                <div className="jobbtilfredshet_container">
                    <div className="jobbtilfredshet_container-icons">
                        <div className="jobbtilfredshet_container-icons--firstline">
                            {allIcons.slice(0, 5).map(I => {
                                return <I className="jobbtilfredshet_container-icons--icon"/>;
                            })}
                        </div>
                        <div className="jobbtilfredshet_container-icons--secondline">
                            {allIcons.slice(5, 10).map(I => {
                                return <I className="jobbtilfredshet_container-icons--icon"/>;
                            })}
                        </div>
                    </div>
                    <div className="jobbtilfredshet_container-percentage">{value} %</div>
                </div>
            </div>
        );
    }
  }

  
export default Jobbtilfredshet;