'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GameState, GameAction, Tier } from '../lib/types';
import NobleRow from './NobleRow';
import CardRow from './CardRow';
import TokenBank from './TokenBank';
import PlayerPanel from './PlayerPanel';
import TokenReturnModal from './TokenReturnModal';
import GameOverScreen from './GameOverScreen';

interface GameBoardProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export default function GameBoard({ state, dispatch }: GameBoardProps) {
  const [viewingPlayer, setViewingPlayer] = useState(0);

  // Auto-follow current player
  const activePlayer = state.currentPlayerIndex;

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 max-w-6xl mx-auto">
      {/* Turn indicator */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white font-bold text-xl">Splendor</h1>
        <div className="flex items-center gap-3">
          {state.finalRound && (
            <span className="text-red-400 text-sm font-medium animate-pulse">Final Round!</span>
          )}
          <span className="text-white/60 text-sm">
            Turn {state.turnNumber} &mdash; {state.players[activePlayer].name}&apos;s turn
          </span>
        </div>
      </div>

      {/* Nobles */}
      <NobleRow state={state} />

      {/* Card tiers */}
      <div className="flex flex-col gap-12 my-6 items-center">
        {([3, 2, 1] as Tier[]).map(tier => (
          <CardRow key={tier} tier={tier} state={state} dispatch={dispatch} />
        ))}
      </div>

      {/* Token bank */}
      <div className="my-6">
        <TokenBank state={state} dispatch={dispatch} />
      </div>

      {/* Player tabs */}
      <div className="flex gap-2 mb-3">
        {state.players.map((player, i) => (
          <button
            key={player.id}
            onClick={() => setViewingPlayer(i)}
            className={cn(
              'px-4 py-2 rounded-t-lg text-sm font-medium transition-all',
              viewingPlayer === i
                ? 'bg-white/10 text-white'
                : 'bg-white/[0.02] text-white/40 hover:text-white/60',
              i === activePlayer && 'border-t-2 border-yellow-400',
            )}
          >
            {player.name}
            <span className="ml-2 text-yellow-300/70">{player.score}pts</span>
          </button>
        ))}
      </div>

      {/* Player panel */}
      <PlayerPanel
        player={state.players[viewingPlayer]}
        isCurrentTurn={viewingPlayer === activePlayer}
        state={state}
        dispatch={dispatch}
      />

      {/* Token return modal */}
      {state.turnPhase === 'returning_tokens' && (
        <TokenReturnModal state={state} dispatch={dispatch} />
      )}

      {/* Game over */}
      {state.phase === 'finished' && (
        <GameOverScreen state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
