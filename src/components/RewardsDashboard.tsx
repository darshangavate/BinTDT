import { useState } from "react";
import { Trophy } from "lucide-react";
import RewardsPanel from "../components/RewardsPanel";
import { mockBatches } from "../data/mockBatches";

export default function RewardsDashboard() {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="flex items-center gap-3 px-8 py-6 border-b border-emerald-100 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <Trophy className="w-6 h-6 text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rewards & Impact</h1>
          <p className="text-sm text-gray-600">
            AI-driven community incentives from sold waste batches
          </p>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Batch selector */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Select Batch
          </h2>
          <select
            className="border border-emerald-200 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-emerald-400 focus:border-emerald-400"
            value={selectedBatch.id}
            onChange={(e) => {
              const batch = mockBatches.find(b => b.id === e.target.value);
              if (batch) setSelectedBatch(batch);
            }}
          >
            {mockBatches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.truckId} — {batch.id}
              </option>
            ))}
          </select>
        </div>

        {/* Rewards Section */}
        <RewardsPanel batch={selectedBatch} />
      </main>
    </div>
  );
}
