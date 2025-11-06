// src/components/Dashboard.tsx
import { useState, useMemo } from "react";
import Header from "./Header";
import BatchSelector from "./BatchSelector";
import StatsCards from "./StatsCards";
import WasteChart from "./WasteChart";
import ReportModal from "./ReportModal";
import JourneyPanel from "./JourneyPanel";
import RecentBatchesPanel from "./RecentBatchesPanel";
import FacilitySummary from "./FacilitySummary";
import FleetStatusPanel from "./FleetStatusPanel";
import AlertsPanel from "./AlertsPanel";

export interface BatchData {
  id: string;
  truckId: string;
  zone: string;
  timestamp: string;
  status: "collected" | "processing" | "verified" | "ready-for-sale" | "sold";
  totalWaste: number;
  segregationScore: number;
  co2Saved: number;
  composition: {
    plastic: number;
    paper: number;
    organic: number;
    metal: number;
  };
  societies?: {
    name: string;
    score: number;
    waste: number;
  }[];
  revenue?: number;
}

/**
 * 🔧 MOCK DATA:
 * This is where you edit / add batches to test scenarios.
 * - Change `status` to see JourneyPanel + FleetStatus + RecentBatches react.
 * - Change `segregationScore` to trigger low-quality alerts.
 * - Change `totalWaste` / composition to see cards & charts update.
 */
export const MOCK_BATCHES: BatchData[] = [
  {
    id: "BATCH-001",
    truckId: "Car 1",
    zone: "Ward 7 - Kothrud",
    timestamp: "2025-11-04T10:32:00Z",
    status: "ready-for-sale",
    totalWaste: 245.8,
    segregationScore: 87,
    co2Saved: 32.4,
    composition: { plastic: 35, paper: 28, organic: 25, metal: 12 },
    societies: [
      { name: "Sai Srushti Society", score: 89, waste: 62.5 },
      { name: "Green Valley Enclave", score: 84, waste: 48.2 },
      { name: "Kothrud Heights A", score: 91, waste: 55.7 },
      { name: "Riverstone Residency", score: 77, waste: 40.3 },
      { name: "Pratibha Co-op", score: 82, waste: 36.9 },
      { name: "Skyline Meadows", score: 88, waste: 51.1 },
    ],
    revenue: 18500,
  },
  {
    id: "BATCH-002",
    truckId: "Car 2",
    zone: "Ward 3 - Baner",
    timestamp: "2025-11-04T09:10:00Z",
    status: "processing",
    totalWaste: 312.5,
    segregationScore: 92,
    co2Saved: 41.2,
    composition: { plastic: 40, paper: 22, organic: 28, metal: 10 },
    societies: [
      { name: "Baner Residency", score: 93, waste: 72.4 },
      { name: "Eco Homes Baner", score: 90, waste: 64.3 },
      { name: "Emerald Greens", score: 86, waste: 58.1 },
      { name: "Skyview Towers", score: 79, waste: 45.6 },
      { name: "Bluebell Co-op", score: 81, waste: 39.4 },
      { name: "Baner Hillside", score: 88, waste: 52.7 },
    ],
  },
  {
    id: "BATCH-003",
    truckId: "Car 3",
    zone: "Ward 5 - Hinjewadi",
    timestamp: "2025-11-04T08:20:00Z",
    status: "collected",
    totalWaste: 189.3,
    segregationScore: 79,
    co2Saved: 24.9,
    composition: { plastic: 30, paper: 35, organic: 20, metal: 15 },
    societies: [
      { name: "Tech Park Towers", score: 76, waste: 58.9 },
      { name: "Riverfront Enclave", score: 72, waste: 44.1 },
      { name: "Coders Habitat", score: 80, waste: 37.3 },
      { name: "Hinjewadi Heights", score: 69, waste: 33.5 },
      { name: "Skyline IT Park Homes", score: 74, waste: 29.2 },
    ],
  },
  {
    id: "BATCH-004",
    truckId: "Car 4",
    zone: "Ward 9 - Hadapsar",
    timestamp: "2025-11-04T07:50:00Z",
    status: "verified",
    totalWaste: 221.4,
    segregationScore: 83,
    co2Saved: 30.2,
    composition: { plastic: 33, paper: 30, organic: 22, metal: 15 },
    societies: [
      { name: "Magarpatta Enclave", score: 88, waste: 49.3 },
      { name: "Hadapsar Gardens", score: 82, waste: 41.7 },
      { name: "Sunrise Residency", score: 79, waste: 35.9 },
      { name: "Clover Fields", score: 91, waste: 56.4 },
      { name: "Green Orchard Co-op", score: 75, waste: 32.8 },
      { name: "Sai Krupa Society", score: 84, waste: 38.6 },
    ],
  },
  {
    id: "BATCH-005",
    truckId: "Car 5",
    zone: "Ward 2 - Aundh",
    timestamp: "2025-11-03T18:40:00Z",
    status: "sold",
    totalWaste: 268.9,
    segregationScore: 91,
    co2Saved: 39.8,
    composition: { plastic: 38, paper: 27, organic: 20, metal: 15 },
    societies: [
      { name: "Aundh Riverwalk", score: 95, waste: 63.1 },
      { name: "Seasons Residency", score: 90, waste: 54.9 },
      { name: "Ashiyana Co-op", score: 87, waste: 47.2 },
      { name: "Golden Leaf Society", score: 83, waste: 39.5 },
      { name: "TreeTop Enclave", score: 78, waste: 35.6 },
      { name: "Urban Crest Aundh", score: 88, waste: 46.8 },
    ],
    revenue: 21500,
  },
  {
    id: "BATCH-006",
    truckId: "Car 6",
    zone: "Ward 10 - Kharadi",
    timestamp: "2025-11-03T16:15:00Z",
    status: "processing",
    totalWaste: 198.7,
    segregationScore: 72, // intentionally lower
    co2Saved: 26.1,
    composition: { plastic: 28, paper: 26, organic: 30, metal: 16 },
    societies: [
      { name: "Eon Waterside", score: 71, waste: 38.4 },
      { name: "Kharadi Riverside", score: 69, waste: 34.2 },
      { name: "Skyline IT Habitat", score: 74, waste: 31.7 },
      { name: "Millennium Greens", score: 80, waste: 36.9 },
      { name: "Eastern Meadows", score: 77, waste: 29.5 },
      { name: "Palm County", score: 73, waste: 27.1 },
    ],
  },
];


interface DashboardProps {
  onListBatchToMarketplace?: (batch: BatchData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onListBatchToMarketplace }) => {
  const [batches, setBatches] = useState<BatchData[]>(MOCK_BATCHES);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(
    MOCK_BATCHES[0].id
  );
  const [showModal, setShowModal] = useState(false);

  const selectedBatch = useMemo(
    () => batches.find((b) => b.id === selectedBatchId) ?? batches[0],
    [batches, selectedBatchId]
  );

  // Facility-level aggregates
  const totalCo2 = batches.reduce((sum, b) => sum + b.co2Saved, 0);
  const totalWasteAll = batches.reduce((sum, b) => sum + b.totalWaste, 0);

  const batchesWithSeg = batches.filter((b) =>
    ["processing", "verified", "ready-for-sale", "sold"].includes(b.status)
  );
  const avgSegScore =
    batchesWithSeg.length > 0
      ? batchesWithSeg.reduce((sum, b) => sum + b.segregationScore, 0) /
        batchesWithSeg.length
      : null;

  const activeTrucks = batches.filter((b) => b.status !== "sold").length;
  const completedTrucks = batches.filter((b) => b.status === "sold").length;

  const hasSegregationData = ["verified", "ready-for-sale", "sold"].includes(
    selectedBatch.status
  );

  const handleSelectBatchById = (id: string) => {
    setSelectedBatchId(id);
  };

  const handleListToMarketplace = (batch: BatchData) => {
    // 1) update local batch status to ready-for-sale
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batch.id ? { ...b, status: "ready-for-sale" } : b
      )
    );

    // 2) notify parent so it can create a marketplace listing
    if (onListBatchToMarketplace) {
      onListBatchToMarketplace({ ...batch, status: "ready-for-sale" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global header bar */}
      <Header totalCo2Saved={totalCo2} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Facility snapshot for the MRF head */}
        <FacilitySummary
          totalWaste={totalWasteAll}
          avgSegScore={avgSegScore}
          totalCo2={totalCo2}
          activeTrucks={activeTrucks}
          completedTrucks={completedTrucks}
        />

        {/* Batch selector row */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <BatchSelector
            batches={batches}
            selectedBatch={selectedBatch}
            onSelectBatch={(b) => setSelectedBatchId(b.id)}
          />
        </section>

        {/* Stats cards for the selected batch */}
        <StatsCards
          batch={selectedBatch}
          hasSegregationData={hasSegregationData}
        />

        {/* Chart + journey */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hasSegregationData ? (
            <WasteChart composition={selectedBatch.composition} />
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-center text-center">
              <p className="text-sm text-slate-500 max-w-sm">
                Segregation is not completed yet for this batch. Once
                verification is finished, you&apos;ll see the full waste
                composition breakdown here.
              </p>
            </div>
          )}

          <JourneyPanel
            batch={selectedBatch}
            onGenerateReport={() => setShowModal(true)}
            onListToMarketplace={() => handleListToMarketplace(selectedBatch)}
          />
        </section>

        {/* 🚛 Truck & batch status (kept) */}
        <section>
          <FleetStatusPanel
            batches={batches}
            selectedBatchId={selectedBatch.id}
            onSelectBatch={handleSelectBatchById}
          />
        </section>

        {/* Recent batches + alerts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBatchesPanel
            batches={batches}
            selectedBatchId={selectedBatch.id}
          />
          <AlertsPanel batches={batches} />
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
};

export default Dashboard;
