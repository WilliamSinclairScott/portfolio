import { GameState, Player, Tier } from './types';
import { TIER_1_CARDS, TIER_2_CARDS, TIER_3_CARDS, ALL_NOBLES } from './cards';
import { TOKEN_COUNTS_BY_PLAYERS, EMPTY_GEMS, EMPTY_TOKENS, GEM_COLORS, CARDS_PER_ROW } from './constants';
import { shuffleDeck } from './helpers';

function createPlayer(id: number): Player {
  return {
    id,
    name: `Player ${id + 1}`,
    tokens: EMPTY_TOKENS(),
    bonuses: EMPTY_GEMS(),
    purchased: [],
    reserved: [],
    nobles: [],
    score: 0,
  };
}

export function initializeGame(playerCount: number): GameState {
  const config = TOKEN_COUNTS_BY_PLAYERS[playerCount];

  const tokenBank = EMPTY_TOKENS();
  for (const color of GEM_COLORS) {
    tokenBank[color] = config.gems;
  }
  tokenBank.gold = config.gold;

  const tier1Deck = shuffleDeck([...TIER_1_CARDS]);
  const tier2Deck = shuffleDeck([...TIER_2_CARDS]);
  const tier3Deck = shuffleDeck([...TIER_3_CARDS]);

  const dealCards = (deck: typeof tier1Deck) => {
    const faceUp = deck.splice(0, CARDS_PER_ROW);
    // Pad with nulls if deck is smaller than CARDS_PER_ROW
    while (faceUp.length < CARDS_PER_ROW) {
      faceUp.push(null as never);
    }
    return { faceUp, deck };
  };

  const nobles = shuffleDeck([...ALL_NOBLES]).slice(0, playerCount + 1);

  return {
    phase: 'playing',
    turnPhase: 'idle',
    playerCount,
    players: Array.from({ length: playerCount }, (_, i) => createPlayer(i)),
    currentPlayerIndex: 0,
    tokenBank,
    tiers: {
      1: dealCards(tier1Deck),
      2: dealCards(tier2Deck),
      3: dealCards(tier3Deck),
    } as Record<Tier, { faceUp: (typeof TIER_1_CARDS[number] | null)[]; deck: typeof TIER_1_CARDS }>,
    nobles,
    selectedTokens: [],
    finalRound: false,
    finalRoundStartPlayer: null,
    winner: null,
    turnNumber: 1,
  };
}
