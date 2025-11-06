// src/components/BuyerMarketplace.tsx
import { useMemo, useState } from "react";
import {
  IndianRupee,
  Filter,
  ShoppingBag,
  Leaf,
  Search,
  Truck,
  MapPin,
} from "lucide-react";
import type {
  Listing,
  ListingStatus,
  MaterialType,
} from "./MarketplaceDashboard";

interface BuyerMarketplaceProps {
  listings: Listing[];
  onUpdateListingStatus: (
    id: string,
    status: ListingStatus,
    buyer?: string
  ) => void;
}

type PriceSort = "none" | "asc" | "desc";

const BuyerMarketplace: React.FC<BuyerMarketplaceProps> = ({
  listings,
  onUpdateListingStatus,
}) => {
  const [materialFilter, setMaterialFilter] = useState<MaterialType | "All">(
    "All"
  );
  const [minQty, setMinQty] = useState<number>(0);
  const [priceSort, setPriceSort] = useState<PriceSort>("none");
  const [searchTerm, setSearchTerm] = useState("");

  // only show available lots to buyers
  const availableLots = useMemo(
    () => listings.filter((l) => l.status === "Available"),
    [listings]
  );

  const filteredLots = useMemo(() => {
    let result = [...availableLots];

    if (materialFilter !== "All") {
      result = result.filter((l) => l.material === materialFilter);
    }

    if (minQty > 0) {
      result = result.filter((l) => l.quantityKg >= minQty);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.batchId.toLowerCase().includes(term) ||
          l.truckId.toLowerCase().includes(term)
      );
    }

    if (priceSort !== "none") {
      result.sort((a, b) =>
        priceSort === "asc"
          ? a.pricePerKg - b.pricePerKg
          : b.pricePerKg - a.pricePerKg
      );
    }

    return result;
  }, [availableLots, materialFilter, minQty, priceSort, searchTerm]);

  const handleReserve = (id: string) => {
    onUpdateListingStatus(id, "Reserved", "Demo Buyer Pvt Ltd");
  };

  const handleBuyNow = (id: string) => {
    onUpdateListingStatus(id, "Sold", "Demo Buyer Pvt Ltd");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                Buyer marketplace
              </p>
              <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                Purchase verified recyclables from MRF
              </h1>
              <p className="text-xs text-slate-500">
                Browse verified lots, compare prices and reserve material in a
                few clicks.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
            <Leaf className="h-4 w-4 text-emerald-600" />
            <span className="text-[11px] font-medium text-emerald-700">
              {availableLots.length} active lots · climate positive sourcing
            </span>
          </div>
        </div>
      </header>

      {/* Filters bar */}
      <section className="border-b border-slate-200 bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by batch ID or truck ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-7 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Filters & sort */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Filter className="h-3.5 w-3.5" />
              <span className="font-medium">Filters</span>
            </div>

            {/* Material */}
            <select
              value={materialFilter}
              onChange={(e) =>
                setMaterialFilter(e.target.value as MaterialType | "All")
              }
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All materials</option>
              <option value="Plastic">Plastic</option>
              <option value="Paper">Paper</option>
              <option value="Organic">Organic</option>
              <option value="Metal">Metal</option>
            </select>

            {/* Min quantity */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-500">Min qty (kg)</span>
              <input
                type="number"
                min={0}
                value={minQty || ""}
                onChange={(e) =>
                  setMinQty(e.target.value ? Number(e.target.value) : 0)
                }
                className="w-20 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Sort by price */}
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as PriceSort)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="none">Sort: Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredLots.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            No available lots match your search and filters. Try changing the
            material, quantity or price sort.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLots.map((lot) => {
              const lotValue = lot.quantityKg * lot.pricePerKg;
              const fakeLocation = "Pune · MRF #1"; // purely UI text

              return (
                <article
                  key={lot.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* “Image” strip / hero */}
                  <div className="h-24 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 rounded-t-2xl px-4 py-3 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] text-emerald-100">
                        {lot.material} · {lot.quantityKg.toFixed(0)} kg
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lot.batchId}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-emerald-100">
                      <span className="inline-flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {lot.truckId}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        {lot.co2SavedKg.toFixed(1)} kg CO₂ saved
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-4 py-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-slate-500">
                          Location
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-700">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {fakeLocation}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1 text-sm font-semibold text-slate-900">
                          <IndianRupee className="h-3 w-3" />
                          {lot.pricePerKg.toFixed(0)} / kg
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Est. lot value ₹{lotValue.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Quality: MRF-verified</span>
                      <span>Lead time: 2–3 days</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 flex items-center justify-between gap-2 rounded-b-2xl">
                    <button
                      type="button"
                      onClick={() => handleReserve(lot.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      Reserve lot
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBuyNow(lot.id)}
                      className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700 transition"
                    >
                      Buy now
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerMarketplace;
