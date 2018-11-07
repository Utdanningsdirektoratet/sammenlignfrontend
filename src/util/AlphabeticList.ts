import { MainElement } from "../data/ApiTypes";
import { isRegExp } from "util";

type AlphabeticListItem = {
  characters: string[];
  strings: MainElement[];
};

export function alphabetize(
  stringArray: MainElement[],
  maxWordsBeforeSplit: number
): AlphabeticListItem[] {
  stringArray = stringArray.sort();

  var alphabeticList: AlphabeticListItem[] = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

  alphabet.split("").forEach(c => {
    const list = stringArray.filter(o => o.tittel.toUpperCase()[0] === c);

    if (list.length === 0) return;

    if (alphabeticList.length === 0) {
      alphabeticList.push({ characters: [c], strings: list });
      return;
    }

    if (list.length > maxWordsBeforeSplit) {
      alphabeticList.push({ characters: [c], strings: list });
      return;
    }
    if (list.length <= maxWordsBeforeSplit) {
      if ((alphabeticList[alphabeticList.length - 1].strings.length +  list.length) <= maxWordsBeforeSplit) {
        alphabeticList[alphabeticList.length - 1].characters.push(c);
        alphabeticList[alphabeticList.length - 1].strings = alphabeticList[alphabeticList.length - 1].strings.concat(list);
      } else {
        alphabeticList.push({ characters: [c], strings: list });
      }
    }
  });

  return alphabeticList;
}
