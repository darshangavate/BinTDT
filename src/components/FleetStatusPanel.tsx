// src/components/FleetStatusPanel.tsx
import type { BatchData } from "./Dashboard";

interface FleetStatusPanelProps {
  batches: BatchData[];
  selectedBatchId: string;
  onSelectBatch: (batchId: string) => void;
}

const statusConfig: Record<
  BatchData["status"],
  { label: string; badgeClass: string }
> = {
  collected: {
    label: "Collected – in field / en route",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  processing: {
    label: "MRF processing",
    badgeClass: "bg-sky-100 text-sky-700",
  },
  verified: {
    label: "Segregation verified",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  "ready-for-sale": {
    label: "Ready for marketplace",
    badgeClass: "bg-indigo-100 text-indigo-700",
  },
  sold: {
    label: "Sold / dispatched",
    badgeClass: "bg-slate-100 text-slate-700",
  },
};

const FleetStatusPanel: React.FC<FleetStatusPanelProps> = ({
  batches,
  selectedBatchId,
  onSelectBatch,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Truck & batch status
          </h2>
          <p className="text-xs text-slate-500">
            Live view of today&apos;s collection runs.
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {batches.map((batch) => {
          const statusInfo = statusConfig[batch.status];
          const isActive = batch.id === selectedBatchId;

          return (
            <button
              key={batch.id}
              type="button"
              onClick={() => onSelectBatch(batch.id)}
              className={`w-full text-left rounded-xl border px-3 py-3 transition-all ${
                isActive
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-slate-100 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    {batch.truckId}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {batch.id}
                  </p>
                  <p className="text-xs text-slate-500">{batch.zone}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                  <p className="text-xs text-slate-500">
                    {new Date(batch.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {batch.totalWaste.toFixed(1)} kg
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FleetStatusPanel;
