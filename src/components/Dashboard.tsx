// src/components/Dashboard.tsx
import { useState } from 'react';
import Header from './Header';
import BatchSelector from './BatchSelector';
import StatsCards from './StatsCards';
import WasteChart from './WasteChart';
import ReportModal from './ReportModal';
import JourneyPanel from './JourneyPanel'; // use the modular one we made earlier
import RecentBatchesPanel from './RecentBatchesPanel';
import AiResultPanel from './AiResultPanel';
import BatchTimeline from './BatchTimeline';

export interface BatchData {
  id: string;
  truckId: string;
  zone: string;
  timestamp: string;
  status: 'collected' | 'processing' | 'verified' | 'ready-for-sale' | 'sold';
  totalWaste: number;
  segregationScore: number;
  co2Saved: number;
  composition: {
    plastic: number;
    paper: number;
    organic: number;
    metal: number;
  };
  societies: {
    name: string;
    score: number;
    waste: number;
  }[];
  revenue?: number; // assigned when sold
}


const mockBatches: BatchData[] = [
  {
    id: 'BATCH-001',
    truckId: 'Car 1',
    // optional extra fields, if you added them:
    zone: 'Ward 7 - Kothrud',
    timestamp: '2025-11-04T10:32:00Z',

    status: 'ready-for-sale',      // ✅ ADD THIS
    totalWaste: 245.8,
    segregationScore: 87,
    co2Saved: 32.4,
    composition: { plastic: 35, paper: 28, organic: 25, metal: 12 },
  },
  {
    id: 'BATCH-002',
    truckId: 'Car 2',
    zone: 'Ward 3 - Baner',
    timestamp: '2025-11-04T09:10:00Z',

    status: 'processing',          // ✅
    totalWaste: 312.5,
    segregationScore: 92,
    co2Saved: 41.2,
    composition: { plastic: 40, paper: 22, organic: 28, metal: 10 },
  },
  {
    
    id: 'BATCH-003',
    truckId: 'Car 3',
    zone: 'Ward 5 - Hinjewadi',
    timestamp: '2025-11-04T08:20:00Z',

    status: 'collected',           // ✅
    totalWaste: 189.3,
    segregationScore: 79,
    co2Saved: 24.9,
    composition: { plastic: 30, paper: 35, organic: 20, metal: 15 },
  },
];


function Dashboard() {
  const [selectedBatch, setSelectedBatch] = useState<BatchData>(mockBatches[0]);
  const [showModal, setShowModal] = useState(false);

  const totalCo2 = mockBatches.reduce((sum, batch) => sum + batch.co2Saved, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar inside main area */}
      <Header totalCo2Saved={totalCo2} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Row: batch selector + maybe search/filter later */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <BatchSelector
            batches={mockBatches}
            selectedBatch={selectedBatch}
            onSelectBatch={setSelectedBatch}
          />
          {/* placeholder for search / date filter if you want later */}
        </section>

        {/* Row: stats cards */}
        <StatsCards batch={selectedBatch} />

        {/* Row: chart + journey/actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WasteChart composition={selectedBatch.composition} />

          <JourneyPanel
            batch={selectedBatch}
            onGenerateReport={() => setShowModal(true)}
          />
          <div className="mt-6">
            <BatchTimeline batches={mockBatches} />
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBatchesPanel
            batches={mockBatches}
            selectedBatchId={selectedBatch.id}
          />
          </section>
      </main>

      {showModal && (
        <ReportModal
          batch={selectedBatch}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
