import { Truck, Loader2, CheckCircle, ShoppingCart } from "lucide-react";
import { BatchData } from "./Dashboard";

interface BatchTimelineProps {
  batches: BatchData[];
}

export default function BatchTimeline({ batches }: BatchTimelineProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "collected":
        return <Truck className="text-emerald-600" />;
      case "processing":
        return <Loader2 className="animate-spin text-teal-600" />;
      case "verified":
        return <CheckCircle className="text-cyan-600" />;
      case "ready-for-sale":
        return <ShoppingCart className="text-blue-600" />;
      case "sold":
        return <CheckCircle className="text-emerald-700" />;
      default:
        return <Truck />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Batch Timeline</h3>
      <div className="space-y-3">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-emerald-50 p-4 rounded-xl border border-emerald-100 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {getIcon(batch.status)}
              <div>
                <p className="font-semibold text-gray-800">{batch.id}</p>
                <p className="text-xs text-gray-600">
                  {batch.zone} · {new Date(batch.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                batch.status === "sold"
                  ? "bg-emerald-100 text-emerald-700"
                  : batch.status === "ready-for-sale"
                  ? "bg-blue-100 text-blue-700"
                  : batch.status === "verified"
                  ? "bg-cyan-100 text-cyan-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {batch.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
