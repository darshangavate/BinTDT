// src/components/marketplace/MarketplaceFilters.tsx
import React from "react";
import type {
  MaterialFilterValue,
  SortOption,
} from "../../pages/MarketplaceLanding";

type Props = {
  materialFilter: MaterialFilterValue;
  onMaterialFilterChange: (val: MaterialFilterValue) => void;
  search: string;
  onSearchChange: (val: string) => void;
  sortBy: SortOption;
  onSortByChange: (val: SortOption) => void;
};

const MarketplaceFilters: React.FC<Props> = ({
  materialFilter,
  onMaterialFilterChange,
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs sm:flex-row sm:items-center sm:gap-3">
      <div className="flex flex-1 items-center gap-2">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by material, batch ID, buyer..."
          className="h-9 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={materialFilter}
          onChange={(e) =>
            onMaterialFilterChange(e.target.value as MaterialFilterValue)
          }
          className="h-9 rounded-xl border border-slate-800 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none focus:border-emerald-400"
        >
          <option value="all">All materials</option>
          <option value="Plastic">Plastic</option>
          <option value="Paper">Paper</option>
          <option value="Metal">Metal</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as SortOption)}
          className="h-9 rounded-xl border border-slate-800 bg-slate-900/80 px-3 text-xs text-slate-100 outline-none focus:border-emerald-400"
        >
          <option value="recent">Sort: Most recent</option>
          <option value="price-low">Sort: Price low → high</option>
          <option value="price-high">Sort: Price high → low</option>
          <option value="co2-high">Sort: Highest CO₂ savings</option>
        </select>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
