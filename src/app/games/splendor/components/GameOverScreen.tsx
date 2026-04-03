'use client';

import { cn } from '@/lib/utils';
import { GameState, GameAction } from '../lib/types';

interface GameOverScreenProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function GameOverScreen({ state, dispatch }: GameOverScreenProps) {
  const sorted = [...state.players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.purchased.length - b.purchased.length;
  });

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-yellow-300 text-center mb-6">Game Over!</h2>

        <div className="space-y-3 mb-8">
          {sorted.map((player, i) => (
            <div
              key={player.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg',
                i === 0 ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5',
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'text-2xl font-bold',
                  i === 0 ? 'text-yellow-300' : 'text-white/40',
                )}>
                  #{i + 1}
                </span>
                <div>
                  <div className="text-white font-medium">{player.name}</div>
                  <div className="text-white/40 text-xs">
                    {player.purchased.length} cards, {player.nobles.length} nobles
                  </div>
                </div>
              </div>
              <div className={cn(
                'text-2xl font-bold',
                i === 0 ? 'text-yellow-300' : 'text-white/60',
              )}>
                {player.score}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => dispatch({ type: 'NEW_GAME' })}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
