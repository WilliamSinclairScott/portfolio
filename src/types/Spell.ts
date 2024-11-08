interface TimeEntry {
  number: number;
  unit: string;
}

type Time = TimeEntry[];

export interface Distance {
  amount?: number;
  type: string;
}

export interface Range {
  type: string;
  distance?: Distance | string;
}

interface DurationBase {
  type: 'instant' | 'timed' | 'special' | 'permanent';
}

interface InstantDuration extends DurationBase {
  type: "instant";
}

interface TimedDuration extends DurationBase {
  type: "timed";
  duration: {
    type: string;
    amount: number;
  };
  concentration?: boolean;
}

interface SpecialDuration extends DurationBase {
  type: "special";
}

interface PermanentDuration extends DurationBase {
  type: "permanent";
}

export type Duration = InstantDuration | TimedDuration | SpecialDuration | PermanentDuration;

interface ScalingLevelDiceByLevel {
  [level: number]: string;
}

interface ScalingLevelDiceByCharacterLevel {
  characterLevel: {
    [level: number]: string;
  };
}

type ScalingLevelDice = ScalingLevelDiceByLevel | ScalingLevelDiceByCharacterLevel;

interface TextEntry {
  type?: undefined;
  name?: undefined;
  entries?: undefined;
}

interface ObjectEntry {
  type: "entries";
  name: string;
  entries: string[];
}

type EntriesHigherLevel = TextEntry | ObjectEntry;

export interface Spell {
  name: string;
  level: number;
  source: string;
  page: number;
  freeRules2024: boolean;
  school: string;
  time: Time;
  range: Range;
  components: {
    v?: boolean;
    s?: boolean;
    m?: string;
  };
  duration: Duration[];
  entries: string[];
  entriesHigherLevel?: EntriesHigherLevel;
  scalingLevelDice?: ScalingLevelDice;
  damageInflict?: string[];
  savingThrow?: string[];
  miscTags?: string[];
  areaTags?: string[];
  affectsCreatureType?: string[];
  conditionInflict?: string[];
  spellAttack?: string[];
  damageResist?: string[];
  abilityCheck?: string[];
  meta?: {
    ritual?: boolean;
  };
  hasFluffImages?: boolean;
}

export interface SpellsXPHB {
  spell: Spell[];
}