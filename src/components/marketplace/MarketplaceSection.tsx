// src/components/marketplace/MarketplaceSection.tsx
import React from "react";
import type { Listing } from "../../components/MarketplaceDashboard";
import MarketplaceFilters from "./MarketplaceFilters";
import ListingCard from "./ListingCard";
import type {
  MaterialFilterValue,
  SortOption,
} from "../../pages/MarketplaceFullPage";

type Props = {
  listings: Listing[];
  // full-page props
  materialFilter?: MaterialFilterValue;
  onMaterialFilterChange?: (val: MaterialFilterValue) => void;
  search?: string;
  onSearchChange?: (val: string) => void;
  sortBy?: SortOption;
  onSortByChange?: (val: SortOption) => void;
  // shared
  onRequestQuote: (listingId: string) => void;
  hideFilters?: boolean;
};

const MarketplaceSection: React.FC<Props> = ({
  listings,
  materialFilter = "all",
  onMaterialFilterChange,
  search = "",
  onSearchChange,
  sortBy = "recent",
  onSortByChange,
  onRequestQuote,
  hideFilters = false,
}) => {
  return (
    <section id="marketplace-section" className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Marketplace
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Browse live lots of recycled and raw waste materials.
          </p>
        </div>

        {!hideFilters && (
          <MarketplaceFilters
            materialFilter={materialFilter}
            onMaterialFilterChange={onMaterialFilterChange!}
            search={search}
            onSearchChange={onSearchChange!}
            sortBy={sortBy}
            onSortByChange={onSortByChange!}
          />
        )}
      </div>

      {listings.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-300">
          No matching listings right now. Try clearing filters or adjusting your
          search terms.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MarketplaceSection;
