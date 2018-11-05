import noder_sammenligningstjeneste from "./noder_sammenligningstjeneste.json";

interface INodeObject {
  interesse: string[];
  title: string;
}

interface INode {
  node: INodeObject;
}

export interface IAreaConfig {
  nodes: INodeObject[];
  // interests: string[];
}

function getAreaConfig(area: INode[]): IAreaConfig {
  // const interestsSet = new Set<string>([]);
  const nodes = area.map(node => {
    if (node.node.interesse) {
      node.node.interesse.forEach(element => {
        // interestsSet.add(element);
      });
    }
    return node.node;
  });
  // const interests = Array.from(interestsSet).sort();
  return {
    nodes
    // interests
  };
}

export function getConfig(
  result: (config: IAreaConfig) => void,
  area: string
): void {
  result(getAreaConfig((<any>noder_sammenligningstjeneste)[area]));
}
