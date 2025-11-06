// src/components/marketplace/HeroSection.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { MarketStats } from "../../pages/MarketplaceLanding";

type Props = {
  stats: MarketStats;
};

const HeroSection: React.FC<Props> = ({ stats }) => {
  const { totalAvailableKg, totalCo2, avgPrice } = stats;

  return (
    <>
      {/* Top Nav */}
      <header className="sticky top-0 z-20 border-b border-emerald-500/20 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/20">
              <span className="text-lg font-extrabold text-emerald-400">♻️</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                BinTDT
              </div>
              <div className="text-xs text-slate-400">
              <div className="text-xs text-slate-400">
  Circular materials marketplace by BinTDT
</div>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <Link to="/marketplace" className="transition hover:text-emerald-300">
              Marketplace
            </Link>
            <a href="#how-it-works" className="transition hover:text-emerald-300">
              How it works
            </a>
            <a href="#impact" className="transition hover:text-emerald-300">
              Impact
            </a>
            <a href="#for-suppliers" className="transition hover:text-emerald-300">
              For suppliers
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden text-xs font-medium text-slate-300 hover:text-white md:inline-flex">
              Sign in
            </button>
            <Link
              to="/marketplace"
              className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Browse materials
            </Link>
          </div>
        </div>
      </header>

      {/* Hero + stats */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open marketplace for recycled & raw waste streams
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            Buy verified recycled materials
            <span className="block text-emerald-300">
              for your next production run.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            LoopMarket connects manufacturers with reliable suppliers of
            post-consumer and post-industrial waste — plastics, paper, metals, and
            more. Every batch is traceable from collection truck to processing
            plant, with real-time CO₂ savings.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/marketplace"
              className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              Explore marketplace
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-emerald-200 underline-offset-4 hover:underline"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/80 p-4 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Live marketplace snapshot</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                ● Updated in real time
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs sm:text-sm">
              <StatTile
                label="Available volume"
                value={`${Math.round(totalAvailableKg).toLocaleString()} kg`}
                helper="Ready to contract today"
              />
              <StatTile
                label="Avg price"
                value={`₹${avgPrice.toFixed(0)}/kg`}
                helper="Across active listings"
              />
              <StatTile
                label="CO₂ impact"
                value={`${Math.round(totalCo2).toLocaleString()} kg`}
                helper="Potential emissions avoided"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const StatTile = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) => (
  <div className="rounded-xl bg-slate-900/80 p-3">
    <div className="text-[11px] text-slate-400">{label}</div>
    <div className="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
      {value}
    </div>
    {helper && (
      <div className="mt-0.5 text-[11px] text-slate-500">{helper}</div>
    )}
  </div>
);

export default HeroSection;
