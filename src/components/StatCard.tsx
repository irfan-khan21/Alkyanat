import React from 'react';
import type { GroupStat } from '../data/homeData';

interface StatCardProps {
  stat: GroupStat;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8 hover:border-zinc-800 transition-colors duration-300">
      {/* Decorative vertical gradient line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-500 to-yellow-600 opacity-60" />

      <div className="flex flex-col">
        {/* Value */}
        <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 tracking-tight mb-2">
          {stat.value}
        </span>
        {/* Label */}
        <span className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
          {stat.label}
        </span>
        {/* Description */}
        <span className="text-xs text-zinc-500 leading-relaxed font-light">
          {stat.description}
        </span>
      </div>
    </div>
  );
};
