// src/components/ui/Modal.tsx
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 px-6 py-5 shadow-2xl shadow-black/60">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          aria-label="Close"
        >
          ✕
        </button>

        {title && (
          <h2 className="pr-8 text-lg font-semibold text-slate-50">{title}</h2>
        )}

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
