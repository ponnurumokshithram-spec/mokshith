import React from 'react';
import { Camera, PlusCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'reviews' | 'lenses' | 'tutorials' | 'tracker' | 'community';
  setActiveTab: (tab: 'reviews' | 'lenses' | 'tutorials' | 'tracker' | 'community') => void;
  onOpenListingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenListingModal,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <button
          onClick={() => setActiveTab('reviews')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-lg shadow-sm">
            α
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors whitespace-nowrap">
            AlphaVault
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-white border-b-2 border-orange-500 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            Reviews & Compare
          </button>
          <button
            onClick={() => setActiveTab('lenses')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'lenses'
                ? 'text-white border-b-2 border-orange-500 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            Lens Compatibility
          </button>
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'tutorials'
                ? 'text-white border-b-2 border-orange-500 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            Tutorials
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'tracker'
                ? 'text-white border-b-2 border-orange-500 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            Price Tracker
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'community'
                ? 'text-white border-b-2 border-orange-500 font-semibold'
                : 'hover:text-zinc-200'
            }`}
          >
            Community & Exchange
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenListingModal}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-orange-500 hover:bg-orange-400 rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Gear Listing</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-4 py-2 overflow-x-auto flex items-center gap-4 text-xs font-medium text-zinc-400 no-scrollbar">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`whitespace-nowrap cursor-pointer ${activeTab === 'reviews' ? 'text-orange-400 font-bold' : ''}`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('lenses')}
          className={`whitespace-nowrap cursor-pointer ${activeTab === 'lenses' ? 'text-orange-400 font-bold' : ''}`}
        >
          Lenses
        </button>
        <button
          onClick={() => setActiveTab('tutorials')}
          className={`whitespace-nowrap cursor-pointer ${activeTab === 'tutorials' ? 'text-orange-400 font-bold' : ''}`}
        >
          Tutorials
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`whitespace-nowrap cursor-pointer ${activeTab === 'tracker' ? 'text-orange-400 font-bold' : ''}`}
        >
          Prices
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`whitespace-nowrap cursor-pointer ${activeTab === 'community' ? 'text-orange-400 font-bold' : ''}`}
        >
          Forum & Gear
        </button>
      </div>
    </header>
  );
};
