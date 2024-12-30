export interface SkillTree {
  tree: string;
  classes: Class[];
  alternate_ascendancies: unknown[];
  groups: { [key: string]: Group };
  nodes: { [key: string]: Node };
  extraImages: unknown[];
  jewelSlots: number[];
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
  constants: {
    PSSCentreInnerRadius: number;
    skillsPerOrbit: number[];
    orbitRadii: number[];
  };
  sprites: unknown[];
  imageZoomLevels: number[];
  points: {
    totalPoints: number;
    ascendancyPoints: number;
  };
}

export interface Class {
  name: string;
  base_str: number;
  base_dex: number;
  base_int: number;
  ascendancies: Ascendancy[];
}

export interface Ascendancy {
  id: string;
  name: string;
  flavourText: string;
  flavourTextColour: string;
  flavourTextRect: {
    x: string;
    y: string;
    width: string;
    height: string;
  };
}
export interface Group {
  x: number;
  y: number;
  orbits: number[];
  nodes: string[];
}

export interface Node {
  skill: number;
  group: number;
  orbit: number;
  orbitIndex: number;
  out: string[];
  in: string[];
  name: string;
  icon: string;
  stats: string[];
  ascendancyName?: string;
  isMastery?: boolean;
  isNotable?: boolean;
}