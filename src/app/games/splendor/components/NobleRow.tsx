'use client';

import { GameState } from '../lib/types';
import { meetsNobleRequirements } from '../lib/helpers';
import NobleTile from './NobleTile';

interface NobleRowProps {
  state: GameState;
}

export default function NobleRow({ state }: NobleRowProps) {
  const player = state.players[state.currentPlayerIndex];

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider">Nobles</h3>
      <div className="flex gap-2 justify-center flex-wrap">
        {state.nobles.map(noble => (
          <NobleTile
            key={noble.id}
            noble={noble}
            qualifies={meetsNobleRequirements(player, noble)}
          />
        ))}
      </div>
    </div>
  );
}
