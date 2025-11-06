// src/components/AiResultPanel.tsx
import { useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

type AiResult = {
  score: number; // 0–100
  plastic: number;
  paper: number;
  organic: number;
  metal: number;
};

const MOCK_RESULT: AiResult = {
  score: 84,
  plastic: 38,
  paper: 27,
  organic: 23,
  metal: 12,
};

const AiResultPanel: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // --- MOCKED RESULT (great for demo / offline) ---
      await new Promise((r) => setTimeout(r, 1100));
      setResult(MOCK_RESULT);

      // --- REAL API CALL (uncomment when backend ready) ---
      /*
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:8000/classify', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Request failed');

      const data = (await res.json()) as AiResult;
      setResult(data);
      */
    } catch (err) {
      console.error(err);
      setError('Could not run AI analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            AI segregation check
          </h2>
          <p className="text-xs text-slate-500">
            Upload a waste image to estimate segregation score and material mix.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-[11px] font-medium text-emerald-700">
            Powered by computer vision
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left side: upload + preview */}
        <div className="md:w-1/2 space-y-3">
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm cursor-pointer hover:bg-slate-100 transition">
            <ImageIcon className="h-4 w-4 text-slate-500" />
            <span>Select waste image…</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {previewUrl ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
              <p className="mb-1 text-[11px] font-medium text-slate-500">
                Input preview
              </p>
              <img
                src={previewUrl}
                alt="Waste preview"
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 text-center">
              <p className="text-xs text-slate-500">
                No image selected yet. Choose a photo from the field to see how
                the model evaluates segregation quality.
              </p>
            </div>
          )}
        </div>

        {/* Right side: AI metrics */}
        <div className="md:w-1/2 space-y-3">
          {isLoading && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Running inference on uploaded image…
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          {!isLoading && result && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Segregation score
                </p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">
                  {result.score}%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Higher scores indicate better separation and lower contamination.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <AiMetric label="Plastic" value={result.plastic} />
                <AiMetric label="Paper" value={result.paper} />
                <AiMetric label="Organic" value={result.organic} />
                <AiMetric label="Metal" value={result.metal} />
              </div>

              <p className="text-[11px] text-slate-500">
                * Values represent estimated percentage share of each material
                detected in the frame. In deployment, these feed directly into
                batch-level analytics and CO₂ calculations.
              </p>
            </>
          )}

          {!isLoading && !result && !error && (
            <p className="text-xs text-slate-500">
              Once an image is uploaded, the model will return a segregation score
              and estimated material mix for that sample.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const AiMetric = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
    <span className="text-xs font-medium text-slate-700">{label}</span>
    <span className="text-xs font-semibold text-slate-900">
      {value.toFixed(1)}%
    </span>
  </div>
);

export default AiResultPanel;
