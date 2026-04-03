import { GameState, GameAction, GemColor, Tier } from './types';
import { GEM_COLORS, MAX_TOKENS, MAX_RESERVED, WIN_THRESHOLD, EMPTY_TOKENS } from './constants';
import { totalTokens, canAffordCard, calculatePayment, meetsNobleRequirements, playerScore, getPlayerBonuses } from './helpers';
import { initializeGame } from './setup';

function cloneState(state: GameState): GameState {
  return JSON.parse(JSON.stringify(state));
}

function refillFaceUp(state: GameState, tier: Tier, slotIndex: number): void {
  const tierData = state.tiers[tier];
  if (tierData.deck.length > 0) {
    tierData.faceUp[slotIndex] = tierData.deck.shift()!;
  } else {
    tierData.faceUp[slotIndex] = null;
  }
}

function checkNobleVisit(state: GameState): void {
  const player = state.players[state.currentPlayerIndex];
  for (let i = 0; i < state.nobles.length; i++) {
    if (meetsNobleRequirements(player, state.nobles[i])) {
      player.nobles.push(state.nobles[i]);
      state.nobles.splice(i, 1);
      player.score = playerScore(player);
      return; // Only one noble per turn
    }
  }
}

function advanceTurn(state: GameState): void {
  checkNobleVisit(state);

  const player = state.players[state.currentPlayerIndex];
  player.score = playerScore(player);
  player.bonuses = getPlayerBonuses(player);

  // Check for final round trigger
  if (!state.finalRound && player.score >= WIN_THRESHOLD) {
    state.finalRound = true;
    state.finalRoundStartPlayer = state.currentPlayerIndex;
  }

  // Move to next player
  const nextPlayer = (state.currentPlayerIndex + 1) % state.playerCount;

  // Check if the round is complete and someone triggered final round
  if (state.finalRound && nextPlayer === (state.finalRoundStartPlayer! + 1) % state.playerCount) {
    // Game over — find winner
    state.phase = 'finished';
    state.turnPhase = 'game_over';

    let bestPlayer = 0;
    let bestScore = -1;
    let fewestCards = Infinity;
    for (let i = 0; i < state.players.length; i++) {
      const p = state.players[i];
      if (p.score > bestScore || (p.score === bestScore && p.purchased.length < fewestCards)) {
        bestPlayer = i;
        bestScore = p.score;
        fewestCards = p.purchased.length;
      }
    }
    state.winner = bestPlayer;
    return;
  }

  state.currentPlayerIndex = nextPlayer;
  state.turnPhase = 'idle';
  state.selectedTokens = [];
  state.turnNumber++;
}

function checkTokenLimit(state: GameState): boolean {
  const player = state.players[state.currentPlayerIndex];
  if (totalTokens(player.tokens) > MAX_TOKENS) {
    state.turnPhase = 'returning_tokens';
    return true;
  }
  return false;
}

export const initialState: GameState = {
  phase: 'setup',
  turnPhase: 'idle',
  playerCount: 2,
  players: [],
  currentPlayerIndex: 0,
  tokenBank: EMPTY_TOKENS(),
  tiers: {
    1: { faceUp: [], deck: [] },
    2: { faceUp: [], deck: [] },
    3: { faceUp: [], deck: [] },
  },
  nobles: [],
  selectedTokens: [],
  finalRound: false,
  finalRoundStartPlayer: null,
  winner: null,
  turnNumber: 1,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      return initializeGame(action.playerCount);
    }

    case 'NEW_GAME': {
      return { ...initialState };
    }

    case 'SELECT_TOKEN': {
      if (state.turnPhase !== 'idle' && state.turnPhase !== 'taking_tokens') return state;
      const s = cloneState(state);
      const color = action.color;

      // Can't select more than 3 tokens
      if (s.selectedTokens.length >= 3) return state;
      // Can't select same color twice (that's TAKE_TWO_SAME)
      if (s.selectedTokens.includes(color)) return state;
      // Must have tokens available
      if (s.tokenBank[color] <= 0) return state;

      s.selectedTokens.push(color);
      s.turnPhase = 'taking_tokens';
      return s;
    }

    case 'DESELECT_TOKEN': {
      if (state.turnPhase !== 'taking_tokens') return state;
      const s = cloneState(state);
      const idx = s.selectedTokens.indexOf(action.color);
      if (idx === -1) return state;
      s.selectedTokens.splice(idx, 1);
      if (s.selectedTokens.length === 0) {
        s.turnPhase = 'idle';
      }
      return s;
    }

    case 'CONFIRM_TAKE_TOKENS': {
      if (state.turnPhase !== 'taking_tokens') return state;
      if (state.selectedTokens.length === 0) return state;
      const s = cloneState(state);
      const player = s.players[s.currentPlayerIndex];

      for (const color of s.selectedTokens) {
        if (s.tokenBank[color as GemColor] > 0) {
          s.tokenBank[color as GemColor]--;
          player.tokens[color as GemColor]++;
        }
      }

      s.selectedTokens = [];
      if (!checkTokenLimit(s)) {
        advanceTurn(s);
      }
      return s;
    }

    case 'TAKE_TWO_SAME': {
      if (state.turnPhase !== 'idle') return state;
      const color = action.color;
      // Must have 4+ of that color in bank
      if (state.tokenBank[color] < 4) return state;

      const s = cloneState(state);
      const player = s.players[s.currentPlayerIndex];
      s.tokenBank[color] -= 2;
      player.tokens[color] += 2;

      if (!checkTokenLimit(s)) {
        advanceTurn(s);
      }
      return s;
    }

    case 'PURCHASE_CARD': {
      if (state.turnPhase !== 'idle') return state;
      const { card, source } = action;
      const player = state.players[state.currentPlayerIndex];
      if (!canAffordCard(player, card)) return state;

      const s = cloneState(state);
      const sPlayer = s.players[s.currentPlayerIndex];
      const payment = calculatePayment(sPlayer, card);

      // Pay tokens
      for (const color of [...GEM_COLORS, 'gold' as const]) {
        sPlayer.tokens[color] -= payment[color];
        s.tokenBank[color] += payment[color];
      }

      // Add card to purchased
      sPlayer.purchased.push(card);
      sPlayer.bonuses = getPlayerBonuses(sPlayer);
      sPlayer.score = playerScore(sPlayer);

      if (source === 'table') {
        // Find and replace the card in faceUp
        for (const tier of [1, 2, 3] as Tier[]) {
          const idx = s.tiers[tier].faceUp.findIndex(c => c?.id === card.id);
          if (idx !== -1) {
            refillFaceUp(s, tier, idx);
            break;
          }
        }
      } else {
        // Remove from reserved
        const idx = sPlayer.reserved.findIndex(c => c.id === card.id);
        if (idx !== -1) {
          sPlayer.reserved.splice(idx, 1);
        }
      }

      advanceTurn(s);
      return s;
    }

    case 'RESERVE_CARD': {
      if (state.turnPhase !== 'idle') return state;
      const player = state.players[state.currentPlayerIndex];
      if (player.reserved.length >= MAX_RESERVED) return state;

      const s = cloneState(state);
      const sPlayer = s.players[s.currentPlayerIndex];

      // Add card to reserved
      sPlayer.reserved.push(action.card);

      // Give gold token if available
      if (s.tokenBank.gold > 0) {
        s.tokenBank.gold--;
        sPlayer.tokens.gold++;
      }

      // Remove from faceUp and refill
      const idx = s.tiers[action.tier].faceUp.findIndex(c => c?.id === action.card.id);
      if (idx !== -1) {
        refillFaceUp(s, action.tier, idx);
      }

      if (!checkTokenLimit(s)) {
        advanceTurn(s);
      }
      return s;
    }

    case 'RESERVE_FROM_DECK': {
      if (state.turnPhase !== 'idle') return state;
      const player = state.players[state.currentPlayerIndex];
      if (player.reserved.length >= MAX_RESERVED) return state;
      if (state.tiers[action.tier].deck.length === 0) return state;

      const s = cloneState(state);
      const sPlayer = s.players[s.currentPlayerIndex];

      const card = s.tiers[action.tier].deck.shift()!;
      sPlayer.reserved.push(card);

      if (s.tokenBank.gold > 0) {
        s.tokenBank.gold--;
        sPlayer.tokens.gold++;
      }

      if (!checkTokenLimit(s)) {
        advanceTurn(s);
      }
      return s;
    }

    case 'RETURN_TOKEN': {
      if (state.turnPhase !== 'returning_tokens') return state;
      const player = state.players[state.currentPlayerIndex];
      if (player.tokens[action.color] <= 0) return state;

      const s = cloneState(state);
      const sPlayer = s.players[s.currentPlayerIndex];
      sPlayer.tokens[action.color]--;
      s.tokenBank[action.color]++;
      return s;
    }

    case 'CONFIRM_RETURN_TOKENS': {
      if (state.turnPhase !== 'returning_tokens') return state;
      const player = state.players[state.currentPlayerIndex];
      if (totalTokens(player.tokens) > MAX_TOKENS) return state;

      const s = cloneState(state);
      advanceTurn(s);
      return s;
    }

    case 'CANCEL_ACTION': {
      if (state.turnPhase === 'taking_tokens') {
        const s = cloneState(state);
        s.selectedTokens = [];
        s.turnPhase = 'idle';
        return s;
      }
      return state;
    }

    default:
      return state;
  }
}
