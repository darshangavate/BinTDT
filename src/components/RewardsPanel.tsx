// src/components/RewardsPanel.tsx
import { useMemo } from "react";
import { Award, TrendingUp, Wallet } from "lucide-react";
import type { BatchData } from "../components/Dashboard";

interface RewardsPanelProps {
  batch: BatchData;
}

export default function RewardsPanel({ batch }: RewardsPanelProps) {
  const societies = useMemo(() => batch.societies ?? [], [batch.societies]);

  // If for some reason a batch has no societies configured
  if (societies.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-600" />
          Rewards Distribution
        </h3>
        <p className="text-sm text-gray-600">
          No society data is configured for this batch yet. Add societies to
          this batch to see how rewards would be allocated.
        </p>
      </div>
    );
  }

  // Revenue & reward logic
  const batchRevenue = batch.revenue ?? batch.totalWaste * 30; // ₹30/kg default
  const rewardPool = batchRevenue * 0.15; // 15% shared
  const totalScore = societies.reduce((a, s) => a + s.score, 0) || 1;

  const rewards = societies.map((s) => ({
    ...s,
    reward: ((s.score / totalScore) * rewardPool).toFixed(0),
  }));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Award className="w-6 h-6 text-emerald-600" />
        Rewards Distribution
      </h3>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl">
          <Wallet className="text-emerald-600" />
          <div>
            <p className="text-xs text-gray-500">Batch Revenue</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{batchRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-teal-50 p-4 rounded-xl">
          <Award className="text-teal-600" />
          <div>
            <p className="text-xs text-gray-500">Reward Pool (15%)</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{rewardPool.toFixed(0)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-cyan-50 p-4 rounded-xl">
          <TrendingUp className="text-cyan-600" />
          <div>
            <p className="text-xs text-gray-500">MRF Retained (85%)</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{(batchRevenue - rewardPool).toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-emerald-100">
        <table className="min-w-full divide-y divide-emerald-100 text-sm">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Society
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Score
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Waste (kg)
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Reward (₹)
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {rewards.map((s, i) => (
              <tr key={i} className="hover:bg-emerald-50/60 transition">
                <td className="px-4 py-2 font-medium text-gray-800">
                  {s.name}
                </td>
                <td className="px-4 py-2 text-gray-700">{s.score}</td>
                <td className="px-4 py-2 text-gray-700">{s.waste}</td>
                <td className="px-4 py-2 font-semibold text-emerald-700">
                  ₹{s.reward}
                </td>
                <td className="px-4 py-2">
                  {s.score > 80 ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                      Released
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div className="mt-4 text-right text-sm text-gray-600">
        Total Reward Pool: ₹{rewardPool.toFixed(0)} · Distributed among{" "}
        {societies.length} societies
      </div>
    </div>
  );
}
