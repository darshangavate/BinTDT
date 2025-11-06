import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { BatchData } from "./Dashboard";

interface SupervisorPanelProps {
  batch: BatchData;
  onVerify: (id: string) => void;
}

export default function SupervisorPanel({ batch, onVerify }: SupervisorPanelProps) {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    onVerify(batch.id);
    setVerifying(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="text-amber-500" />
        Supervisor Actions
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        Verify or override AI segregation results before listing batch for sale.
      </p>

      <button
        onClick={handleVerify}
        disabled={verifying}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {verifying ? "Verifying..." : "Mark as Verified"}
      </button>

      {batch.status === "verified" && (
        <p className="mt-3 text-sm text-emerald-600 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> Verified & ready for Marketplace
        </p>
      )}
    </div>
  );
}
