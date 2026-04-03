import { DevelopmentCard, GemColor, NobleTile, Player, TokenCounts } from './types';
import { GEM_COLORS, EMPTY_TOKENS } from './constants';

export function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function totalTokens(tokens: TokenCounts): number {
  return Object.values(tokens).reduce((sum, n) => sum + n, 0);
}

export function getPlayerBonuses(player: Player): Record<GemColor, number> {
  const bonuses: Record<GemColor, number> = { white: 0, blue: 0, green: 0, red: 0, black: 0 };
  for (const card of player.purchased) {
    bonuses[card.bonus]++;
  }
  return bonuses;
}

export function canAffordCard(player: Player, card: DevelopmentCard): boolean {
  const bonuses = getPlayerBonuses(player);
  let goldNeeded = 0;

  for (const color of GEM_COLORS) {
    const effective = Math.max(0, card.cost[color] - bonuses[color]);
    const deficit = Math.max(0, effective - player.tokens[color]);
    goldNeeded += deficit;
  }

  return goldNeeded <= player.tokens.gold;
}

export function calculatePayment(player: Player, card: DevelopmentCard): TokenCounts {
  const bonuses = getPlayerBonuses(player);
  const payment = EMPTY_TOKENS();
  let goldUsed = 0;

  for (const color of GEM_COLORS) {
    const effective = Math.max(0, card.cost[color] - bonuses[color]);
    const fromTokens = Math.min(effective, player.tokens[color]);
    payment[color] = fromTokens;
    goldUsed += effective - fromTokens;
  }

  payment.gold = goldUsed;
  return payment;
}

export function meetsNobleRequirements(player: Player, noble: NobleTile): boolean {
  const bonuses = getPlayerBonuses(player);
  return GEM_COLORS.every(color => bonuses[color] >= noble.requirements[color]);
}

export function playerScore(player: Player): number {
  const cardPoints = player.purchased.reduce((sum, card) => sum + card.points, 0);
  const noblePoints = player.nobles.reduce((sum, noble) => sum + noble.points, 0);
  return cardPoints + noblePoints;
}
