import { Arbeidstid, Sektor } from "../../../data/ApiTypes";

type VisualizationHeaderConfigTemplate = {
  title: string;
  options: VisualizationHeaderConfigTemplateOptions[];
};
type VisualizationHeaderConfigLønn = {
  Arbeidstid: Arbeidstid;
  Sektor: Sektor;
};

type VisualizationHeaderConfigTemplateOptions = {
  title: string;
  groups: VisualizationHeaderConfigTemplateOptionGroup[];
  helpText?: string;
  type: "radio" | "checkbox";
};
type VisualizationHeaderConfigTemplateOptionGroup = {
  title: string;
  value: string;
  helpText?: string;
};

const exampleConfig: VisualizationHeaderConfigTemplate = {
  title: "Lønn",
  options: [
    {
      title: "Arbeidstid",
      type: "radio",
      groups: [
        {
          title: "Heltid",
          value: "H",
        },
        {
          title: "Deltid",
          value: "D",
        },
        {
          title: "Begge",
          value: "A",
        },
      ],
    },
    {
      title: "Sektor",
      type: "checkbox",
      groups: [
        {
          title: "Privat",
          value: "P",
        },
        {
          title: "Kommunal",
          value: "K",
        },
        {
          title: "Statlig",
          value: "S",
        },
        {
          title: "Alle",
          value: "A",
        },
      ],
    },
  ],
};

const exampleState: VisualizationHeaderConfigLønn = {
  Arbeidstid: "H",
  Sektor: "A",
};
