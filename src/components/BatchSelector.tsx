// src/components/BatchSelector.tsx
import { ChevronDown } from 'lucide-react';
import type { BatchData } from './Dashboard';

interface BatchSelectorProps {
  batches: BatchData[];
  selectedBatch: BatchData;
  onSelectBatch: (batch: BatchData) => void;
}

const BatchSelector: React.FC<BatchSelectorProps> = ({
  batches,
  selectedBatch,
  onSelectBatch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const batch = batches.find((b) => b.id === e.target.value);
    if (batch) onSelectBatch(batch);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="batch-select"
        className="text-xs font-medium text-slate-600"
      >
        Batch / truck in focus
      </label>
      <div className="relative inline-flex items-center">
        <select
          id="batch-select"
          value={selectedBatch.id}
          onChange={handleChange}
          className="min-w-[260px] appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.truckId} · {batch.id}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
      </div>
      <p className="text-[11px] text-slate-500">
        {batches.length} batches loaded • showing metrics for{' '}
        <span className="font-medium">{selectedBatch.truckId}</span>
      </p>
    </div>
  );
};

export default BatchSelector;
