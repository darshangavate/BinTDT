// src/components/AlertsPanel.tsx
import type { BatchData } from "./Dashboard";
import { AlertTriangle, Info } from "lucide-react";

interface AlertsPanelProps {
  batches: BatchData[];
}

type AlertType = "warning" | "info";

interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  description: string;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ batches }) => {
  const now = new Date();

  const alerts: AlertItem[] = [];

  batches.forEach((batch) => {
    const batchTime = new Date(batch.timestamp);
    const diffMs = now.getTime() - batchTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // 1) Truck still in early stage for too long
    if (batch.status === "collected" && diffHours > 2) {
      alerts.push({
        id: `${batch.id}-delay`,
        type: "warning",
        title: `Truck ${batch.truckId} delayed`,
        description: `${batch.id} collected over ${diffHours.toFixed(
          1
        )}h ago in ${batch.zone} but has not completed MRF processing yet.`,
      });
    }

    // 2) Low segregation quality
    if (
      ["processing", "verified", "ready-for-sale", "sold"].includes(
        batch.status
      ) &&
      batch.segregationScore < 80
    ) {
      alerts.push({
        id: `${batch.id}-quality`,
        type: "warning",
        title: `Low segregation score on ${batch.id}`,
        description: `Segregation quality is ${batch.segregationScore}%. Consider manual review or rescan.`,
      });
    }
  });

  // 3) If no alerts found, show friendly info
  if (alerts.length === 0) {
    alerts.push({
      id: "all-clear",
      type: "info",
      title: "All systems normal",
      description:
        "No critical issues detected across today’s collection runs and MRF processing.",
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Alerts & attention
          </h2>
          <p className="text-xs text-slate-500">
            Items that may need operator action.
          </p>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {alerts.map((alert) => {
          const Icon = alert.type === "warning" ? AlertTriangle : Info;
          const iconClasses =
            alert.type === "warning"
              ? "text-amber-600"
              : "text-sky-600";

          const badgeClasses =
            alert.type === "warning"
              ? "bg-amber-50 text-amber-800 border-amber-100"
              : "bg-sky-50 text-sky-800 border-sky-100";

          return (
            <div
              key={alert.id}
              className={`flex gap-2 rounded-xl border px-3 py-2 text-xs ${badgeClasses}`}
            >
              <div className="pt-0.5">
                <Icon className={`h-4 w-4 ${iconClasses}`} />
              </div>
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AlertsPanel;
