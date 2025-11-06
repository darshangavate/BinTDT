// src/components/RecentBatchesPanel.tsx
import type { BatchData } from "./Dashboard";
import { ArrowUpRight } from "lucide-react";

interface RecentBatchesPanelProps {
  batches: BatchData[];
  selectedBatchId: string;
}

const RecentBatchesPanel: React.FC<RecentBatchesPanelProps> = ({
  batches,
  selectedBatchId,
}) => {
  // In real life you'd sort by timestamp; here we just show them as passed
  const rows = batches;

  const hasSegregationData = (batch: BatchData) =>
    ["processing", "verified", "ready-for-sale", "sold"].includes(batch.status);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Recent batches
          </h2>
          <p className="text-xs text-slate-500">
            Last collection runs and their quality performance.
          </p>
        </div>
        <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 transition">
          View all
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">Batch</th>
              <th className="px-3 py-2 font-medium">Truck</th>
              <th className="px-3 py-2 font-medium text-right">Segregation</th>
              <th className="px-3 py-2 font-medium text-right">CO₂ saved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((batch) => {
              const isActive = batch.id === selectedBatchId;
              const showSeg = hasSegregationData(batch);

              return (
                <tr
                  key={batch.id}
                  className={`border-t border-slate-100 text-slate-700 ${
                    isActive ? "bg-emerald-50/70" : "bg-white"
                  }`}
                >
                  <td className="px-3 py-2 align-middle">
                    <div className="flex flex-col">
                      <span className="font-medium text-[11px] text-slate-900">
                        {batch.id}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {batch.totalWaste.toFixed(1)} kg total
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-middle">
                    <span className="text-[11px] text-slate-800">
                      {batch.truckId}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-middle text-right">
                    {showSeg ? (
                      <span className="text-[11px] font-semibold text-slate-900">
                        {batch.segregationScore}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 align-middle text-right">
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {batch.co2Saved.toFixed(1)} kg
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  className="px-3 py-4 text-center text-[11px] text-slate-500"
                  colSpan={4}
                >
                  No batches available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentBatchesPanel;
