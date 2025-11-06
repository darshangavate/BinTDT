// src/components/marketplace/ListingCard.tsx
import React, { useState } from "react";
import type { Listing } from "../MarketplaceDashboard";
import Modal from "../ui/Modal";
import QuoteForm, { QuoteFormData } from "./QuoteForm";
import { Link } from "react-router-dom";

type Props = {
  listing: Listing;
  onRequestQuote: (listingId: string) => void;
};

const ListingCard: React.FC<Props> = ({ listing, onRequestQuote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (data: QuoteFormData) => {
    // here you can later call your backend / API
    console.log("Quote submitted:", { listingId: listing.id, ...data });

    onRequestQuote(listing.id);
    setIsModalOpen(false);
    // replace alert with a toast later if you want
    alert("Quote request submitted! Our team will contact you shortly.");
  };

  return (
    <>
      <article className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm shadow-black/40 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-emerald-500/30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              {listing.material} • Batch {listing.batchId}
            </div>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              {listing.quantityKg} kg available
            </h3>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
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

        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="space-y-1">
            <div className="text-slate-400">Price</div>
            <div className="text-sm font-semibold text-emerald-300">
              ₹{listing.pricePerKg}/kg
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">CO₂ savings</div>
            <div className="text-sm font-semibold text-sky-300">
              {listing.co2SavedKg.toFixed(1)} kg
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-[11px] text-slate-400">
          Ideal for manufacturers looking to replace virgin feedstock with
          recycled inputs. Detailed quality specs available on request.
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 rounded-full bg-emerald-400 px-3 py-2 text-xs font-semibold text-emerald-950 transition group-hover:bg-emerald-300"
          >
            Request quote
          </button>
          <Link
            to={`/marketplace/listings/${listing.id}`}
            className="rounded-full border border-slate-700 px-3 py-2 text-center text-xs font-medium text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
            >
            View details
            </Link>

        </div>
      </article>

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
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default ListingCard;
