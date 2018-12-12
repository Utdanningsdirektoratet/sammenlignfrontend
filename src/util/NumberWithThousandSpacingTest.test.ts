import { getNumberWithProperSpacing } from "./NumberWithThousandSpacing";

describe("Test NumberWithThousandSpacing", () => {
  it("NoSpacingWhenShortNumber", () => {
    const number = 256;
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("256");
  });

  it("SpacingWhen4Numbers", () => {
    const number = 1256;
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("1 256");
  });

  it("SpacingWhen6Numbers", () => {
    const number = 101256;
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("101 256");
  });
  it("2SpacingWhen7Numbers", () => {
    const number = 1101256;
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("1 101 256");
  });

  it("NoSpacingWhenShortString", () => {
    const number = "256";
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("256");
  });

  it("SpacingWhen4NumbersInString", () => {
    const number = "1256";
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("1 256");
  });

  it("SpacingWhen6NumbersInString", () => {
    const number = "101256";
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("101 256");
  });
  it("2SpacingWhen7NumbersInString", () => {
    const number = "1101256";
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("1 101 256");
  });

  it("SendingInNull", () => {
    const number = null;
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual(null);
  });
  it("NoSpacingWhenNotNumberInString", () => {
    const number = "testtest";
    let result = getNumberWithProperSpacing(number);
    expect(result).toEqual("testtest");
  });
});
