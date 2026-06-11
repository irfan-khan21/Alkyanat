import React from 'react';
import * as Icons from 'lucide-react';
import type { Entity } from '../data/homeData';

interface EntityCardProps {
  entity: Entity;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  // Get icon component dynamically from Lucide icons package
  const IconComponent = (Icons as any)[entity.iconName] || Icons.HelpCircle;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 transition-all duration-300 hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]">
      {/* Decorative Glow Overlay */}
      <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${entity.accentColor} opacity-5 blur-[80px] group-hover:opacity-15 transition-opacity duration-300`} />

      <div>
        {/* Category & Header */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500/80 px-2.5 py-1 rounded bg-amber-500/5 border border-amber-500/10">
            {entity.category}
          </span>
          <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-all duration-300 group-hover:border-zinc-600`}>
            <IconComponent className="h-6 w-6 stroke-[1.8]" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
          {entity.name}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-light">
          {entity.description}
        </p>
      </div>

      {/* Metrics Section */}
      <div>
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800/80 mb-6">
          {entity.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                {metric.label}
              </span>
              <span className="text-lg font-bold text-white mt-1">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive CTA link */}
        <a
          href="#contact"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors duration-200"
        >
          Request Partnership Details
          <Icons.ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};
