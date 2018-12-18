import React, { ReactInstance } from "react";

import styles from "./HvilkeJobber.module.scss";
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
  onUnoIdClick?: (uno_id: string) => void;
};

class HvilkeJobber extends React.Component<MyProps, MyState> {
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
    // this.handleUnoIdClick(this.props.unoId);
    updateTSVData(this.props.data, this.myRefs);
  }

  // componentWillReceiveProps(nextProps: MyProps) {
  //   if (nextProps.data !== this.props.data) {
  //     updateTSVData(nextProps.data, this.myRefs);
  //   }
  // }

  // handleUnoIdClick = (uno_id: string) => {
  //   // this.setState({
  //   //   searchString: "",
  //   //   suggestions: {},
  //   // });
  //   if (uno_id) {
  //     if (this.props.onUnoIdClick) {
  //       this.props.onUnoIdClick(uno_id);
  //       return;
  //     }
  //   }
  // };

  // handleUtdanningClicked = (data: any) => {
  //   this.setState({ selectedFilter: this.defaultSelectedFilter });
  //   updateTSVData(data, this.myRefs);
  // };

  handleChangeFilter = (event: React.MouseEvent<HTMLLIElement>) => {
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
        <header className={`${styles.hvilkejobber_d3_control_panel}`}>
          <section>
            <h2>
              <Translate nb="Vis" />
            </h2>
            <ul className={`${styles.hvilkejobber_tabs}`}>
              {this.filters.map((f, i) => (
                <li
                  key={f.className}
                  className={
                    f.className +
                    (selectedFilter === f.className
                      ? ` ${styles.hvilkejobber_active}`
                      : "")
                  }
                  onClick={this.handleChangeFilter}
                >
                  {f.title}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className={`${styles.hvilkejobber_color_header}`}>
              <Translate nb="Sorter etter" />
            </h2>
            <div className={`${styles.hvilkejobber_color_controler}`} />
          </section>
        </header>
        <div className={`${styles.hvilkejobber_container}`}>
          <div
            className={`${styles.hvilkejobber_chart_container}`}
            id="hvilkejobber_container"
            ref={this.myRefs.container}
          >
            <svg id="hvilkejobber_chart" ref={this.myRefs.chart} />
            <div id="hvilkejobber_info" ref={this.myRefs.info}>
              <div className={`${styles.hvilkejobber_title}`}>infoTitle</div>
              <div className={`${styles.hvilkejobber_desc}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HvilkeJobber;
