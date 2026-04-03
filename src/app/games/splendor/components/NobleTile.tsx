'use client';

import { cn } from '@/lib/utils';
import { NobleTile as NobleTileType, GemColor } from '../lib/types';
import { GEM_STYLES, GEM_COLORS } from '../lib/constants';

interface NobleTileProps {
  noble: NobleTileType;
  qualifies?: boolean;
}

export default function NobleTile({ noble, qualifies }: NobleTileProps) {
  const reqs = GEM_COLORS.filter(c => noble.requirements[c] > 0);

  return (
    <div className={cn(
      'w-[90px] h-[90px] rounded-lg border-2 bg-gradient-to-br from-purple-900 to-purple-950 flex flex-col items-center justify-between p-2 transition-all',
      qualifies ? 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)]' : 'border-purple-400/30',
    )}>
      <span className="text-yellow-300 text-lg font-bold">{noble.points}pts</span>
      <div className="flex gap-1 flex-wrap justify-center">
        {reqs.map(color => (
          <div key={color} className="flex items-center gap-0.5">
            <div className={cn(
              'w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/30',
              GEM_STYLES[color as GemColor].bg,
              GEM_STYLES[color as GemColor].text,
            )}>
              {noble.requirements[color as GemColor]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
