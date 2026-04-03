'use client';

import { GameState, GameAction } from '../lib/types';
import { GEM_COLORS } from '../lib/constants';
import TokenChip from './TokenChip';

interface TokenBankProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function TokenBank({ state, dispatch }: TokenBankProps) {
  const isIdle = state.turnPhase === 'idle';
  const isTaking = state.turnPhase === 'taking_tokens';
  const canInteract = isIdle || isTaking;

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider">Gem Bank</h3>
      <div className="flex gap-3 items-end">
        {GEM_COLORS.map(color => {
          const count = state.tokenBank[color];
          const isSelected = state.selectedTokens.includes(color);
          const canTakeTwoSame = isIdle && count >= 4;
          const canSelectForThree = canInteract && !isSelected && count > 0 && state.selectedTokens.length < 3;

          return (
            <div key={color} className="flex flex-col items-center gap-1">
              <TokenChip
                color={color}
                count={count}
                size="lg"
                selected={isSelected}
                disabled={!canInteract || (count === 0 && !isSelected)}
                onClick={() => {
                  if (isSelected) {
                    dispatch({ type: 'DESELECT_TOKEN', color });
                  } else if (canSelectForThree) {
                    dispatch({ type: 'SELECT_TOKEN', color });
                  }
                }}
              />
              {canTakeTwoSame && !isTaking && (
                <button
                  onClick={() => dispatch({ type: 'TAKE_TWO_SAME', color })}
                  className="text-[10px] text-yellow-300/80 hover:text-yellow-300 transition-colors"
                >
                  Take 2
                </button>
              )}
            </div>
          );
        })}

        {/* Gold tokens - not directly takeable */}
        <div className="flex flex-col items-center gap-1 ml-2">
          <TokenChip
            color="gold"
            count={state.tokenBank.gold}
            size="lg"
            disabled
          />
        </div>
      </div>

      {/* Action buttons for token taking */}
      {isTaking && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => dispatch({ type: 'CONFIRM_TAKE_TOKENS' })}
            disabled={state.selectedTokens.length === 0}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm rounded-md transition-colors"
          >
            Take {state.selectedTokens.length} gem{state.selectedTokens.length !== 1 ? 's' : ''}
          </button>
          <button
            onClick={() => dispatch({ type: 'CANCEL_ACTION' })}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
