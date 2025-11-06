// src/components/JourneyPanel.tsx
import { useState } from 'react';
import type { BatchData } from './Dashboard';
import {
  CheckCircle2,
  Circle,
  Truck,
  Factory,
  ShoppingBag,
} from 'lucide-react';

interface JourneyPanelProps {
  batch: BatchData;
  onGenerateReport: () => void;
}

const steps = [
  {
    id: 1,
    label: 'Field collection',
    description: 'Waste collected and QR-logged at source.',
    icon: Truck,
  },
  {
    id: 2,
    label: 'MRF processing',
    description: 'Weighing, segregation and AI verification at facility.',
    icon: Factory,
  },
  {
    id: 3,
    label: 'Marketplace ready',
    description: 'Batch packaged and ready for recycling partners.',
    icon: ShoppingBag,
  },
];

const JourneyPanel: React.FC<JourneyPanelProps> = ({
  batch,
  onGenerateReport,
}) => {
  const [isListing, setIsListing] = useState(false);
  const [listed, setListed] = useState(false);

  const handleListToMarketplace = async () => {
    setIsListing(true);
    setListed(false);
    await new Promise((resolve) => setTimeout(resolve, 900)); // simulate API
    setIsListing(false);
    setListed(true);
  };

  return (
    <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm">
      {/* Steps */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Journey status
        </h3>
        <ol className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index === 0 || (index === 1 && listed);
            const isCurrent = index === 1 && !listed;

            return (
              <li key={step.id} className="flex gap-3">
                <div className="pt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] rounded-full bg-amber-50 px-2 py-0.5 text-amber-700 border border-amber-100">
                        In progress
                      </span>
                    )}
                    {isCompleted && !isCurrent && (
                      <span className="text-[10px] rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 border border-emerald-100">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-2">
        <button
          onClick={onGenerateReport}
          className="w-full rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Generate batch report
        </button>
        <button
          onClick={handleListToMarketplace}
          disabled={isListing}
          className="w-full rounded-lg border border-emerald-500 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isListing ? 'Listing to marketplace…' : 'List batch to marketplace'}
        </button>
        {listed && (
          <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-1">
            ✅ {batch.truckId} / {batch.id} listed with high-quality segregation (
            {batch.segregationScore}%).
          </p>
        )}
      </div>
    </section>
  );
};

export default JourneyPanel;
