'use client';

import { cn } from '@/lib/utils';
import { Player, GameState, GameAction, DevelopmentCard } from '../lib/types';
import { GEM_COLORS, GEM_STYLES } from '../lib/constants';
import { canAffordCard } from '../lib/helpers';
import TokenChip from './TokenChip';
import CardDisplay from './CardDisplay';
import { useState } from 'react';

interface PlayerPanelProps {
  player: Player;
  isCurrentTurn: boolean;
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function PlayerPanel({ player, isCurrentTurn, state, dispatch }: PlayerPanelProps) {
  const [selectedReservedId, setSelectedReservedId] = useState<number | null>(null);
  const isIdle = state.turnPhase === 'idle';

  const handleReservedClick = (card: DevelopmentCard) => {
    if (!isCurrentTurn || !isIdle) return;
    setSelectedReservedId(selectedReservedId === card.id ? null : card.id);
  };

  const handlePurchaseReserved = (card: DevelopmentCard) => {
    dispatch({ type: 'PURCHASE_CARD', card, source: 'reserved' });
    setSelectedReservedId(null);
  };

  return (
    <div className={cn(
      'rounded-lg border p-4 transition-all',
      isCurrentTurn ? 'border-yellow-400/50 bg-white/5' : 'border-white/10 bg-white/[0.02]',
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-lg">{player.name}</h3>
          {isCurrentTurn && (
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
              Current Turn
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-yellow-300">{player.score} pts</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tokens */}
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-wider mb-2">Tokens</h4>
          <div className="flex gap-1.5 flex-wrap">
            {GEM_COLORS.map(color => (
              player.tokens[color] > 0 && (
                <TokenChip key={color} color={color} count={player.tokens[color]} size="sm" />
              )
            ))}
            {player.tokens.gold > 0 && (
              <TokenChip color="gold" count={player.tokens.gold} size="sm" />
            )}
            {Object.values(player.tokens).every(v => v === 0) && (
              <span className="text-white/30 text-xs">None</span>
            )}
          </div>
        </div>

        {/* Bonuses from purchased cards */}
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-wider mb-2">Bonuses</h4>
          <div className="flex gap-1.5 flex-wrap">
            {GEM_COLORS.map(color => (
              player.bonuses[color] > 0 && (
                <div key={color} className="flex items-center gap-0.5">
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/30',
                    GEM_STYLES[color].bg,
                    GEM_STYLES[color].text,
                  )}>
                    {player.bonuses[color]}
                  </div>
                </div>
              )
            ))}
            {Object.values(player.bonuses).every(v => v === 0) && (
              <span className="text-white/30 text-xs">None</span>
            )}
          </div>
          {/* Nobles */}
          {player.nobles.length > 0 && (
            <div className="mt-2">
              <span className="text-purple-300 text-xs">
                {player.nobles.length} noble{player.nobles.length > 1 ? 's' : ''} ({player.nobles.length * 3}pts)
              </span>
            </div>
          )}
        </div>

        {/* Reserved cards */}
        <div>
          <h4 className="text-white/50 text-xs uppercase tracking-wider mb-2">
            Reserved ({player.reserved.length}/3)
          </h4>
          <div className="flex gap-1.5">
            {player.reserved.map(card => {
              const affordable = canAffordCard(player, card);
              const isSelected = selectedReservedId === card.id;
              return (
                <div key={card.id} className="relative">
                  <CardDisplay
                    card={card}
                    affordable={isCurrentTurn ? affordable : undefined}
                    onClick={isCurrentTurn && isIdle ? () => handleReservedClick(card) : undefined}
                    compact
                  />
                  {isSelected && isIdle && affordable && (
                    <button
                      onClick={() => handlePurchaseReserved(card)}
                      className="absolute -bottom-6 left-0 right-0 text-center px-1 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] rounded transition-colors"
                    >
                      Buy
                    </button>
                  )}
                </div>
              );
            })}
            {player.reserved.length === 0 && (
              <span className="text-white/30 text-xs">None</span>
            )}
          </div>
        </div>
      </div>

      {/* Purchased cards summary */}
      {player.purchased.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <h4 className="text-white/50 text-xs uppercase tracking-wider mb-2">
            Purchased ({player.purchased.length} cards)
          </h4>
          <div className="flex gap-1 flex-wrap">
            {player.purchased.map(card => (
              <CardDisplay key={card.id} card={card} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
