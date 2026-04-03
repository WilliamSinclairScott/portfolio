import { DevelopmentCard, NobleTile } from './types';

// Helper to create cost objects
const c = (
  white: number,
  blue: number,
  green: number,
  red: number,
  black: number
) => ({
  white,
  blue,
  green,
  red,
  black,
});

// =============================================================================
// TIER 1 CARDS (40 total — 8 per gem color, mostly 0 pts, eight 1-pt cards)
// =============================================================================
export const TIER_1_CARDS: DevelopmentCard[] = [
  // ---- White bonus (8 cards) ----
  { id: 1, tier: 1, bonus: 'white', points: 0, cost: c(0, 1, 1, 1, 1) },
  { id: 2, tier: 1, bonus: 'white', points: 0, cost: c(0, 1, 2, 1, 1) },
  { id: 3, tier: 1, bonus: 'white', points: 0, cost: c(0, 2, 2, 1, 0) },
  { id: 4, tier: 1, bonus: 'white', points: 0, cost: c(0, 0, 0, 3, 0) },
  { id: 5, tier: 1, bonus: 'white', points: 0, cost: c(0, 1, 0, 0, 2) },
  { id: 6, tier: 1, bonus: 'white', points: 0, cost: c(0, 2, 0, 0, 2) },
  { id: 7, tier: 1, bonus: 'white', points: 0, cost: c(3, 1, 0, 0, 1) },
  { id: 8, tier: 1, bonus: 'white', points: 1, cost: c(0, 0, 4, 0, 0) },

  // ---- Blue bonus (8 cards) ----
  { id: 9, tier: 1, bonus: 'blue', points: 0, cost: c(1, 0, 1, 1, 1) },
  { id: 10, tier: 1, bonus: 'blue', points: 0, cost: c(1, 0, 1, 2, 1) },
  { id: 11, tier: 1, bonus: 'blue', points: 0, cost: c(1, 0, 2, 2, 0) },
  { id: 12, tier: 1, bonus: 'blue', points: 0, cost: c(0, 0, 0, 0, 3) },
  { id: 13, tier: 1, bonus: 'blue', points: 0, cost: c(0, 0, 2, 0, 1) },
  { id: 14, tier: 1, bonus: 'blue', points: 0, cost: c(0, 0, 2, 2, 0) },
  { id: 15, tier: 1, bonus: 'blue', points: 0, cost: c(1, 3, 1, 0, 0) },
  { id: 16, tier: 1, bonus: 'blue', points: 1, cost: c(0, 0, 0, 4, 0) },

  // ---- Green bonus (8 cards) ----
  { id: 17, tier: 1, bonus: 'green', points: 0, cost: c(1, 1, 0, 1, 1) },
  { id: 18, tier: 1, bonus: 'green', points: 0, cost: c(1, 1, 0, 1, 2) },
  { id: 19, tier: 1, bonus: 'green', points: 0, cost: c(0, 1, 0, 2, 2) },
  { id: 20, tier: 1, bonus: 'green', points: 0, cost: c(0, 0, 0, 0, 3) },
  { id: 21, tier: 1, bonus: 'green', points: 0, cost: c(2, 1, 0, 0, 0) },
  { id: 22, tier: 1, bonus: 'green', points: 0, cost: c(2, 0, 0, 2, 0) },
  { id: 23, tier: 1, bonus: 'green', points: 0, cost: c(0, 0, 3, 1, 1) },
  { id: 24, tier: 1, bonus: 'green', points: 1, cost: c(0, 0, 0, 0, 4) },

  // ---- Red bonus (8 cards) ----
  { id: 25, tier: 1, bonus: 'red', points: 0, cost: c(1, 1, 1, 0, 1) },
  { id: 26, tier: 1, bonus: 'red', points: 0, cost: c(2, 1, 1, 0, 1) },
  { id: 27, tier: 1, bonus: 'red', points: 0, cost: c(2, 0, 1, 0, 2) },
  { id: 28, tier: 1, bonus: 'red', points: 0, cost: c(3, 0, 0, 0, 0) },
  { id: 29, tier: 1, bonus: 'red', points: 0, cost: c(0, 2, 1, 0, 0) },
  { id: 30, tier: 1, bonus: 'red', points: 0, cost: c(0, 2, 0, 0, 2) },
  { id: 31, tier: 1, bonus: 'red', points: 0, cost: c(1, 0, 1, 3, 0) },
  { id: 32, tier: 1, bonus: 'red', points: 1, cost: c(4, 0, 0, 0, 0) },

  // ---- Black bonus (8 cards) ----
  { id: 33, tier: 1, bonus: 'black', points: 0, cost: c(1, 1, 1, 1, 0) },
  { id: 34, tier: 1, bonus: 'black', points: 0, cost: c(1, 2, 1, 1, 0) },
  { id: 35, tier: 1, bonus: 'black', points: 0, cost: c(2, 2, 0, 1, 0) },
  { id: 36, tier: 1, bonus: 'black', points: 0, cost: c(0, 3, 0, 0, 0) },
  { id: 37, tier: 1, bonus: 'black', points: 0, cost: c(2, 0, 0, 1, 0) },
  { id: 38, tier: 1, bonus: 'black', points: 0, cost: c(0, 0, 2, 0, 2) },
  { id: 39, tier: 1, bonus: 'black', points: 0, cost: c(0, 1, 0, 1, 3) },
  { id: 40, tier: 1, bonus: 'black', points: 1, cost: c(0, 4, 0, 0, 0) },
];

// =============================================================================
// TIER 2 CARDS (30 total — 6 per gem color, 1–3 pts)
// =============================================================================
export const TIER_2_CARDS: DevelopmentCard[] = [
  // ---- White bonus (6 cards) ----
  { id: 41, tier: 2, bonus: 'white', points: 1, cost: c(0, 0, 3, 2, 2) },
  { id: 42, tier: 2, bonus: 'white', points: 1, cost: c(2, 3, 0, 3, 0) },
  { id: 43, tier: 2, bonus: 'white', points: 2, cost: c(0, 0, 1, 4, 2) },
  { id: 44, tier: 2, bonus: 'white', points: 2, cost: c(0, 0, 0, 5, 0) },
  { id: 45, tier: 2, bonus: 'white', points: 2, cost: c(0, 0, 0, 5, 3) },
  { id: 46, tier: 2, bonus: 'white', points: 3, cost: c(6, 0, 0, 0, 0) },

  // ---- Blue bonus (6 cards) ----
  { id: 47, tier: 2, bonus: 'blue', points: 1, cost: c(0, 2, 2, 3, 0) },
  { id: 48, tier: 2, bonus: 'blue', points: 1, cost: c(0, 2, 3, 0, 3) },
  { id: 49, tier: 2, bonus: 'blue', points: 2, cost: c(5, 3, 0, 0, 0) },
  { id: 50, tier: 2, bonus: 'blue', points: 2, cost: c(0, 0, 0, 0, 5) },
  { id: 51, tier: 2, bonus: 'blue', points: 2, cost: c(2, 0, 0, 1, 4) },
  { id: 52, tier: 2, bonus: 'blue', points: 3, cost: c(0, 6, 0, 0, 0) },

  // ---- Green bonus (6 cards) ----
  { id: 53, tier: 2, bonus: 'green', points: 1, cost: c(3, 0, 2, 3, 0) },
  { id: 54, tier: 2, bonus: 'green', points: 1, cost: c(2, 3, 0, 0, 2) },
  { id: 55, tier: 2, bonus: 'green', points: 2, cost: c(4, 2, 0, 0, 1) },
  { id: 56, tier: 2, bonus: 'green', points: 2, cost: c(0, 5, 0, 0, 0) },
  { id: 57, tier: 2, bonus: 'green', points: 2, cost: c(0, 5, 3, 0, 0) },
  { id: 58, tier: 2, bonus: 'green', points: 3, cost: c(0, 0, 6, 0, 0) },

  // ---- Red bonus (6 cards) ----
  { id: 59, tier: 2, bonus: 'red', points: 1, cost: c(2, 0, 0, 2, 3) },
  { id: 60, tier: 2, bonus: 'red', points: 1, cost: c(3, 0, 3, 0, 2) },
  { id: 61, tier: 2, bonus: 'red', points: 2, cost: c(1, 4, 2, 0, 0) },
  { id: 62, tier: 2, bonus: 'red', points: 2, cost: c(0, 0, 0, 0, 5) },
  { id: 63, tier: 2, bonus: 'red', points: 2, cost: c(3, 0, 0, 0, 5) },
  { id: 64, tier: 2, bonus: 'red', points: 3, cost: c(0, 0, 0, 6, 0) },

  // ---- Black bonus (6 cards) ----
  { id: 65, tier: 2, bonus: 'black', points: 1, cost: c(3, 2, 2, 0, 0) },
  { id: 66, tier: 2, bonus: 'black', points: 1, cost: c(0, 3, 0, 2, 3) },
  { id: 67, tier: 2, bonus: 'black', points: 2, cost: c(0, 1, 4, 2, 0) },
  { id: 68, tier: 2, bonus: 'black', points: 2, cost: c(5, 0, 0, 0, 0) },
  { id: 69, tier: 2, bonus: 'black', points: 2, cost: c(0, 0, 5, 3, 0) },
  { id: 70, tier: 2, bonus: 'black', points: 3, cost: c(0, 0, 0, 0, 6) },
];

// =============================================================================
// TIER 3 CARDS (20 total — 4 per gem color, 3–5 pts)
// =============================================================================
export const TIER_3_CARDS: DevelopmentCard[] = [
  // ---- White bonus (4 cards) ----
  { id: 71, tier: 3, bonus: 'white', points: 3, cost: c(3, 3, 5, 3, 0) },
  { id: 72, tier: 3, bonus: 'white', points: 4, cost: c(0, 0, 0, 0, 7) },
  { id: 73, tier: 3, bonus: 'white', points: 4, cost: c(3, 0, 0, 0, 7) },
  { id: 74, tier: 3, bonus: 'white', points: 5, cost: c(3, 0, 0, 0, 7) },

  // ---- Blue bonus (4 cards) ----
  { id: 75, tier: 3, bonus: 'blue', points: 3, cost: c(3, 0, 3, 3, 5) },
  { id: 76, tier: 3, bonus: 'blue', points: 4, cost: c(7, 0, 0, 0, 0) },
  { id: 77, tier: 3, bonus: 'blue', points: 4, cost: c(7, 3, 0, 0, 0) },
  { id: 78, tier: 3, bonus: 'blue', points: 5, cost: c(7, 3, 0, 0, 0) },

  // ---- Green bonus (4 cards) ----
  { id: 79, tier: 3, bonus: 'green', points: 3, cost: c(5, 3, 0, 3, 3) },
  { id: 80, tier: 3, bonus: 'green', points: 4, cost: c(0, 7, 0, 0, 0) },
  { id: 81, tier: 3, bonus: 'green', points: 4, cost: c(0, 7, 3, 0, 0) },
  { id: 82, tier: 3, bonus: 'green', points: 5, cost: c(0, 7, 3, 0, 0) },

  // ---- Red bonus (4 cards) ----
  { id: 83, tier: 3, bonus: 'red', points: 3, cost: c(3, 5, 3, 0, 3) },
  { id: 84, tier: 3, bonus: 'red', points: 4, cost: c(0, 0, 7, 0, 0) },
  { id: 85, tier: 3, bonus: 'red', points: 4, cost: c(0, 0, 7, 3, 0) },
  { id: 86, tier: 3, bonus: 'red', points: 5, cost: c(0, 0, 7, 3, 0) },

  // ---- Black bonus (4 cards) ----
  { id: 87, tier: 3, bonus: 'black', points: 3, cost: c(0, 3, 3, 5, 3) },
  { id: 88, tier: 3, bonus: 'black', points: 4, cost: c(0, 0, 0, 7, 0) },
  { id: 89, tier: 3, bonus: 'black', points: 4, cost: c(0, 0, 0, 7, 3) },
  { id: 90, tier: 3, bonus: 'black', points: 5, cost: c(0, 0, 0, 7, 3) },
];

// =============================================================================
// NOBLES (10 tiles — each worth 3 pts, require gem bonuses)
// =============================================================================
// Requirements use the same GemCounts shape — these refer to *bonus* cards owned.
// Patterns: four 4+4 nobles and six 3+3+3 nobles.
const r = c; // alias for readability

export const ALL_NOBLES: NobleTile[] = [
  // 4+4 pattern nobles
  { id: 1, points: 3, requirements: r(0, 0, 4, 4, 0) },
  { id: 2, points: 3, requirements: r(3, 3, 3, 0, 0) },
  { id: 3, points: 3, requirements: r(0, 0, 0, 4, 4) },
  { id: 4, points: 3, requirements: r(4, 0, 0, 0, 4) },
  { id: 5, points: 3, requirements: r(4, 4, 0, 0, 0) },
  // 3+3+3 pattern nobles
  { id: 6, points: 3, requirements: r(3, 0, 0, 3, 3) },
  { id: 7, points: 3, requirements: r(0, 3, 3, 3, 0) },
  { id: 8, points: 3, requirements: r(3, 3, 0, 0, 3) },
  { id: 9, points: 3, requirements: r(0, 0, 3, 3, 3) },
  { id: 10, points: 3, requirements: r(0, 3, 3, 0, 3) },
];
