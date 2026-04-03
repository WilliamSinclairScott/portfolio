'use client';

import { GameState, GameAction, Tier, DevelopmentCard } from '../lib/types';
import { MAX_RESERVED } from '../lib/constants';
import { canAffordCard } from '../lib/helpers';
import CardDisplay, { EmptyCardSlot, DeckIndicator } from './CardDisplay';
import { useState } from 'react';

interface CardRowProps {
  tier: Tier;
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function CardRow({ tier, state, dispatch }: CardRowProps) {
  const tierData = state.tiers[tier];
  const player = state.players[state.currentPlayerIndex];
  const isIdle = state.turnPhase === 'idle';
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const canReserve = player.reserved.length < MAX_RESERVED;

  const handleCardClick = (card: DevelopmentCard) => {
    if (!isIdle) return;
    if (selectedCardId === card.id) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(card.id);
    }
  };

  const handlePurchase = (card: DevelopmentCard) => {
    dispatch({ type: 'PURCHASE_CARD', card, source: 'table' });
    setSelectedCardId(null);
  };

  const handleReserve = (card: DevelopmentCard) => {
    dispatch({ type: 'RESERVE_CARD', card, tier });
    setSelectedCardId(null);
  };

  return (
    <div className="flex gap-2 items-center">
      <DeckIndicator
        count={tierData.deck.length}
        tier={tier}
        onClick={isIdle && canReserve ? () => dispatch({ type: 'RESERVE_FROM_DECK', tier }) : undefined}
      />
      {tierData.faceUp.map((card, i) => {
        if (!card) return <EmptyCardSlot key={`empty-${i}`} />;

        const affordable = canAffordCard(player, card);
        const isSelected = selectedCardId === card.id;

        return (
          <div key={card.id} className="relative">
            <CardDisplay
              card={card}
              affordable={affordable}
              onClick={isIdle ? () => handleCardClick(card) : undefined}
            />
            {isSelected && isIdle && (
              <div className="absolute -bottom-10 left-0 right-0 flex gap-1 justify-center z-10">
                {affordable && (
                  <button
                    onClick={() => handlePurchase(card)}
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded transition-colors whitespace-nowrap"
                  >
                    Buy
                  </button>
                )}
                {canReserve && (
                  <button
                    onClick={() => handleReserve(card)}
                    className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded transition-colors whitespace-nowrap"
                  >
                    Reserve
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
