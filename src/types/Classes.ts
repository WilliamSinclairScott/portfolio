export interface BaseClass {
  name: string;
  source: string;
  page: number;
  edition: string;
  primaryAbility: {
    key : boolean;
  }[];
  class: ClassDetails[];
  subclass: SubclassDetails[];
  classFeature: ClassFeature[];
  subclassFeature: SubclassFeature[];
}

interface ClassDetails {
  hd: {
    number: number;
    faces: number;
  };
  proficiency: string[];
  featProgression: FeatProgression[];
  startingProficiencies: StartingProficiencies;
  startingEquipment: StartingEquipment;
  multiclassing: Multiclassing;
  classTableGroups: ClassTableGroup[];
  classFeatures: string[];
}

//TODO: is record best type here?
interface FeatProgression {
  name: string;
  category: string[];
  progression: Record<number, number>;
}

interface StartingProficiencies {
  armor: string[];
  weapons: string[];
  skills: {
    choose: {
      from: string[];
      count: number;
    };
  }[];
}

interface StartingEquipment {
  additionalFromBackground: boolean;
  defaultData: {
    A: EquipmentItem[];
    B: {
      value: number;
    }[];
  }[];
  entries: string[];
}

interface EquipmentItem {
  item: string;
  quantity?: number;
}

interface Multiclassing {
  proficienciesGained: {
    armor: string[];
    weapons: string[];
  };
}

interface ClassTableGroup {
  colLabels: string[];
  rows: (string | ClassTableRow)[];
}

interface ClassTableRow {
  type: string;
  value: number;
}

interface ClassFeature {
  name: string;
  source: string;
  page: number;
  className: string;
  classSource: string;
  level: number;
  entries: (string | FeatureEntries)[];
}

interface FeatureEntries {
  type: string;
  name?: string;
  entries?: string[];
  items?: string[];
}

interface SubclassDetails {
  name: string;
  shortName: string;
  source: string;
  className: string;
  classSource: string;
  page: number;
  edition: string;
  subclassFeatures: string[];
  hasFluffImages: boolean;
  additionalSpells?: AdditionalSpells;
}

interface AdditionalSpells {
  innate: Record<number, InnateSpell>;
}

interface InnateSpell {
  ritual: string[];
}

interface SubclassFeature {
  name: string;
  source: string;
  page: number;
  className: string;
  classSource: string;
  subclassShortName: string;
  subclassSource: string;
  level: number;
  header?: number;
  entries: (string | SubclassFeatureEntries)[];
}

interface SubclassFeatureEntries {
  type: string;
  name?: string;
  entries?: string[];
  subclassFeature?: string;
}
