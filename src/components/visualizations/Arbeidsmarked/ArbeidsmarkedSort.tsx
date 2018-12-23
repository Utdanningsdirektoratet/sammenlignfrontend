import React, { Component } from "react";

import styles from "./ArbeidsmarkedSort.module.scss";

import {
  FilterTypes,
  mapAnyData,
  ArbeidsmarkedData,
  filterMappings,
} from "./Mappings";

type Props = {
  filter: FilterTypes;
  sort: number;
  onSortChange: (sort: number) => void;
};

class ArbeidsmarkedSort extends Component<Props> {
  render() {
    const { filter, sort, onSortChange } = this.props;
    const mapping = filterMappings[filter];
    return (
      <div>
        <ul>
          {mapping.fields.map((field, i) => {
            return (
              <li key={i} className={`${sort === i ? styles.active : null}`}>
                <button
                  onClick={() => {
                    onSortChange(i);
                  }}
                >
                  {field}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArbeidsmarkedSort;
