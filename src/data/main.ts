import { MainElement, Main, DataList } from "./ApiTypes";
import main_json from "./main.json";

let mainFetchStarted = false;
let mainCache: Main | null = null;

function getMain(result: (data: Main) => void) {
  if (mainCache) return result(mainCache);
  if (mainFetchStarted) return;
  mainFetchStarted = true;
  fetch("https://sammenlign.utdanning.no/rest/main")
    .then(response => response.json())
    .then(data => {
      mainCache = data;
      result(data);
    })
    .catch(e => {
      mainCache = main_json as Main;
      result(main_json as Main);
      console.log("Fetching /rest/main failed", e);
    });
}

function getGeneric(result: (data: DataList) => void, prefix: "u" | "y" | "s") {
  getMain((main: Main) => {
    const list = Object.keys(main)
      .filter(key => key[0] === prefix)
      .map(key => main[key])
      .sort(
        (a: MainElement, b: MainElement) =>
          a.tittel < b.tittel ? -1 : a.tittel > b.tittel ? 1 : 0
      );
    const interesser: { [key: string]: boolean } = {};
    list.forEach((el: MainElement) => {
      if (el.interesser) {
        el.interesser.forEach(i => (interesser[i] = true));
      }
    });
    const interesseKeys = Object.keys(interesser).sort();
    result({ list, interesser: interesseKeys });
  });
}

export function getUtdanning(result: (data: DataList) => void) {
  getGeneric(result, "u");
}
export function getYrke(result: (data: DataList) => void) {
  getGeneric(result, "y");
}
export function getStudium(result: (data: DataList) => void) {
  getGeneric(result, "u");
}
