'use client';

import { useReducer } from 'react';
import { gameReducer, initialState } from './lib/reducer';
import SetupScreen from './components/SetupScreen';
import GameBoard from './components/GameBoard';

export default function SplendorPage() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  if (state.phase === 'setup') {
    return <SetupScreen dispatch={dispatch} />;
  }

  return <GameBoard state={state} dispatch={dispatch} />;
}
