// src/components/Sidebar.tsx
import {
  Home,
  BarChart2,
  Cpu,
  ShoppingBag,
  FileText,
  Trophy,
} from 'lucide-react';

export type NavSection = 'dashboard' | 'marketplace' | 'batches' | 'ai' | 'reports' | 'rewards';

type NavItem = {
  id: NavSection;
  label: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'batches', label: 'Batches', icon: BarChart2 },
  { id: 'ai', label: 'AI Lab', icon: Cpu },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'rewards', label: 'Rewards & Impact', icon: Trophy }, // ✅ fixed key names

];

interface SidebarProps {
  active: NavSection;
  onChange: (section: NavSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  return (
    <aside className="hidden lg:flex lg:flex-col h-screen w-64 flex-none bg-slate-950 text-slate-100 border-r border-slate-900">
      {/* Top brand */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-900">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white font-semibold shadow-sm">
          B
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">
            BinTDT
          </span>
          <span className="text-[11px] text-slate-400">
            AI for Climate Action
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Main
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-slate-800 text-slate-50 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-slate-50'
              }`}
            >
              {isActive && (
                <span className="absolute -left-1 h-7 w-1 rounded-full bg-emerald-400" />
              )}

              <Icon
                className={`h-4 w-4 ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-slate-400 group-hover:text-emerald-300'
                }`}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-900">
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
          <p className="text-[11px] font-medium text-slate-300">Mode</p>
          <p className="text-xs font-semibold text-emerald-400">
            Indradhanu IGC 2025
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Demo environment for MRF operations.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
