// src/components/WasteChart.tsx
import { useEffect, useRef, useMemo } from 'react';

type Composition = {
  plastic: number;
  paper: number;
  organic: number;
  metal: number;
};

interface WasteChartProps {
  composition: Composition;
}

const SLICE_META = [
  { key: 'plastic' as const, label: 'Plastic', color: '#10b981' },
  { key: 'paper' as const, label: 'Paper', color: '#0ea5e9' },
  { key: 'organic' as const, label: 'Organic', color: '#6366f1' },
  { key: 'metal' as const, label: 'Metal', color: '#f97316' },
];

const WasteChart: React.FC<WasteChartProps> = ({ composition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartData = useMemo(() => {
    const rawValues = SLICE_META.map((item) => ({
      ...item,
      value: composition[item.key],
    }));

    const total = rawValues.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
      return rawValues.map((item) => ({ ...item, pct: 0 }));
    }

    return rawValues.map((item) => ({
      ...item,
      pct: (item.value / total) * 100,
    }));
  }, [composition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Hi-DPI / retina support
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 16;
    const innerRadius = radius * 0.6;

    ctx.clearRect(0, 0, width, height);

    const totalPct = chartData.reduce((sum, item) => sum + item.pct, 0);
    if (totalPct === 0) {
      // No data state – draw subtle ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, innerRadius, Math.PI * 2, 0, true);
      ctx.closePath();
      ctx.fillStyle = '#e5e7eb';
      ctx.fill();
    } else {
      let startAngle = -Math.PI / 2;

      chartData.forEach((item) => {
        const sliceAngle = (item.pct / 100) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        // Donut segment
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        // White separator stroke
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Percentage label
        if (item.pct >= 5) {
          const midAngle = startAngle + sliceAngle / 2;
          const labelRadius = (radius + innerRadius) / 2;
          const textX = centerX + Math.cos(midAngle) * labelRadius;
          const textY = centerY + Math.sin(midAngle) * labelRadius;

          ctx.fillStyle = '#ffffff';
          ctx.font = '600 11px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${Math.round(item.pct)}%`, textX, textY);
        }

        startAngle = endAngle;
      });
    }

    // Center labels
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 14px system-ui, -apple-system, sans-serif';
    ctx.fillText('Waste mix', centerX, centerY - 6);
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText('per current batch', centerX, centerY + 10);
  }, [chartData]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Waste composition
          </h2>
          <p className="text-xs text-slate-500">
            Relative share of materials in this batch.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-56 h-56 sm:w-64 sm:h-64"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-2">
          {chartData.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-slate-700">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-800">
                {item.pct.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WasteChart;
