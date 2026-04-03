export type GemColor = 'white' | 'blue' | 'green' | 'red' | 'black';
export type TokenColor = GemColor | 'gold';
export type Tier = 1 | 2 | 3;

export type GemCounts = Record<GemColor, number>;
export type TokenCounts = Record<TokenColor, number>;

export interface DevelopmentCard {
  id: number;
  tier: Tier;
  cost: GemCounts;
  points: number;
  bonus: GemColor;
}

export interface NobleTile {
  id: number;
  points: 3;
  requirements: GemCounts;
}

export interface Player {
  id: number;
  name: string;
  tokens: TokenCounts;
  bonuses: GemCounts;
  purchased: DevelopmentCard[];
  reserved: DevelopmentCard[];
  nobles: NobleTile[];
  score: number;
}

export type TurnPhase =
  | 'idle'
  | 'taking_tokens'
  | 'returning_tokens'
  | 'game_over';

export interface GameState {
  phase: 'setup' | 'playing' | 'finished';
  turnPhase: TurnPhase;
  playerCount: number;
  players: Player[];
  currentPlayerIndex: number;
  tokenBank: TokenCounts;
  tiers: Record<Tier, { faceUp: (DevelopmentCard | null)[]; deck: DevelopmentCard[] }>;
  nobles: NobleTile[];
  selectedTokens: TokenColor[];
  finalRound: boolean;
  finalRoundStartPlayer: number | null;
  winner: number | null;
  turnNumber: number;
}

export type GameAction =
  | { type: 'START_GAME'; playerCount: number }
  | { type: 'SELECT_TOKEN'; color: GemColor }
  | { type: 'DESELECT_TOKEN'; color: GemColor }
  | { type: 'CONFIRM_TAKE_TOKENS' }
  | { type: 'TAKE_TWO_SAME'; color: GemColor }
  | { type: 'PURCHASE_CARD'; card: DevelopmentCard; source: 'table' | 'reserved' }
  | { type: 'RESERVE_CARD'; card: DevelopmentCard; tier: Tier }
  | { type: 'RESERVE_FROM_DECK'; tier: Tier }
  | { type: 'RETURN_TOKEN'; color: TokenColor }
  | { type: 'CONFIRM_RETURN_TOKENS' }
  | { type: 'CANCEL_ACTION' }
  | { type: 'NEW_GAME' };
