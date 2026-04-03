'use client';

import { cn } from '@/lib/utils';
import { DevelopmentCard, GemColor } from '../lib/types';
import { GEM_STYLES, GEM_COLORS } from '../lib/constants';

interface CardDisplayProps {
  card: DevelopmentCard;
  affordable?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

const BONUS_BG: Record<GemColor, string> = {
  white: 'bg-gradient-to-br from-gray-50 to-gray-200',
  blue: 'bg-gradient-to-br from-blue-900 to-blue-700',
  green: 'bg-gradient-to-br from-emerald-900 to-emerald-700',
  red: 'bg-gradient-to-br from-red-900 to-red-700',
  black: 'bg-gradient-to-br from-gray-900 to-gray-700',
};

const BONUS_TEXT: Record<GemColor, string> = {
  white: 'text-gray-900',
  blue: 'text-white',
  green: 'text-white',
  red: 'text-white',
  black: 'text-white',
};

export default function CardDisplay({ card, affordable, onClick, compact }: CardDisplayProps) {
  if (compact) {
    return (
      <div className={cn(
        'w-8 h-10 rounded border flex items-center justify-center text-xs font-bold',
        BONUS_BG[card.bonus],
        BONUS_TEXT[card.bonus],
      )}>
        {card.points > 0 ? card.points : ''}
      </div>
    );
  }

  const nonZeroCosts = GEM_COLORS.filter(c => card.cost[c] > 0);

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-[100px] h-[140px] rounded-lg border-2 flex flex-col justify-between p-2 transition-all',
        BONUS_BG[card.bonus],
        BONUS_TEXT[card.bonus],
        affordable === true && 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)]',
        affordable === false && 'border-white/10',
        affordable === undefined && 'border-white/20',
        onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95' : '',
      )}
    >
      {/* Top row: points + bonus gem */}
      <div className="flex justify-between items-start">
        <span className="text-xl font-bold leading-none">
          {card.points > 0 ? card.points : ''}
        </span>
        <div className={cn(
          'w-6 h-6 rounded-full border-2 border-white/40',
          GEM_STYLES[card.bonus].bg,
        )} />
      </div>

      {/* Cost gems */}
      <div className="flex flex-col gap-0.5">
        {nonZeroCosts.map(color => (
          <div key={color} className="flex items-center gap-1">
            <div className={cn(
              'w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/30',
              GEM_STYLES[color].bg,
              GEM_STYLES[color].text,
            )}>
              {card.cost[color]}
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}

export function EmptyCardSlot() {
  return (
    <div className="w-[100px] h-[140px] rounded-lg border-2 border-white/5 bg-white/5" />
  );
}

export function DeckIndicator({ count, tier, onClick }: { count: number; tier: number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={count === 0 || !onClick}
      className={cn(
        'w-[100px] h-[140px] rounded-lg border-2 border-white/20 flex flex-col items-center justify-center gap-1 transition-all',
        'bg-gradient-to-br from-amber-900/80 to-amber-950',
        count > 0 && onClick ? 'cursor-pointer hover:border-yellow-400/50 hover:scale-105' : 'opacity-50',
      )}
    >
      <span className="text-amber-200 text-2xl font-bold">III{'I'.repeat(3 - tier)}</span>
      <span className="text-amber-300/70 text-sm">{count} left</span>
    </button>
  );
}
