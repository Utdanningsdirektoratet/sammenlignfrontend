import React, { Fragment } from "react";
import { MainElement } from "../../data/ApiTypes";

type Props = {
  list: MainElement[];
  handleItemClicked: (e: React.MouseEvent<HTMLElement>) => void;
};

class AlphabeticList extends React.Component<Props> {
  public render() {
    const { list, handleItemClicked } = this.props;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";
    return (
      <div className="alphabeticlist_container">
        {alphabet.split("").map(c => {
          const letterList = list.filter(o => o.tittel.toUpperCase()[0] === c);
          if (letterList.length === 0) return null;
          return <li key={c}>
            <div>
              <h3 className="alphabetic-header">
                <span>{c}</span>
              </h3>
              {letterList
                .map((o) => (
                  <Fragment key={o.uno_id}>
                    <span data-key={o.uno_id} onClick={handleItemClicked}>
                      {o.tittel}
                    </span>{" "}
                  </Fragment>
                ))}
            </div>            
          </li>
        })}
      </div>
    );
  }
}

export default AlphabeticList;
