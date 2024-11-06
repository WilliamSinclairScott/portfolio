interface TimeEntry {
  number: number;
  unit: string;
}

type Time = TimeEntry[];

interface RangeBase {
  type: string;
}

interface DistanceRange extends RangeBase {
  type: "distance";
  distance: {
    type: string;
    amount: number;
  };
}

interface SelfRange extends RangeBase {
  type: "self";
}

interface TouchRange extends RangeBase {
  type: "touch";
}

interface SightRange extends RangeBase {
  type: "sight";
}

interface UnlimitedRange extends RangeBase {
  type: "unlimited";
}

type Range = DistanceRange | SelfRange | TouchRange | SightRange | UnlimitedRange | object;

interface DurationBase {
  type: string;
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

type Duration = InstantDuration | TimedDuration | SpecialDuration;

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
  source: string;
  page: number;
  freeRules2024: boolean;
  level: number;
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