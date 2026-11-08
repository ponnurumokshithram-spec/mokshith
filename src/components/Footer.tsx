import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'reviews' | 'lenses' | 'tutorials' | 'tracker' | 'community') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-zinc-950 font-bold text-xs">
                α
              </span>
              <span className="text-white font-bold text-sm tracking-tight">AlphaVault</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              The independent Sony Alpha ecosystem reference: laboratory benchmarks, lens compatibility guides, beginner tutorials, and verified gear exchange.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <button
              onClick={() => onNavigate('reviews')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Camera Reviews
            </button>
            <button
              onClick={() => onNavigate('lenses')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Lens Compatibility
            </button>
            <button
              onClick={() => onNavigate('tutorials')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tutorials
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Price Tracker
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Community Forum
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>
            © {new Date().getFullYear()} AlphaVault. Independent enthusiast and photographer resource. Not affiliated with or endorsed by Sony Corporation.
          </p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Prices refreshed via authorized dealer feeds</span>
            <span>·</span>
            <span>E-Mount System Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
