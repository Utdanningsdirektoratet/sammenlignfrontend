import React, { Component } from "react";

import styles from "./HvilkeJobberFilter.module.scss";

import Translate from "../../app/Translate";
import { FilterTypes } from "./Mappings";

const filters: {
  filter: FilterTypes;
  title: JSX.Element;
}[] = [
  { filter: "antall_personer", title: <Translate nb="Antall personer" /> },
  { filter: "kvinner_menn", title: <Translate nb="Kvinner / menn" /> },
  {
    filter: "offentlig_privat",
    title: <Translate nb="Offentlig / Privat" />,
  },
  {
    filter: "over_under_40",
    title: <Translate nb="Over 40 år / Under 40 år" />,
  },
  { filter: "kandidater_13", title: <Translate nb="Nyutdanna" /> },
];

type Props = {
  filter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
};

class HvilkeJobberFilter extends Component<Props> {
  handleFilterChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterName = e.currentTarget.getAttribute("data-type");
    if (filterName) {
      this.props.onFilterChange(filterName as FilterTypes);
    }
  };
  render() {
    const { filter } = this.props;
    return (
      <ul className={`${styles.hvilkejobber_tabs}`}>
        {filters.map(f => (
          <li
            key={f.filter}
            className={
              filter === f.filter ? `${styles.hvilkejobber_active}` : undefined
            }
          >
            <button data-type={f.filter} onClick={this.handleFilterChange}>
              {f.title}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
export default HvilkeJobberFilter;
