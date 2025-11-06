// src/components/FacilitySummary.tsx
interface FacilitySummaryProps {
    totalWaste: number;
    avgSegScore: number | null;
    totalCo2: number;
    activeTrucks: number;
    completedTrucks: number;
  }
  
  function formatKg(value: number) {
    return `${value.toFixed(1)} kg`;
  }
  
  const FacilitySummary: React.FC<FacilitySummaryProps> = ({
    totalWaste,
    avgSegScore,
    totalCo2,
    activeTrucks,
    completedTrucks,
  }) => {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Total waste processed (today)
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {formatKg(totalWaste)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Sum of all inbound batches at the MRF.
          </p>
        </div>
  
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Avg. segregation score
          </p>
          <p className="mt-3 text-2xl font-semibold text-emerald-600">
            {avgSegScore !== null ? `${avgSegScore.toFixed(0)}%` : "—"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Across batches currently in processing / verified / sale.
          </p>
        </div>
  
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            CO₂ saved (today)
          </p>
          <p className="mt-3 text-2xl font-semibold text-emerald-700">
            {totalCo2.toFixed(1)} kg
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Avoided vs landfill baseline across all batches.
          </p>
        </div>
  
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Trucks overview
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {activeTrucks} active · {completedTrucks} completed
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Active = in collection / processing / ready for sale.
          </p>
        </div>
      </section>
    );
  };
  
  export default FacilitySummary;
  