import { X, Download, Calendar, MapPin } from 'lucide-react';
import { BatchData } from './Dashboard';
import RewardsPanel from './RewardsPanel';

interface ReportModalProps {
  batch: BatchData;
  onClose: () => void;
}

function ReportModal({ batch, onClose }: ReportModalProps) {
  const handleDownload = () => {
    const reportData = {
      batch_id: batch.id,
      truck_id: batch.truckId,
      total_waste_kg: batch.totalWaste,
      segregation_score: batch.segregationScore,
      co2_saved_kg: batch.co2Saved,
      composition: batch.composition,
      generated_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BinTDT_Report_${batch.id}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">Batch Report</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">Batch ID</p>
              <p className="text-lg font-bold text-gray-800">{batch.id}</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-200">
              <p className="text-sm text-gray-600 mb-1">Truck ID</p>
              <p className="text-lg font-bold text-gray-800">{batch.truckId}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Collection Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Waste Collected</span>
                <span className="font-bold text-gray-800">{batch.totalWaste} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Segregation Score</span>
                <span className="font-bold text-emerald-600">{batch.segregationScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CO₂ Saved</span>
                <span className="font-bold text-green-600">{batch.co2Saved} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              Waste Composition Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(batch.composition).map(([key, value]) => (
                <div key={key} className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 capitalize">{key}</p>
                  <p className="text-xl font-bold text-gray-800">{value}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100">
            <h3 className="font-bold text-gray-800 mb-3">Journey Status</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-700">Field Collection - Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-700">MRF Processing - Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-700">Marketplace - Ready</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Report (JSON)
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ReportModal;
