import * as d3 from "d3";

const xScale = d3.scaleLinear();
const yScale = d3.scaleBand().padding(0.25);

const xAxis: any = d3.axisTop(xScale);
const xAxisBottom: any = d3.axisBottom(xScale);
const yAxis: any = d3.axisLeft(yScale);
const size: any = {};
const margin = { top: 30, right: 40, bottom: 20, left: 220 };
let types = ["series-0", "series-1", "series-2", "series-3", "series-4"];
let yDomain = true;
let mapping: { [id: string]: any } = {
  "series-0": "antall personer",
};
let showAll = false;
let lastKey: any = null;
const barColor = d3
  .scaleOrdinal(d3.schemeCategory10)
  .domain(types)
  .range(["#daaa00", "#443c38", "#e8e8e8"]);
const sumColor = d3
  .scaleLinear()
  .range((["red", "gray", "#00cd77"] as any) as number[]);
const tplMappings: { [id: string]: string[] } = {
  antall_personer: ["antall personer"],
  offentlig_privat: [
    "antall som jobber i privat sektor",
    "antall som jobber i offentlig sektor",
    "uoppgitt sektor",
  ],
  kvinner_menn: ["antall kvinner", "antall menn", "uoppgitt kjønn"],
  over_under_40: ["antall personer under 40 år", "antall personer over 40 år"],
  kandidater_13: [
    "Nyutdanna",
    "Ferdigutdanna 7-10 år siden",
    "fullført, annet",
  ],
};
let infoMargin: { [id: number]: number };
let thisData: any = null;

let svg: any = null;
let thisContainer: any = null;
let win: any = null;
let wrapper: any = null;
let rows: any = null;

export function updateTSVData(
  data: any,
  refs: {
    container: React.RefObject<HTMLDivElement>;
    mainSelect: React.RefObject<HTMLSelectElement>;
    chart: React.RefObject<SVGSVGElement>;
    info: React.RefObject<HTMLDivElement>;
  }
) {
  console.log(JSON.stringify(data));

  removeStats();
  thisData = data;
  svg = d3.select(refs.chart.current);
  thisContainer = d3.select(refs.container.current);
  win = d3.select(window);

  updateData();

  xScale
    .domain([0, (d3.max(thisData, (d: any) => d.sum) as any) as number])
    .nice();
  yScale.domain(
    thisData
      .sort((a: any, b: any) => b.sum - a.sum)
      .map((d: any) => d.yrkeskode_styrk08_navn)
  );

  const mean = d3.mean(thisData, (d: any) => d.sum);
  if (mean) {
    const far = d3.max(thisData, (d: any) => Math.abs(d.sum - mean));
    if (far) {
      sumColor.domain([mean - far, mean, mean + far]);
    }
  }

  const thisInfo = d3.select(refs.info.current);

  const g = svg.append("g").attr("class", "axis");

  wrapper = svg
    .append("g")
    .attr("class", "rows-wrapper")
    .attr("transform", "translate(1, 0)");

  rows = wrapper
    .selectAll(".rows")
    .data(thisData)
    .enter()
    .append("g")
    .attr("class", "rows");

  rows
    .append("g")
    .attr("class", "base")
    .append("rect")
    .attr("class", "base-bar")
    .attr("y", 0)
    .attr("fill", "none");

  rows
    .selectAll(".base")
    .append("text")
    .attr("fill", (d: any) => sumColor(d.sum))
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .attr("dx", "-.2em")
    .attr("dy", 1)
    .text((d: any) => d.sum);

  rows
    .append("g")
    .attr("class", "overlays")
    .append("g")
    .attr("class", "parts")
    .selectAll(".part-bars")
    .data((d: any) => d.values)
    .enter()
    .append("g")
    .attr("class", "part-bars")
    .append("rect")
    .attr("class", (v: any, i: any) => "parts-" + i)
    .attr("fill", (v: any) => barColor(v.type));

  rows
    .selectAll(".part-bars")
    .append("text")
    .attr("class", "part-values")
    .attr("fill", (d: any, i: any) => (i === 1 ? "white" : "black"))
    .attr("dominant-baseline", "ideographic")
    .attr("dx", ".3em")
    .attr("dy", 0)
    .text((v: any) => v.value);

  svg.append("g").attr("class", "hovered");

  rows
    .selectAll(".part-bars")
    .on("click", function(v: any) {
      const primer = v.type === types[0];
      const vname: string = v.name;
      sortParts(v.type);
      thisInfo.style("display", "none");
      svg
        .select(".hovered")
        .selectAll("rect")
        .transition()
        .duration(primer ? 0 : 5000)
        .attr("x", margin.left)
        .transition()
        .delay(primer ? 0 : 2500)
        .duration(3000)
        .attr("y", yScale(vname) || 0)
        .transition()
        .delay(5000)
        .duration(1000)
        .remove();
    })
    .on("mouseover touchstart", function(v: any) {
      thisInfo.style("display", "inline");

      const key = mapping[v.type];
      const sum = d3.sum(thisData, (d: any) => d[key]);

      let description = "";
      let heading = "";

      // const unit = mapping[v.type].replace(/(antall|personer) /g, "");

      // if (Object.keys(mapping).length === 1) {
      //   heading = `<b>${
      //     v.value
      //   } ${unit}</b> med denne utdanningen jobber som <b>${v.name}</b>.`;
      //   description = `<b>${d3.format(".1%")(
      //     v.value / sum
      //   )}</b> av de med denne utdanningen har dette yrket.`;
      // } else {
      //   heading = `Av de <b>${
      //     v.sum
      //   }</b> personene med denne utdanningen som jobber som <b>${
      //     v.name
      //   }</b>,<br> er ${v.value} <b>${unit}</b>.`;
      //   description = `Det vil si ${d3.format(".1%")(
      //     v.value / v.sum
      //   )} <b>${unit}</b> .`;
      // }
      // createInfo(thisInfo, heading, description);

      svg
        .select(".hovered")
        .append("rect")
        .datum(v)
        .attr("fill", "none")
        .attr("stroke", "#fc8b25")
        .attr("stroke-width", 3)
        .attr("x", xScale(v.left))
        .attr("y", yScale(v.name) || 0)
        .attr("width", xScale(v.value) - margin.left)
        .attr("height", yScale.bandwidth());
    })
    .on("mousemove", function() {
      var chartElement: any = document.getElementById("hvilkejobber_chart");
      var mouse = d3.mouse(chartElement);
      thisInfo
        .style("display", "inline")
        .style("left", mouse[0] + 10 + infoMargin[0] + "px")
        .style("top", mouse[1] + 10 + infoMargin[1] + "px");
    })
    .on("mouseout touchend", function(v: any) {
      thisInfo.style("display", "none");
      svg
        .select(".hovered")
        .selectAll("rect")
        .remove();
    });

  g.append("g").attr("class", "axis xaxis");
  g.append("g").attr("class", "axis xaxis-bottom");
  g.append("g").attr("class", "axis yaxis");

  wrapper
    .append("g")
    .attr("class", "rows_rest")
    .on("click", function() {
      showAll = true;
      resize();
    });

  svg.call(createLegend).call(resize);

  const showTop10 = svg
    .append("g")
    .attr("class", "show_top10")
    .style("display", "none")
    .on("click", () => {
      showAll = false;
      resize();
    });

  showTop10
    .append("rect")
    .style("fill", "#e8e8e8")
    .style("stroke", "#443c38");

  showTop10
    .append("text")
    .attr("dx", 4)
    .attr("dy", 14)
    .attr("fill", "#443c38")
    .style("font-size", "10px")
    .text("Vis topp 10");

  setTimeout(function() {
    showTop10
      .style("display", "inline")
      .attr("transform", function(d: any, i: any, n: any) {
        const bbox = n[i].getBBox();
        const x = size.width - margin.right - bbox.width - 12;
        const y = size.height - margin.bottom - bbox.height - 12;
        return `translate(${Math.round(x)}, ${Math.round(y)})`;
      });

    showTop10
      .select("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function(d: any, i: any, n: any) {
        const bbox = n[i].parentElement.getBBox();
        return Math.round(bbox.width + 6);
      })
      .attr("height", function(d: any, i: any, n: any) {
        const bbox = n[i].parentElement.getBBox();
        return Math.round(bbox.height + 6);
      });
  }, 100);

  win.on("resize", resize);
}

export function updateStats(id: string) {
  setStats(id);
}

function removeStats() {
  d3.selectAll("g.yaxis .tick").remove();
  d3.selectAll("g.rows-wrapper").remove();
  d3.selectAll("g.show_top10").remove();
}

function setStats(id: string) {
  types = ["series-0", "series-1", "series-2"];
  moveBars(500);
  mapping = {};
  tplMappings[id].forEach((v, i) => {
    mapping[`series-${i}`] = v;
  });

  updateRows();
  createLegend();
  moveBars(500);
  yDomain = false;
  sortParts(types[0]);
}

function moveBars(duration = 0, delay = 0, key = null) {
  const domain = yScale.domain();

  rows
    .transition()
    .duration(duration)
    .delay(delay)
    .attr(
      "transform",
      (d: any) => "translate(0," + yScale(d.yrkeskode_styrk08_navn) + ")"
    )
    .style("display", (d: any) =>
      showAll || domain.indexOf(d.yrkeskode_styrk08_navn) < 10
        ? "inline"
        : "none"
    );

  const restRow = svg.select(".rows_rest");
  restRow.selectAll("*").remove();

  svg.select(".rest_label").style("display", showAll ? "none" : "inline");

  if (!showAll) {
    svg.style(
      "height",
      margin.top + (yScale.step() - yScale.bandwidth()) / 2 + yScale.step() * 11
    );

    let rest: { [id: string]: any } = {};
    types.forEach((type: string) => {
      rest[type] = 0;
    });

    rows.data().forEach((d: any) => {
      const index = domain.indexOf(d.name);

      if (index >= 10) {
        types.forEach(type => {
          rest[type] += parseInt(d[type]);
        });
      }
    });

    restRow
      .append("rect")
      .attr("fill", "rgb(232, 232, 232)")
      .attr("stroke", "#443c38")
      .attr("x", margin.left)
      .attr("y", yScale(yScale.domain()[10]) || 0)
      .attr("width", 100)
      .attr("height", yScale.bandwidth());

    restRow
      .append("text")
      .attr("fill", "#443c38")
      .attr("x", margin.left)
      .attr("y", yScale(yScale.domain()[10]) || 0)
      .attr("dx", 5)
      .attr("dy", "1.5em")
      .style("font-size", "10px")
      .text("Vis alt");
  } else {
    svg.style("height", null);

    svg
      .select(".show_top10")
      .attr("transform", function(d: any, i: any, n: any) {
        const bbox = n[i].getBBox();
        const x = size.width - margin.right - bbox.width - 12;
        const y = size.height - margin.bottom - bbox.height - 12;
        return `translate(${Math.round(x)}, ${Math.round(y)})`;
      });
  }

  if (!key) {
    key = lastKey;
  }
  lastKey = key;

  rows
    .selectAll(".base")
    .selectAll("rect")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("x", margin.left)
    .attr("width", (d: any) => xScale(d.sum) - margin.left)
    .attr("height", yScale.bandwidth());

  rows
    .selectAll(".base")
    .selectAll("text")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("x", size.width)
    .attr("y", yScale.bandwidth() / 2);

  rows
    .selectAll(".parts")
    .selectAll("rect")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("x", (v: any) => xScale(v.left))
    .attr("y", "0")
    .attr("width", (v: any) => Math.max(xScale(v.value) - margin.left, 0))
    .attr("height", yScale.bandwidth())
    .style("stroke", (v: any) =>
      !yDomain && v.type === key ? "black" : "none"
    )
    .style("opacity", (v: any) => (!yDomain && v.type !== key ? 0.6 : 1));

  rows
    .selectAll(".parts")
    .selectAll("text")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform", (v: any) => "translate(" + xScale(v.left) + ",0)")
    .attr("x", 0)
    .attr("y", yScale.bandwidth())
    .text((v: any) => v.value)
    .attr("display", (v: any) =>
      xScale(v.value) - margin.left < 22 ? "none" : "inline"
    )
    .style("opacity", (v: any) => (!yDomain && v.type !== key ? 0.6 : 1));
}

function updateRows() {
  updateData();

  const rows = wrapper.selectAll(".rows");

  rows.selectAll(".part-bars").data((d: any) => d.values);

  rows
    .selectAll(".parts")
    .selectAll("rect")
    .data((d: any) => d.values);

  rows
    .selectAll(".parts")
    .selectAll("text")
    .data((d: any) => d.values);
}

function updateData() {
  for (let x of thisData) {
    const values = [];

    // for (let z of types) {
    //   const key = mapping[z];
    //   const xkey = x[key];
    //   values.push({
    //     name: x.yrkeskode_styrk08_navn,
    //     type: z,
    //     value: parseInt(xkey || "0"),
    //     sum: 0,
    //   });
    // }

    values.push({
      name: x.yrkeskode_styrk08_navn,
      // type: z,
      value: parseInt(x.antall_personer || "0"),
      sum: 0,
    });
    console.log(values);
    x.sum = d3.sum(values.map(d => d.value));
    for (let z of values) {
      z.sum = x.sum;
    }
    x.values = values;
    calcLeft(x);
  }
}

function calcLeft(datum: any) {
  let sum = 0;
  for (let n of datum.values) {
    n.left = sum;
    sum += n.value;
  }
}

function createLegend() {
  d3.select(".hvilkejobber_color-controler")
    .select("ul")
    .remove();

  const colorControler = d3
    .select(".hvilkejobber_color-controler")
    .append("ul");
  const markerSize = parseFloat(colorControler.style("font-size").slice(0, -2));
  colorControler
    .selectAll("li")
    .data(barColor.domain())
    .enter()
    .append("li")
    .style("display", d => (mapping[d] ? "inline-block" : "none"))
    .on("click", function(v, i) {
      sortParts(v);
    })
    .append("svg")
    .attr("width", markerSize)
    .attr("height", markerSize)
    .append("circle")
    .attr("class", "color-switch active")
    .style("cursor", "pointer")
    .attr("cx", markerSize / 2)
    .attr("cy", markerSize / 2)
    .attr("r", markerSize / 2 - 1)
    .attr("fill", d => barColor(d));
  colorControler
    .selectAll("li")
    .append("span")
    .text((d: any) =>
      mapping[d]
        ? mapping[d].charAt(0).toUpperCase() + mapping[d].substring(1)
        : ""
    );
}

function sortParts(key: any) {
  const prime = types[0];
  sortX(key, prime);
  sortY(key, prime);
}

function sortX(key: any, prime: any) {
  if (key !== prime) {
    types.splice(types.indexOf(key), 1);
    types.splice(0, 0, key);

    for (let x of thisData) {
      x.values.sort(function(a: any, b: any) {
        return types.indexOf(a.type) - types.indexOf(b.type);
      });
      calcLeft(x);
    }

    rows.data(thisData);
    moveBars(500, 0, key);
  }
}

function sortY(key: any, prime: any) {
  const jake = key === prime;
  const delay = jake ? 0 : 750;
  // const delay = 0;
  const sortFunction = function(a: any, b: any) {
    return jake && !yDomain
      ? b.sum - a.sum
      : b.values[0].value - a.values[0].value;
  };
  const domain = thisData
    .concat()
    .sort(sortFunction)
    .map((d: any) => d.name);
  yScale.domain(domain);

  yDomain = jake ? !yDomain : false;

  moveBars(500, delay, key);
  moveAxis(500, delay);
}

function moveAxis(duration = 0, delay = 0) {
  xAxis.tickSize(-(size.height - margin.top - margin.bottom));
  xAxisBottom.tickSize(-(size.height - margin.top - margin.bottom));
  yAxis.tickSize(0);

  d3.select(".xaxis")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform", "translate(0," + margin.top + ")")
    .call(xAxis);

  const xAxisLength =
    svg
      .select(".xaxis")
      .selectAll("text")
      .size() * 4;
  xAxisBottom.ticks(xAxisLength);

  d3.select(".xaxis-bottom")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform", "translate(0," + (size.height - margin.bottom) + ")")
    .call(xAxisBottom);

  svg
    .select(".xaxis-bottom")
    .selectAll("text")
    .remove();

  d3.select(".yaxis")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

  const domain = yScale.domain();

  d3.selectAll(".yaxis .tick").style("display", (d: any) =>
    showAll || domain.indexOf(d) < 10 ? "inline" : "none"
  );
}

function createInfo(element: any, title: any, ...args: any) {
  element.select(".hvilkejobber_title").html(title);
  const paraphs = element
    .select(".desc")
    .selectAll("p")
    .data(args);
  paraphs.exit().remove();
  paraphs
    .enter()
    .append("p")
    .merge(paraphs)
    .html((d: any) => d);
}

function resize() {
  const colorHeight = parseFloat(
    d3
      .select(".hvilkejobber_color-controler")
      .style("height")
      .slice(0, -2)
  );
  size.width = parseFloat(svg.style("width").slice(0, -2));
  const step = showAll ? 20 : 32;
  size.height = thisData.length * step + margin.top + margin.bottom;

  svg.attr("width", size.width).attr("height", size.height);

  xScale.range([margin.left, size.width - margin.right]);
  yScale.range([margin.top, size.height - margin.bottom]);

  moveAxis();
  moveBars();

  infoMargin = calcMargin(thisContainer);
}

function calcMargin(parent: any) {
  const rect = parent.node().getBoundingClientRect();
  return [rect.x, rect.y];
}
