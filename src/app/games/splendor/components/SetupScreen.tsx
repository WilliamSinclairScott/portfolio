'use client';

import { cn } from '@/lib/utils';
import { GameAction } from '../lib/types';
import { useState } from 'react';

interface SetupScreenProps {
  dispatch: React.Dispatch<GameAction>;
}

export default function SetupScreen({ dispatch }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState(2);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Splendor</h1>
        <p className="text-white/50 text-sm text-center mb-8">
          A game of gem trading and prestige
        </p>

        <div className="mb-8">
          <label className="text-white/70 text-sm font-medium block mb-3">Number of Players</label>
          <div className="flex gap-2">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setPlayerCount(n)}
                className={cn(
                  'flex-1 py-3 rounded-lg font-bold text-lg transition-all',
                  playerCount === n
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white/5 text-white/50 hover:bg-white/10',
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: 'START_GAME', playerCount })}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
