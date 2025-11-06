// src/components/MarketplaceDashboard.tsx
import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Filter,
  Leaf,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

export type ListingStatus = "Available" | "Reserved" | "Sold";

export type MaterialType = "Plastic" | "Paper" | "Organic" | "Metal";

export interface Listing {
  id: string;
  batchId: string;
  truckId: string;
  material: MaterialType;
  quantityKg: number;
  pricePerKg: number;
  status: ListingStatus;
  buyer?: string;
  co2SavedKg: number;
}

interface MarketplaceDashboardProps {
  listings: Listing[];
}

// color helpers
const materialColors: Record<MaterialType, string> = {
  Plastic: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Paper: "bg-sky-50 text-sky-700 border-sky-200",
  Organic: "bg-lime-50 text-lime-700 border-lime-200",
  Metal: "bg-orange-50 text-orange-700 border-orange-200",
};

const statusColors: Record<ListingStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Reserved: "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-slate-100 text-slate-600 border-slate-200",
};

const MarketplaceDashboard: React.FC<MarketplaceDashboardProps> = ({
  listings,
}) => {
  const [materialFilter, setMaterialFilter] = useState<MaterialType | "All">(
    "All"
  );
  const [statusFilter, setStatusFilter] = useState<ListingStatus | "All">(
    "All"
  );

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const byMaterial =
        materialFilter === "All" ? true : l.material === materialFilter;
      const byStatus =
        statusFilter === "All" ? true : l.status === statusFilter;
      return byMaterial && byStatus;
    });
  }, [listings, materialFilter, statusFilter]);

  const stats = useMemo(() => {
    const available = listings.filter((l) => l.status === "Available");
    const sold = listings.filter((l) => l.status === "Sold");

    const activeLots = available.length;
    const totalRevenue = sold.reduce(
      (sum, l) => sum + l.quantityKg * l.pricePerKg,
      0
    );
    const totalCo2 = listings.reduce((sum, l) => sum + l.co2SavedKg, 0);

    return { activeLots, totalRevenue, totalCo2 };
  }, [listings]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Marketplace
            </p>
            <h1 className="text-xl font-semibold text-slate-900 leading-tight">
              Recyclables marketplace
            </h1>
            <p className="text-xs text-slate-500">
              Discover, price and sell recovered materials from MRF batches.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
            <Leaf className="h-4 w-4 text-emerald-600" />
            <span className="text-[11px] font-medium text-emerald-700">
              CO₂ saved across lots: {stats.totalCo2.toFixed(1)} kg
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top summary strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniStat
            label="Active lots"
            value={String(stats.activeLots)}
            helper="Available for buyers"
          />
          <MiniStat
            label="Revenue from sold lots"
            value={`₹ ${stats.totalRevenue.toFixed(0)}`}
            helper="Closed marketplace transactions"
          />
          <MiniStat
            label="Total CO₂ savings"
            value={`${stats.totalCo2.toFixed(1)} kg`}
            helper="Across all listed lots"
          />
        </section>

        {/* Filters */}
        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="font-medium">Filter listings</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            {/* Material chips */}
            <FilterGroup
              label="Material"
              options={["All", "Plastic", "Paper", "Organic", "Metal"]}
              active={materialFilter}
              onChange={(value) =>
                setMaterialFilter(value as MaterialType | "All")
              }
            />

            {/* Status chips */}
            <FilterGroup
              label="Status"
              options={["All", "Available", "Reserved", "Sold"]}
              active={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as ListingStatus | "All")
              }
            />
          </div>
        </section>

        {/* Grid of "products" */}
        <section>
          {filteredListings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-xs text-slate-500">
              No listings match the current filters. Try changing material or
              status.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// === Subcomponents ===

const MiniStat = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) => (
  <article className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    <p className="mt-1 text-[11px] text-slate-500">{helper}</p>
  </article>
);

const FilterGroup = ({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-[11px] font-medium text-slate-500">{label}:</span>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
              isActive
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const ListingCard = ({ listing }: { listing: Listing }) => {
  const totalValue = listing.quantityKg * listing.pricePerKg;

  const materialClass = materialColors[listing.material];
  const statusClass = statusColors[listing.status];

  const isAvailable = listing.status === "Available";

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      {/* “Image” / hero band */}
      <div className="h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-2xl flex items-center justify-between px-4">
        <div>
          <p className="text-[11px] font-medium text-slate-300">
            {listing.material} lot
          </p>
          <p className="text-sm font-semibold text-white">
            {listing.quantityKg.toFixed(0)} kg from {listing.batchId}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
          <Leaf className="h-3.5 w-3.5 text-emerald-300" />
          <span className="text-[10px] text-emerald-100">
            {listing.co2SavedKg.toFixed(1)} kg CO₂
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 px-4 py-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${materialClass}`}
          >
            {listing.material}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusClass}`}
          >
            {listing.status}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500">Batch / Truck</span>
            <span className="text-xs font-medium text-slate-900">
              {listing.batchId} · {listing.truckId}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-900">
              <IndianRupee className="h-3 w-3" />
              {listing.pricePerKg.toFixed(0)} / kg
            </span>
            <span className="text-[10px] text-slate-500">
              Lot value ~ ₹ {totalValue.toFixed(0)}
            </span>
          </div>
        </div>

        {listing.buyer && (
          <p className="text-[11px] text-slate-500">
            Buyer: <span className="font-medium">{listing.buyer}</span>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 rounded-b-2xl bg-slate-50">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>MRF-verified batch</span>
        </div>
        {isAvailable ? (
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800 transition"
          >
            View lot details
          </button>
        ) : (
          <span className="text-[11px] text-slate-500">
            {listing.status === "Sold" ? "Lot sold" : "Lot reserved"}
          </span>
        )}
      </div>
    </article>
  );
};

export default MarketplaceDashboard;
