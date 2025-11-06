// src/App.tsx
import { useState } from 'react';
import Sidebar, { NavSection } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MarketplaceDashboard from './components/MarketplaceDashboard';
import RewardsDashboard from './components/RewardsDashboard';

function App() {
  const [active, setActive] = useState<NavSection>('dashboard');

  return (
    <div className="h-screen flex bg-slate-900 text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar active={active} onChange={setActive} />

      {/* Main content area */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 overflow-y-auto">
        {active === 'dashboard' && <Dashboard />}
        {active === 'marketplace' && <MarketplaceDashboard />}
        {active === 'rewards' && <RewardsDashboard />}

        {/* Optional placeholders */}
        {active === 'batches' && <Dashboard />}
        {active === 'reports' && <Dashboard />}
      </div>
    </div>
  );
}

export default App;
