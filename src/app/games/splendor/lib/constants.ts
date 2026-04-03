import { GemColor, TokenCounts } from './types';

export const GEM_COLORS: GemColor[] = ['white', 'blue', 'green', 'red', 'black'];

export const TOKEN_COUNTS_BY_PLAYERS: Record<number, { gems: number; gold: number }> = {
  2: { gems: 4, gold: 5 },
  3: { gems: 5, gold: 5 },
  4: { gems: 7, gold: 5 },
};

export const MAX_TOKENS = 10;
export const MAX_RESERVED = 3;
export const WIN_THRESHOLD = 15;
export const CARDS_PER_ROW = 4;

export const EMPTY_GEMS = (): Record<GemColor, number> => ({
  white: 0, blue: 0, green: 0, red: 0, black: 0,
});

export const EMPTY_TOKENS = (): TokenCounts => ({
  white: 0, blue: 0, green: 0, red: 0, black: 0, gold: 0,
});

export const GEM_STYLES: Record<GemColor, { bg: string; ring: string; text: string; label: string; emoji: string }> = {
  white:  { bg: 'bg-gray-100',    ring: 'ring-gray-300',    text: 'text-gray-800', label: 'Diamond',  emoji: '💎' },
  blue:   { bg: 'bg-blue-600',    ring: 'ring-blue-400',    text: 'text-white',    label: 'Sapphire', emoji: '🔵' },
  green:  { bg: 'bg-emerald-600', ring: 'ring-emerald-400', text: 'text-white',    label: 'Emerald',  emoji: '🟢' },
  red:    { bg: 'bg-red-600',     ring: 'ring-red-400',     text: 'text-white',    label: 'Ruby',     emoji: '🔴' },
  black:  { bg: 'bg-gray-800',    ring: 'ring-gray-500',    text: 'text-white',    label: 'Onyx',     emoji: '⚫' },
};

export const GOLD_STYLE = {
  bg: 'bg-yellow-500',
  ring: 'ring-yellow-300',
  text: 'text-yellow-900',
  label: 'Gold',
  emoji: '🟡',
};
