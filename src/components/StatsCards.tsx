// src/components/StatsCards.tsx
import type { BatchData } from "./Dashboard";
import { Truck, Package, Recycle, Leaf } from "lucide-react";

interface StatsCardsProps {
  batch: BatchData;
  hasSegregationData: boolean;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  subtitle?: string;
}> = ({ icon, label, value, subtitle }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-3">
    <div className="mt-1">{icon}</div>
    <div className="space-y-1">
      <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
        {label}
      </p>
      <div className="text-lg font-semibold text-slate-900">{value}</div>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const StatsCards: React.FC<StatsCardsProps> = ({ batch, hasSegregationData }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={<Truck className="w-5 h-5 text-emerald-600" />}
        label="Truck / Batch"
        value={`${batch.truckId} · ${batch.id}`}
        subtitle="Current active collection run"
      />

      <StatCard
        icon={<Package className="w-5 h-5 text-emerald-600" />}
        label="Total waste collected"
        value={`${batch.totalWaste.toFixed(1)} kg`}
        subtitle="Net weight received at MRF"
      />

      <StatCard
        icon={<Recycle className="w-5 h-5 text-emerald-600" />}
        label="Segregation score"
        value={
          hasSegregationData ? (
            <span className="text-emerald-700">
              {batch.segregationScore.toFixed(0)}%
            </span>
          ) : (
            <span className="text-slate-400 text-sm font-medium">
              Pending segregation
            </span>
          )
        }
        subtitle={
          hasSegregationData
            ? "Quality of segregation for this batch."
            : "Will be available after MRF verification."
        }
      />

      <StatCard
        icon={<Leaf className="w-5 h-5 text-emerald-600" />}
        label="CO₂ saved"
        value={`${batch.co2Saved.toFixed(1)} kg`}
        subtitle="Avoided vs landfill baseline"
      />
    </section>
  );
};

export default StatsCards;
