import React from "react";

import { SammenligningTemplate } from "./index";
import { MainElement } from "../../data/ApiTypes";

const ExtraWidgets: SammenligningTemplate[] = [
  {
    title: "Vis Tittel",
    widget_id: "tittel",
    path: "/rest/main",
    render: (data: MainElement) => {
      return <span>{data.tittel}</span>;
    },
  },
];
export default ExtraWidgets;
