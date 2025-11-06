// src/components/marketplace/Footer.tsx
const Footer = () => (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-xs text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <p>© {new Date().getFullYear()} LoopMarket. All rights reserved.</p>
        <div className="flex gap-4">
          <button className="hover:text-emerald-300">Terms</button>
          <button className="hover:text-emerald-300">Privacy</button>
          <button className="hover:text-emerald-300">Contact</button>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  