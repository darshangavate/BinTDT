// src/pages/MarketplaceLanding.tsx
import { useMemo } from "react";
import type { Listing, MaterialType } from "../components/MarketplaceDashboard";
import HeroSection from "../components/marketplace/HeroSection";
import MarketplaceSection from "../components/marketplace/MarketplaceSection";
import Footer from "../components/marketplace/Footer";

export type MaterialFilterValue = MaterialType | "all";
export type SortOption = "recent" | "price-low" | "price-high" | "co2-high";

export type MarketStats = {
  totalAvailableKg: number;
  totalCo2: number;
  avgPrice: number;
};

type Props = {
  listings: Listing[];
  onRequestQuote: (listingId: string) => void;
};

const MarketplaceLanding: React.FC<Props> = ({ listings, onRequestQuote }) => {
  const stats: MarketStats = useMemo(() => {
    const available = listings.filter((l) => l.status === "Available");
    const totalAvailableKg = available.reduce(
      (sum, l) => sum + (l.quantityKg ?? 0),
      0
    );
    const totalCo2 = available.reduce(
      (sum, l) => sum + (l.co2SavedKg ?? 0),
      0
    );
    const avgPrice =
      available.length > 0
        ? available.reduce((sum, l) => sum + (l.pricePerKg ?? 0), 0) /
          available.length
        : 0;

    return { totalAvailableKg, totalCo2, avgPrice };
  }, [listings]);

  // simple preview: first 6 listings
  const previewListings = useMemo(
    () => listings.slice(0, 6),
    [listings]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-950 text-slate-50">
      <HeroSection stats={stats} />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* reuse MarketplaceSection for preview but w/out filters/sort props */}
        <MarketplaceSection
          listings={previewListings}
          hideFilters
          onRequestQuote={onRequestQuote}
        />
      </main>

      <Footer />
    </div>
  );
};

export default MarketplaceLanding;
