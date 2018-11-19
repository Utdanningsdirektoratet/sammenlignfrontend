import { MainElement, Main, DataList } from "./ApiTypes";
import main_json from "./main.json";
import { API_DOMAIN } from "./config";
import { Lang } from "../components/app/TranslateContext";
import { objectToQueryString } from "../util/querystring";

let mainFetchStarted: Promise<any> | null = null;
let mainCache: Main | null = null;

export function getMain(lang: Lang, result: (data: Main) => void) {
  if (mainCache) return result(mainCache);
  if (mainFetchStarted)
    return mainFetchStarted.then(data => {
      result(data);
      return data;
    });
  mainFetchStarted = fetch(
    API_DOMAIN + `/rest/main?sprak=${lang}&felt=tittel,interesser`
  )
    .then(response => response.json())
    .then(data => {
      mainCache = data;
      result(data);
      return data;
    })
    .catch(e => {
      mainCache = main_json as Main;
      result(main_json as Main);
      console.log("Fetching /rest/main failed", e);
    });
}

function getGeneric(
  lang: Lang,
  result: (data: DataList) => void,
  prefix: "u" | "y" | "s"
) {
  getMain(lang, (main: Main) => {
    const list = Object.keys(main)
      .filter(key => key[0] === prefix)
      .map(key => main[key])
      .sort((a: MainElement, b: MainElement) =>
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

export function getUtdanning(lang: Lang, result: (data: DataList) => void) {
  getGeneric(lang, result, "u");
}
export function getYrke(lang: Lang, result: (data: DataList) => void) {
  getGeneric(lang, result, "y");
}
export function getStudium(lang: Lang, result: (data: DataList) => void) {
  getGeneric(lang, result, "u");
}
