import main from "./data/main.json";
// import main from "../../data/main.json";
import suggest from "./data/suggest.json";
import entrepenorskap from "./data/entrepenorskap.json";
import lonn from "./data/lonn.json";
import arbeidsledighet from "./data/arbeidsledighet.json";
import {
  MainElement,
  EntrepenorElement,
  LonnElement,
  ArbeidsledighetElement,
  Suggest,
} from "../../data/ApiTypes.js";

interface Data<T> {
  [uno_id: string]: T;
}

describe("verify apiTypes", () => {
  it("main", () => {
    // This is not a real test, but Typescript will trigger complilation error if non-nullable properties are missing
    const m = main as Data<MainElement>;
  });
  it("suggest", () => {
    const m = suggest as Suggest;
  });
  it("entrepenorskap", () => {
    const m = entrepenorskap as Data<EntrepenorElement>;
  });
  it("lonn", () => {
    const m = lonn as Data<LonnElement>;
  });
  it("arbeidsledighet", () => {
    const m = arbeidsledighet as Data<ArbeidsledighetElement>;
  });
});
