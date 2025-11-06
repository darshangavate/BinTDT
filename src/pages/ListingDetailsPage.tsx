// src/pages/ListingDetailsPage.tsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Listing } from "../components/MarketplaceDashboard";
import Modal from "../components/ui/Modal";
import QuoteForm, {
  QuoteFormData,
} from "../components/marketplace/QuoteForm";

type Props = {
  listings: Listing[];
  onRequestQuote: (listingId: string) => void;
};

const ListingDetailsPage: React.FC<Props> = ({ listings, onRequestQuote }) => {
  const { listingId } = useParams<{ listingId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listing = listings.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-xl font-semibold mb-2">Listing not found</h1>
          <p className="text-sm text-slate-400 mb-4">
            We couldn&apos;t find that listing. It may have been removed or
            updated.
          </p>
          <Link
            to="/marketplace"
            className="text-sm font-medium text-emerald-300 underline-offset-4 hover:underline"
          >
            ← Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handleQuoteSubmit = (data: QuoteFormData) => {
    console.log("Quote submitted from details page:", {
      listingId: listing.id,
      ...data,
    });
    onRequestQuote(listing.id);
    setIsModalOpen(false);
    alert("Quote request submitted! Our team will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* breadcrumb */}
        <div className="mb-4 text-xs text-slate-400">
          <Link
            to="/marketplace"
            className="hover:text-emerald-300 hover:underline"
          >
            Marketplace
          </Link>
          <span className="mx-1">/</span>
          <span>{listing.id}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Left: main info */}
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  {listing.material} • Batch {listing.batchId}
                </p>
                <h1 className="mt-1 text-xl font-semibold">
                  {listing.quantityKg} kg {listing.material} for sale
                </h1>
                <p className="mt-1 text-xs text-slate-400">
                  Collected via {listing.truckId}. Ideal for manufacturers
                  replacing virgin feedstock with recycled inputs.
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  listing.status === "Available"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : listing.status === "Sold"
                    ? "bg-rose-500/15 text-rose-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {listing.status}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-300">
              <DetailStat
                label="Listing ID"
                value={listing.id}
              />
              <DetailStat
                label="Truck / source"
                value={listing.truckId}
              />
              <DetailStat
                label="CO₂ savings (est.)"
                value={`${listing.co2SavedKg.toFixed(1)} kg`}
              />
            </div>

            <div className="mt-2 space-y-2 text-sm text-slate-200">
              <p>
                This lot has been pre-verified by BinTDT for traceability and
                consistency. Detailed composition, contamination limits, and
                quality certificates can be shared after NDA / onboarding.
              </p>
              <ul className="ml-4 list-disc text-xs text-slate-300">
                <li>Suitable for industrial recycling applications.</li>
                <li>Batch-level tracking available for ESG reporting.</li>
                <li>Flexible contract terms for recurring volumes.</li>
              </ul>
            </div>
          </div>

          {/* Right: price + actions */}
          <aside className="space-y-3 rounded-2xl border border-emerald-500/30 bg-slate-950/90 p-5 shadow-lg shadow-emerald-500/20">
            <div className="space-y-1">
              <div className="text-xs text-slate-400">Price</div>
              <div className="text-2xl font-semibold text-emerald-300">
                ₹{listing.pricePerKg}/kg
              </div>
              <div className="text-[11px] text-slate-500">
                Indicative price. Final price will be confirmed by supplier.
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-slate-900/80 p-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Total volume</span>
                <span className="font-semibold">
                  {listing.quantityKg} kg
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span>Estimated order value</span>
                <span className="font-semibold text-emerald-300">
                  ₹{(listing.quantityKg * listing.pricePerKg).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 w-full rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Request quote
            </button>

            <Link
              to="/marketplace"
              className="mt-1 block text-center text-xs font-medium text-emerald-200 underline-offset-4 hover:underline"
            >
              ← Back to all listings
            </Link>
          </aside>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request a quote"
      >
        <QuoteForm
          listingId={listing.id}
          material={listing.material}
          defaultQuantityKg={listing.quantityKg}
          unitPrice={listing.pricePerKg}
          onSubmit={handleQuoteSubmit}
        />
      </Modal>
    </div>
  );
};

const DetailStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-slate-900/80 p-3">
    <div className="text-[11px] text-slate-400">{label}</div>
    <div className="mt-1 text-sm font-medium text-slate-100">{value}</div>
  </div>
);

export default ListingDetailsPage;
