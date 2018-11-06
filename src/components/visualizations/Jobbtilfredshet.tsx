import * as React from "react";
import "./Jobbtilfredshet.scss";

type Props = {
    value: number;
  };
  
  class Jobbtilfredshet extends React.Component<Props> {      
    public render() {
        const { value } = this.props;

        const smiley = (
            <svg id="lnr-smiley" className="jobbtilfredshet_container-icons--icon" viewBox="0 0 1024 1024" width="3em" height="3em">
              <title>smile</title>
              <path className="path1" d="M486.4 1024c-129.922 0-252.067-50.594-343.936-142.464s-142.464-214.014-142.464-343.936c0-129.923 50.595-252.067 142.464-343.936s214.013-142.464 343.936-142.464c129.922 0 252.067 50.595 343.936 142.464s142.464 214.014 142.464 343.936-50.594 252.067-142.464 343.936c-91.869 91.87-214.014 142.464-343.936 142.464zM486.4 102.4c-239.97 0-435.2 195.23-435.2 435.2s195.23 435.2 435.2 435.2 435.2-195.23 435.2-435.2-195.23-435.2-435.2-435.2z" />
              <path className="path2" d="M332.8 409.6c-42.347 0-76.8-34.453-76.8-76.8s34.453-76.8 76.8-76.8 76.8 34.453 76.8 76.8-34.453 76.8-76.8 76.8zM332.8 307.2c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z" />
              <path className="path3" d="M640 409.6c-42.349 0-76.8-34.453-76.8-76.8s34.451-76.8 76.8-76.8 76.8 34.453 76.8 76.8-34.451 76.8-76.8 76.8zM640 307.2c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z" />
              <path className="path4" d="M486.4 870.4c-183.506 0-332.8-149.294-332.8-332.8 0-14.139 11.462-25.6 25.6-25.6s25.6 11.461 25.6 25.6c0 155.275 126.325 281.6 281.6 281.6s281.6-126.325 281.6-281.6c0-14.139 11.461-25.6 25.6-25.6s25.6 11.461 25.6 25.6c0 183.506-149.294 332.8-332.8 332.8z" />
            </svg>
          );
          const sadface = (
              <svg id="lnr-sad" className="jobbtilfredshet_container-icons--icon" viewBox="0 0 1024 1024" width="3em" height="3em">
                <title>sad face</title>
                <path className="path1" d="M486.4 1024c-129.922 0-252.067-50.594-343.936-142.464s-142.464-214.014-142.464-343.936c0-129.923 50.595-252.067 142.464-343.936s214.013-142.464 343.936-142.464c129.922 0 252.067 50.595 343.936 142.464s142.464 214.014 142.464 343.936-50.594 252.067-142.464 343.936c-91.869 91.87-214.014 142.464-343.936 142.464zM486.4 102.4c-239.97 0-435.2 195.23-435.2 435.2s195.23 435.2 435.2 435.2 435.2-195.23 435.2-435.2-195.23-435.2-435.2-435.2z"></path>
                <path className="path2" d="M332.8 409.6c-42.347 0-76.8-34.453-76.8-76.8s34.453-76.8 76.8-76.8 76.8 34.453 76.8 76.8-34.453 76.8-76.8 76.8zM332.8 307.2c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z"></path>
                <path className="path3" d="M640 409.6c-42.349 0-76.8-34.453-76.8-76.8s34.451-76.8 76.8-76.8 76.8 34.453 76.8 76.8-34.451 76.8-76.8 76.8zM640 307.2c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z"></path>
                <path className="path4" d="M281.562 768.002c-5.352 0-10.747-1.672-15.355-5.133-11.304-8.491-13.586-24.539-5.094-35.843 25.686-34.195 59.344-62.531 97.338-81.941 39.858-20.362 82.907-30.685 127.95-30.685s88.091 10.323 127.949 30.685c37.992 19.408 71.653 47.742 97.339 81.938 8.491 11.304 6.211 27.352-5.094 35.843-11.307 8.493-27.352 6.21-35.843-5.094-44-58.576-111.194-92.171-184.35-92.171s-140.35 33.597-184.35 92.174c-5.029 6.696-12.712 10.227-20.488 10.227z"></path>
              </svg>
            );

        const icons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const negIcons = icons.slice(0, Math.round(value / 10)).map(i => {
            return smiley;
        });
        const posIcons = icons.slice(0, Math.round(10 - value / 10)).map(i => {
            return sadface;
        });
        const allIcons = negIcons.concat(posIcons);

        return (
            <div className="visualization_container">
                <div className="jobbtilfredshet_container">
                    <div className="jobbtilfredshet_container-icons">
                        <div className="jobbtilfredshet_container-icons--firstline">
                            {allIcons.slice(0, 5).map(i => {
                                return i;
                            })}
                        </div>
                        <div className="jobbtilfredshet_container-icons--secondline">
                            {allIcons.slice(5, 10).map(i => {
                                return i;
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