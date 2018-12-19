import React, { Component } from "react";

import "./HvilkeJobber.scss";
import { updateStats, updateTSVData } from "./HvilkeJobberHelperMethods";
import Translate, { TranslateString } from "../../app/Translate";
import UnoId from "../../app/UnoId";

type MyState = {
  selectedFilter: string;
};

type MyProps = {
  data: any;
  unoId: string;
  mainSelect: React.RefObject<HTMLSelectElement>;
};

class HvilkeJobber extends Component<MyProps, MyState> {
  myRefs: {
    container: React.RefObject<HTMLDivElement>;
    mainSelect: React.RefObject<HTMLSelectElement>;
    chart: React.RefObject<SVGSVGElement>;
    info: React.RefObject<HTMLDivElement>;
  } = {
    container: React.createRef<HTMLDivElement>(),
    mainSelect: this.props.mainSelect,
    chart: React.createRef<SVGSVGElement>(),
    info: React.createRef<HTMLDivElement>(),
  };
  defaultSelectedFilter = "antall_personer";
  state = {
    selectedFilter: this.defaultSelectedFilter,
  };
  onFilterSelect: ((className: string) => void) | null = null;
  filters: { className: string; title: string }[] = [
    { className: "antall_personer", title: TranslateString("Antall personer") },
    { className: "kvinner_menn", title: TranslateString("Kvinner / menn") },
    {
      className: "offentlig_privat",
      title: TranslateString("Offentlig / Privat"),
    },
    {
      className: "over_under_40",
      title: TranslateString("Over 40 år / Under 40 år"),
    },
    { className: "kandidater_13", title: TranslateString("Nyutdannet") },
  ];

  componentDidMount() {
    updateTSVData(this.props.data, this.myRefs);
  }

  handleChangeFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    var className = event.currentTarget.className.split(" ")[0];
    this.setState({ selectedFilter: className });
    if (this.onFilterSelect) this.onFilterSelect(className);
    updateStats(className);
  };

  render() {
    const { selectedFilter } = this.state;
    const { unoId } = this.props;
    return (
      <div>
        <h1>
          <Translate
            nb="Hva jobber de som er utdannet %unoId% som?"
            replacements={{ "%unoId%": <UnoId uno_id={unoId} /> }}
          />
        </h1>
        <header className="hvilkejobber_d3-control-panel">
          <section>
            <h2>
              <Translate nb="Vis" />
            </h2>
            <ul className="hvilkejobber_tabs">
              {this.filters.map((f, i) => (
                <li
                  key={f.className}
                  className={
                    f.className +
                    (selectedFilter === f.className
                      ? " hvilkejobber_active"
                      : "")
                  }
                >
                  <button onClick={this.handleChangeFilter}>{f.title}</button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="hvilkejobber_color-header">
              <Translate nb="Sorter etter" />
            </h2>
            <div className="hvilkejobber_color-controler" />
          </section>
        </header>
        <div className="hvilkejobber_container">
          <div
            className="hvilkejobber_chart-container"
            id="hvilkejobber_container"
            ref={this.myRefs.container}
          >
            <svg id="hvilkejobber_chart" ref={this.myRefs.chart} />
            <div id="hvilkejobber_info" ref={this.myRefs.info}>
              <div className="hvilkejobber_title">infoTitle</div>
              <div className="hvilkejobber_desc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HvilkeJobber;
