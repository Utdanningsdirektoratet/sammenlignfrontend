import React from "react";
import HvilkeJobberWrapper from "../visualizations/Old/HvilkeJobberWrapper";

const utdanninger = [
  { unoId: "statsviter", title: "Statsviter" },
  { unoId: "idrettsfag", title: "Idrettsfag" },
  { unoId: "akvakulturfag", title: "Akvakulturfag" },
  { unoId: "ambulansefag", title: "Ambulansefag" },
  { unoId: "apotekteknikkfag", title: "Apotekteknikkfag" },
  { unoId: "automatiseringsfag", title: "Automatiseringsfag" },
  { unoId: "betongfag", title: "Betongfag" },
  { unoId: "cncmaskineringsfag", title: "CNC-maskineringsfag" },
];

export default function(props: any) {
  return <HvilkeJobberWrapper utdanninger={utdanninger} />;
}
