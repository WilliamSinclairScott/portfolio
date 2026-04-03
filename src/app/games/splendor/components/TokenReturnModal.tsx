'use client';

import { GameState, GameAction, TokenColor } from '../lib/types';
import { GEM_COLORS, MAX_TOKENS } from '../lib/constants';
import { totalTokens } from '../lib/helpers';
import TokenChip from './TokenChip';

interface TokenReturnModalProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function TokenReturnModal({ state, dispatch }: TokenReturnModalProps) {
  const player = state.players[state.currentPlayerIndex];
  const total = totalTokens(player.tokens);
  const excess = total - MAX_TOKENS;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/20 rounded-xl p-6 max-w-md">
        <h2 className="text-white text-lg font-bold mb-1">Return Tokens</h2>
        <p className="text-white/60 text-sm mb-4">
          You have {total} tokens. Return {excess} to get to {MAX_TOKENS}.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-4">
          {[...GEM_COLORS, 'gold' as const].map(color => {
            const count = player.tokens[color as TokenColor];
            if (count === 0) return null;
            return (
              <div key={color} className="flex flex-col items-center gap-1">
                <TokenChip
                  color={color as TokenColor}
                  count={count}
                  size="md"
                  onClick={() => dispatch({ type: 'RETURN_TOKEN', color: color as TokenColor })}
                />
                <span className="text-white/40 text-[10px]">Click to return</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => dispatch({ type: 'CONFIRM_RETURN_TOKENS' })}
          disabled={total > MAX_TOKENS}
          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-md transition-colors"
        >
          {total <= MAX_TOKENS ? 'Continue' : `Return ${excess} more`}
        </button>
      </div>
    </div>
  );
}
