// src/components/Header.tsx
import { Leaf } from 'lucide-react';

interface HeaderProps {
  totalCo2Saved: number;
}

const Header: React.FC<HeaderProps> = ({ totalCo2Saved }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        {/* Left: product + context */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 leading-tight">
              BinTDT · MRF Operations
            </h1>
            <p className="text-xs text-slate-500">
              Tracking collection quality, material recovery, and climate impact.
            </p>
          </div>
        </div>

        {/* Right: impact pill + action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
            <Leaf className="h-4 w-4 text-emerald-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-emerald-700 uppercase tracking-wide">
                Total CO₂ saved
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                {totalCo2Saved.toFixed(1)} kg
              </span>
            </div>
          </div>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
