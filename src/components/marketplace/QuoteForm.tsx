// src/components/marketplace/QuoteForm.tsx
import React, { useMemo, useState } from "react";

export type QuoteFormData = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  quantityKg: number;
  targetPricePerKg?: number;
  deliveryCity?: string;
  deliveryCountry?: string;
  notes?: string;
};

type Props = {
  listingId: string;
  material: string;
  defaultQuantityKg: number;
  unitPrice: number;
  onSubmit: (data: QuoteFormData) => void;
};

const QuoteForm: React.FC<Props> = ({
  listingId,
  material,
  defaultQuantityKg,
  unitPrice,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantityKg, setQuantityKg] = useState(defaultQuantityKg);
  const [targetPricePerKg, setTargetPricePerKg] = useState<number | "">("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryCountry, setDeliveryCountry] = useState("");
  const [notes, setNotes] = useState("");

  const estimatedTotal = useMemo(
    () => quantityKg * unitPrice,
    [quantityKg, unitPrice]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      company,
      email,
      phone,
      quantityKg,
      targetPricePerKg:
        typeof targetPricePerKg === "number" ? targetPricePerKg : undefined,
      deliveryCity,
      deliveryCountry,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-100">
      {/* top description */}
      <div className="rounded-xl bg-slate-800/70 px-3 py-2 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span>
            Requesting quote for{" "}
            <span className="font-semibold text-emerald-300">
              {material}
            </span>{" "}
            (Listing {listingId})
          </span>
          <span className="hidden text-[11px] text-slate-400 sm:inline">
            No payment is charged now
          </span>
        </div>
      </div>

      {/* buyer info */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Buyer details
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Full name"
            required
            value={name}
            onChange={(v) => setName(v)}
            placeholder="e.g. Rahul Mehta"
          />
          <Field
            label="Company"
            required
            value={company}
            onChange={(v) => setCompany(v)}
            placeholder="e.g. GreenPack Industries"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            type="email"
            label="Work email"
            required
            value={email}
            onChange={(v) => setEmail(v)}
            placeholder="you@company.com"
          />
          <Field
            label="Phone (optional)"
            value={phone}
            onChange={(v) => setPhone(v)}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      {/* order details */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Order details
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            type="number"
            label="Quantity (kg)"
            required
            min={1}
            value={quantityKg.toString()}
            onChange={(v) => setQuantityKg(Number(v) || 0)}
            placeholder="Enter required quantity"
          />
          <Field
            type="number"
            label="Target price (₹/kg, optional)"
            value={targetPricePerKg === "" ? "" : targetPricePerKg.toString()}
            onChange={(v) =>
              setTargetPricePerKg(v === "" ? "" : Number(v) || "")
            }
            placeholder={`Current: ₹${unitPrice}/kg`}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Delivery city (optional)"
            value={deliveryCity}
            onChange={(v) => setDeliveryCity(v)}
            placeholder="e.g. Bengaluru"
          />
          <Field
            label="Delivery country (optional)"
            value={deliveryCountry}
            onChange={(v) => setDeliveryCountry(v)}
            placeholder="e.g. India"
          />
        </div>
      </div>

      {/* notes */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-300">
          Notes for supplier (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400"
          placeholder="Share quality specs, preferred incoterms, delivery window, etc."
        />
      </div>

      {/* summary + submit */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-xs text-slate-300">
          <div className="text-slate-400">Estimated order value</div>
          <div className="text-lg font-semibold text-emerald-300">
            ₹{estimatedTotal.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-500">
            Based on listed price ₹{unitPrice}/kg. Final pricing will be
            confirmed by the supplier.
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 sm:w-auto"
        >
          Submit quote request
        </button>
      </div>
    </form>
  );
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  min?: number;
};

const Field: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  min,
}) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-slate-300">
      {label}
      {required && <span className="text-rose-400"> *</span>}
    </label>
    <input
      type={type}
      min={min}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400"
      required={required}
    />
  </div>
);

export default QuoteForm;
