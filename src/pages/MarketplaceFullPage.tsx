// src/pages/MarketplaceFullPage.tsx
import { useMemo, useState } from "react";
import type { Listing, MaterialType } from "../components/MarketplaceDashboard";
import Footer from "../components/marketplace/Footer";
import MarketplaceSection from "../components/marketplace/MarketplaceSection";

export type MaterialFilterValue = MaterialType | "all";
export type SortOption = "recent" | "price-low" | "price-high" | "co2-high";

type Props = {
  listings: Listing[];
  onRequestQuote: (listingId: string) => void;
};

const MarketplaceFullPage: React.FC<Props> = ({ listings, onRequestQuote }) => {
  const [materialFilter, setMaterialFilter] = useState<MaterialFilterValue>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const visibleListings = useMemo(() => {
    let result = [...listings];

    if (materialFilter !== "all") {
      result = result.filter((l) => l.material === materialFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        [l.id, l.batchId, l.truckId, l.material, l.buyer ?? ""].some((field) =>
          field.toLowerCase().includes(q)
        )
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.pricePerKg ?? 0) - (b.pricePerKg ?? 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.pricePerKg ?? 0) - (a.pricePerKg ?? 0));
        break;
      case "co2-high":
        result.sort((a, b) => (b.co2SavedKg ?? 0) - (a.co2SavedKg ?? 0));
        break;
      case "recent":
      default:
        result.sort((a, b) => (a.id > b.id ? -1 : 1));
        break;
    }

    return result; // 👈 FULL LIST, no slice
  }, [listings, materialFilter, search, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-950 text-slate-50">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
          Marketplace
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Browse all live lots of recycled and raw waste materials. Use filters to
          refine by material, volume, and price.
        </p>

        <MarketplaceSection
          listings={visibleListings}
          materialFilter={materialFilter}
          onMaterialFilterChange={setMaterialFilter}
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onRequestQuote={onRequestQuote}
        />
      </main>

      <Footer />
    </div>
  );
};

export default MarketplaceFullPage;
