import React, { ChangeEvent } from "react";

type Props = {
  utdanninger: { unoId: string; title: string }[];
  mainSelectRef: React.RefObject<HTMLSelectElement>;
  selected: string;
  onSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
};

class HvilkeJobberSelektor extends React.Component<Props> {
  render() {
    const { utdanninger, mainSelectRef, selected, onSelected } = this.props;
    return (
      <div>
        <section>
          <select
            id="hvilkejobber_main_select"
            value={selected}
            ref={mainSelectRef}
            onChange={onSelected}
          >
            {utdanninger.map((u, i) => (
              <option key={u.unoId} value={u.unoId}>
                {u.title}
              </option>
            ))}
          </select>
        </section>
      </div>
    );
  }
}

export default HvilkeJobberSelektor;
