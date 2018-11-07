import React, { Fragment } from "react";
import { MainElement } from "../../data/ApiTypes";
import { alphabetize } from "../../util/AlphabeticList";

type Props = {
  list: MainElement[];
  handleItemClicked: (e: React.MouseEvent<HTMLElement>) => void;
};

class AlphabeticList extends React.Component<Props> {
  public render() {
    const { list, handleItemClicked } = this.props;
    const alphabetizedList = alphabetize(list, 5);
    return (
      <div className="alphabeticlist_container">
        {alphabetizedList.map((c, i) => {
          return (
            <li key={i}>
              <div>
                <div className="alphabetic-headers">
                {c.characters.map(l => (
                  <h3 className="alphabetic-header" key={l}>
                    <span>{l}</span>
                  </h3>
                ))}
                </div>
                <div>
                {c.strings.map(o => (
                  <Fragment key={o.uno_id}>
                    <span data-key={o.uno_id} onClick={handleItemClicked}>
                      {o.tittel}
                    </span>{" "}
                  </Fragment>
                ))}
                </div>
              </div>
            </li>
          );
        })}        
      </div>
    );
  }
}

export default AlphabeticList;
