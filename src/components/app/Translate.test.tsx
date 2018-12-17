import { splitKeys } from "./Translate";

// test:
describe("test splitKeys", () => {
  it("test two keys", () => {
    expect(
      splitKeys("Sammenlign %uno_id% og %data%.", ["%uno_id%", "%data%"])
    ).toEqual(["Sammenlign ", "%uno_id%", " og ", "%data%", "."]);
  });
  it("test two equal keys", () => {
    expect(
      splitKeys("Sammenlign %uno_id%, %uno_id% og %data%.", [
        "%uno_id%",
        "%data%",
      ])
    ).toEqual([
      "Sammenlign ",
      "%uno_id%",
      ", ",
      "%uno_id%",
      " og ",
      "%data%",
      ".",
    ]);
  });
  it("test no keys in string", () => {
    expect(splitKeys("Sammenlign ,  o.", ["%uno_id%", "%data%"])).toEqual([
      "Sammenlign ,  o.",
    ]);
  });
  it("replacements empty", () => {
    expect(splitKeys("Sammenlign ,  o.", [])).toEqual(["Sammenlign ,  o."]);
  });
});
