'use client';

import { cn } from '@/lib/utils';
import { GemColor, TokenColor } from '../lib/types';
import { GEM_STYLES, GOLD_STYLE } from '../lib/constants';

interface TokenChipProps {
  color: TokenColor;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  showCount?: boolean;
}

export default function TokenChip({
  color,
  count,
  size = 'md',
  selected = false,
  disabled = false,
  onClick,
  showCount = true,
}: TokenChipProps) {
  const style = color === 'gold' ? GOLD_STYLE : GEM_STYLES[color as GemColor];
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || !onClick}
      className={cn(
        'rounded-full font-bold flex items-center justify-center transition-all border-2 border-white/20',
        sizes[size],
        style.bg,
        style.text,
        selected && 'ring-3 ring-yellow-300 scale-110',
        disabled ? 'opacity-40 cursor-not-allowed' : onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : '',
      )}
    >
      {showCount && count !== undefined ? count : ''}
    </button>
  );
}
