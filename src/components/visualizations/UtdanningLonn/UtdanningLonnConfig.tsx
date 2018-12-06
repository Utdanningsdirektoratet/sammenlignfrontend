import {
  Tidsenhet,
  Lønn,
  StatistiskMål,
} from "../Lonn/VisualizationHeaderLonn";

export type UtdanningLonnConfig = {
  Tidsenhet: Tidsenhet;
  Lønn: Lønn;
  StatistiskMål: StatistiskMål;
  Fullført: FullførtUtdanning;
  ShowGraphics: boolean;
  ssbSektor: { [uno_id: string]: string };
};

export type FullførtUtdanning = "A" | "04" | "5";
