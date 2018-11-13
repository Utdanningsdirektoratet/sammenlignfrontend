import React from "react";

import { SammenligningTemplate } from "./index";
import { MainElement, LonnElement } from "../../data/ApiTypes";

const Utdanning: SammenligningTemplate[] = [
  {
    title: "Lønnsstatistikk",
    widget_id: "lonn",
    path: "/rest/lonn",
    //query: { sektor: "A" },
    render: (data: LonnElement) => (
      <div>
        hei
        {Object.keys(data).map(key => {
          const lonn = data[key];
          return (
            <div>
              hei
              {lonn.A.D.sektor}
            </div>
          );
        })}
      </div>
    ),
  },
  {
    title: "Arbeidsledighet",
    widget_id: "arbeidsledighet",
    path: "/rest/main",
    render: (data: MainElement) => (
      <>
        <span>{data.funksjon}</span>
      </>
    ),
  },
  {
    title: "Uno id",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) => <span>{data.uno_id}</span>,
  },
  {
    title: "Interesser",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) =>
      data.interesser ? (
        <ul>
          {data.interesser.map(interresse => (
            <li>{interresse}</li>
          ))}
        </ul>
      ) : (
        <span>Ingen interresser</span>
      ),
  },
];
export default Utdanning;
