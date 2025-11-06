// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ListingDetailsPage from "./pages/ListingDetailsPage";


import Sidebar, { NavSection } from "./components/Sidebar";
import Dashboard, { BatchData } from "./components/Dashboard";
import MarketplaceDashboard, {
  Listing,
  MaterialType,
  ListingStatus,
} from "./components/MarketplaceDashboard";
import RewardsDashboard from "./components/RewardsDashboard";

import MarketplaceLanding from "./pages/MarketplaceLanding";
import MarketplaceFullPage from "./pages/MarketplaceFullPage"; // 👈 NEW

// --- initial marketplace listings (10 dummy records) ---
const INITIAL_LISTINGS: Listing[] = [
  {
    id: "LST-101",
    batchId: "BATCH-001",
    truckId: "Car 1",
    material: "Plastic",
    quantityKg: 120,
    pricePerKg: 18,
    status: "Available",
    co2SavedKg: 52.3,
  },
  {
    id: "LST-102",
    batchId: "BATCH-002",
    truckId: "Car 2",
    material: "Paper",
    quantityKg: 90,
    pricePerKg: 12,
    status: "Sold",
    buyer: "GreenPaper Recyclers",
    co2SavedKg: 37.8,
  },
  {
    id: "LST-103",
    batchId: "BATCH-003",
    truckId: "Car 3",
    material: "Metal",
    quantityKg: 45,
    pricePerKg: 25,
    status: "Reserved",
    buyer: "CircularMetals Pvt Ltd",
    co2SavedKg: 29.1,
  },
  {
    id: "LST-104",
    batchId: "BATCH-004",
    truckId: "Car 4",
    material: "Plastic",
    quantityKg: 200,
    pricePerKg: 17,
    status: "Available",
    co2SavedKg: 80.4,
  },
  {
    id: "LST-105",
    batchId: "BATCH-005",
    truckId: "Car 5",
    material: "Paper",
    quantityKg: 150,
    pricePerKg: 11,
    status: "Available",
    co2SavedKg: 60.2,
  },
  {
    id: "LST-106",
    batchId: "BATCH-006",
    truckId: "Car 6",
    material: "Metal",
    quantityKg: 75,
    pricePerKg: 26,
    status: "Available",
    co2SavedKg: 45.7,
  },
  {
    id: "LST-107",
    batchId: "BATCH-007",
    truckId: "Car 7",
    material: "Plastic",
    quantityKg: 95,
    pricePerKg: 19,
    status: "Available",
    co2SavedKg: 40.1,
  },
  {
    id: "LST-108",
    batchId: "BATCH-008",
    truckId: "Car 8",
    material: "Paper",
    quantityKg: 60,
    pricePerKg: 13,
    status: "Reserved",
    buyer: "EcoPaper Co",
    co2SavedKg: 23.4,
  },
  {
    id: "LST-109",
    batchId: "BATCH-009",
    truckId: "Car 9",
    material: "Metal",
    quantityKg: 110,
    pricePerKg: 24,
    status: "Available",
    co2SavedKg: 66.8,
  },
  {
    id: "LST-110",
    batchId: "BATCH-010",
    truckId: "Car 10",
    material: "Plastic",
    quantityKg: 130,
    pricePerKg: 18,
    status: "Available",
    co2SavedKg: 55.9,
  },
];

function createListingFromBatch(batch: BatchData): Listing {
  const plasticPct = batch.composition.plastic ?? 25;
  const quantityKg = (batch.totalWaste * plasticPct) / 100;

  const material: MaterialType = "Plastic";
  const pricePerKg = 18;
  const co2SavedKg = batch.co2Saved;

  const randomId = Math.floor(Math.random() * 900 + 100);
  const id = `LST-${randomId}`;

  return {
    id,
    batchId: batch.id,
    truckId: batch.truckId,
    material,
    quantityKg,
    pricePerKg,
    status: "Available",
    co2SavedKg,
  };
}

function App() {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);

  const handleListBatchToMarketplace = (batch: BatchData) => {
    setListings((prev) => {
      const exists = prev.some(
        (l) => l.batchId === batch.id && l.material === "Plastic"
      );
      if (exists) return prev;
      return [...prev, createListingFromBatch(batch)];
    });
  };

  const handleUpdateListingStatus = (
    id: string,
    status: ListingStatus,
    buyer?: string
  ) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status, buyer: buyer ?? l.buyer } : l
      )
    );
  };

  const handleRequestQuote = (id: string) => {
    // simple demo: mark listing as Reserved
    handleUpdateListingStatus(id, "Reserved");
    console.log("Quote requested for", id);
  };

  return (
    <Router>
      <Routes>
        {/* internal dashboard on / */}
        <Route
          path="/"
          element={
            <DashboardLayout
              listings={listings}
              onListBatchToMarketplace={handleListBatchToMarketplace}
              onUpdateListingStatus={handleUpdateListingStatus}
            />
          }
        />

        {/* landing page with hero + preview */}
        <Route
          path="/market"
          element={
            <MarketplaceLanding
              listings={listings}
              onRequestQuote={handleRequestQuote}
            />
          }
        />

        {/* full marketplace with ALL listings */}
        <Route
          path="/marketplace"
          element={
            <MarketplaceFullPage
              listings={listings}
              onRequestQuote={handleRequestQuote}
            />
          }
        />
        <Route
          path="/marketplace/listings/:listingId"
          element={
            <ListingDetailsPage
              listings={listings}
              onRequestQuote={handleRequestQuote}
            />
          }
        />

      </Routes>
    </Router>
  );
}

type DashboardLayoutProps = {
  listings: Listing[];
  onListBatchToMarketplace: (batch: BatchData) => void;
  onUpdateListingStatus: (
    id: string,
    status: ListingStatus,
    buyer?: string
  ) => void;
};

function DashboardLayout({
  listings,
  onListBatchToMarketplace,
}: DashboardLayoutProps) {
  const [active, setActive] = useState<NavSection>("dashboard");

  return (
    <div className="h-screen flex bg-slate-900 text-slate-900 overflow-hidden">
      <Sidebar active={active} onChange={setActive} />

      <div className="flex-1 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 overflow-y-auto">
        {active === "dashboard" && (
          <Dashboard onListBatchToMarketplace={onListBatchToMarketplace} />
        )}
        {active === "marketplace" && (
          <MarketplaceDashboard listings={listings} />
        )}
        {active === "rewards" && <RewardsDashboard />}
      </div>
    </div>
  );
}

export default App;
