import { alphabetize } from "./AlphabeticList";
import { MainElement } from "../data/ApiTypes";

describe("Test Alphabetizice", () => {
  it("GetAlphabetizicedList_3plus2-WithThreshold3", () => {
    const list = [
      { tittel: "AAA" },
      { tittel: "AAB" },
      { tittel: "AAS" },
      { tittel: "CCD" },
      { tittel: "DA" }
    ] as MainElement[];
    const aaList = alphabetize(list, 3);
    expect(aaList).toEqual([
      {
        characters: ["A"],
        strings: [{ tittel: "AAA" }, { tittel: "AAB" }, { tittel: "AAS" }],
      },
      {
        characters: ["C", "D"],
        strings: [{ tittel: "CCD" }, { tittel: "DA" }],
      },
    ]);
  });

  it("GetAlphabetizicedList_5plus2-WithThreshold5", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "Akvakulturfag" },
      { tittel: "Aluminiumskonstruksjonsfag" },
      { tittel: "Bakerfag" },
      { tittel: "Banemontørfag" },
      { tittel: "CNC-maskineringsfag" },
      { tittel: "Danse- og ballettutdanning" }
    ] as MainElement[];
    const aaList = alphabetize(list, 5);
    expect(aaList).toEqual([
      {
        characters: ["A", "B"],
        strings: [
          { tittel: "Aktivitørfag" },
          { tittel: "Akvakulturfag" },
          { tittel: "Aluminiumskonstruksjonsfag" },
          { tittel: "Bakerfag" },
          { tittel: "Banemontørfag" }
        ],
      },
      {
        characters: ["C", "D"],
        strings: [
          { tittel: "CNC-maskineringsfag" },
          { tittel: "Danse- og ballettutdanning" }
        ],
      },
    ]);
  });

  it("GetAlphabetiziced_3plus1plus3-SingleInMiddleWithLargeAtBothSides", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "Akvakulturfag" },
      { tittel: "Aluminiumskonstruksjonsfag" },
      { tittel: "Bakerfag" },
      { tittel: "CNC-maskineringsfag" },
      { tittel: "CCC" },
      { tittel: "CCCC" }
    ] as MainElement[];
    const aaList = alphabetize(list, 3);
    expect(aaList).toEqual([
      {
        characters: ["A"],
        strings: [
          { tittel: "Aktivitørfag" },
          { tittel: "Akvakulturfag" },
          { tittel: "Aluminiumskonstruksjonsfag" }
        ],
      },
      {
        characters: ["B"],
        strings: [{ tittel: "Bakerfag" }]
      },
      {
        characters: ["C"],
        strings: [
          { tittel: "CNC-maskineringsfag" },
          { tittel: "CCC" },
          { tittel: "CCCC" }
        ],
      },
    ]);
  });

  it("GetAlphabetiziced_4plus3-WithThreshold4", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "Akvakulturfag" },
      { tittel: "Aluminiumskonstruksjonsfag" },
      { tittel: "Bakerfag" },
      { tittel: "CNC-maskineringsfag" },
      { tittel: "CCC" },
      { tittel: "CCCC" }
    ] as MainElement[];
    const aaList = alphabetize(list, 4);
    expect(aaList).toEqual([
      {
        characters: ["A", "B"],
        strings: [
          { tittel: "Aktivitørfag" },
          { tittel: "Akvakulturfag" },
          { tittel: "Aluminiumskonstruksjonsfag" },
          { tittel: "Bakerfag" }
        ],
      },
      {
        characters: ["C"],
        strings: [
          { tittel: "CNC-maskineringsfag" },
          { tittel: "CCC" },
          { tittel: "CCCC" }
        ],
      },
    ]);
  });

  it("GetAlphabetiziced_5plus1-WithSingleAsLast", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "Akvakulturfag" },
      { tittel: "Aluminiumskonstruksjonsfag" },
      { tittel: "Bakerfag" },
      { tittel: "CNC-maskineringsfag" },
      { tittel: "DCC" }
    ] as MainElement[];
    const aaList = alphabetize(list, 5);
    expect(aaList).toEqual([
      {
        characters: ["A", "B", "C"],
        strings: [
          { tittel: "Aktivitørfag" },
          { tittel: "Akvakulturfag" },
          { tittel: "Aluminiumskonstruksjonsfag" },
          { tittel: "Bakerfag" },
          { tittel: "CNC-maskineringsfag" }
        ],
      },
      {
        characters: ["D"],
        strings: [{ tittel: "DCC" }]
      },
    ]);
  });

  it("GetAlphabetiziced_1plus4+1-WhereSingleAtStartAndEnd", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "BAkvakulturfag" },
      { tittel: "BAluminiumskonstruksjonsfag" },
      { tittel: "Bakerfag" },
      { tittel: "BCNC-maskineringsfag" },
      { tittel: "DCC" }
    ] as MainElement[];
    const aaList = alphabetize(list, 4);
    expect(aaList).toEqual([
      {
        characters: ["A"],
        strings: [{ tittel: "Aktivitørfag" }]
      },
      {
        characters: ["B"],
        strings: [
          { tittel: "BAkvakulturfag" },
          { tittel: "BAluminiumskonstruksjonsfag" },
          { tittel: "Bakerfag" },
          { tittel: "BCNC-maskineringsfag" }
        ],
      },
      {
        characters: ["D"],
        strings: [{ tittel: "DCC" }]
      },
    ]);
  });

  it("GetAlphabetiziced_6plus4-WithOnly1PerCharacter", () => {
    const list = [
      { tittel: "Aktivitørfag" },
      { tittel: "BAkvakulturfag" },
      { tittel: "CAluminiumskonstruksjonsfag" },
      { tittel: "DCC" },
      { tittel: "ECC" },
      { tittel: "FCC" },
      { tittel: "GCC" },
      { tittel: "HCC" },
      { tittel: "ICC" },
      { tittel: "JCC" }
    ] as MainElement[];
    const aaList = alphabetize(list, 6);
    expect(aaList).toEqual([
      {
        characters: ["A", "B", "C", "D", "E", "F"],
        strings: [
          { tittel: "Aktivitørfag" },
          { tittel: "BAkvakulturfag" },
          { tittel: "CAluminiumskonstruksjonsfag" },
          { tittel: "DCC" },
          { tittel: "ECC" },
          { tittel: "FCC" }
        ],
      },
      {
        characters: ["G", "H", "I", "J"],
        strings: [
          { tittel: "GCC" },
          { tittel: "HCC" },
          { tittel: "ICC" },
          { tittel: "JCC" }
        ],
      },
    ]);
  });
});
