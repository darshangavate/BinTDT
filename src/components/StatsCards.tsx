// src/components/StatsCards.tsx
import type { BatchData } from './Dashboard';
import { Truck, Package, Recycle, Leaf } from 'lucide-react';

interface StatsCardsProps {
  batch: BatchData;
}

type StatCardConfig = {
  label: string;
  value: string;
  helper?: string;
  icon: React.ElementType;
};

const StatsCards: React.FC<StatsCardsProps> = ({ batch }) => {
  const cards: StatCardConfig[] = [
    {
      icon: Truck,
      label: 'Truck / Batch',
      value: `${batch.truckId} / ${batch.id}`,
      helper: 'Current active collection run',
    },
    {
      icon: Package,
      label: 'Total Waste Collected',
      value: `${batch.totalWaste.toFixed(1)} kg`,
      helper: 'Net weight received at MRF',
    },
    {
      icon: Recycle,
      label: 'Segregation Score',
      value: `${batch.segregationScore}%`,
      helper:
        batch.segregationScore >= 85
          ? 'Excellent quality'
          : batch.segregationScore >= 70
          ? 'Good – minor contamination'
          : 'Needs attention',
    },
    {
      icon: Leaf,
      label: 'CO₂ Saved',
      value: `${batch.co2Saved.toFixed(1)} kg`,
      helper: 'Avoided vs landfill baseline',
    },
  ];

  return (
    <section
      aria-label="Batch key metrics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map(({ icon: Icon, label, value, helper }, index) => (
        <article
          key={label}
          className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md animate-fade-in-up"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {label}
              </p>
              <p className="text-2xl font-semibold text-slate-900 leading-snug">
                {value}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          {helper && (
            <p className="mt-2 text-xs text-slate-500">
              {helper}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
