import React from 'react';
import { Camera, CheckCircle2, ChevronRight, Compass, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreReviews: () => void;
  onExploreLenses: () => void;
  onExploreTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreReviews,
  onExploreLenses,
  onExploreTracker,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
              <span>The Independent Sony Alpha Ecosystem Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl" style={{ textWrap: 'balance' }}>
              Master the Sony Mirrorless System with Precision & Insight
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Laboratory-tested camera reviews, intelligent E-Mount lens compatibility diagnostics, hands-on tutorials for beginners, real-time retailer price tracking, and an active peer gear exchange.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreReviews}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <span>Explore Camera Reviews</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreLenses}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-orange-400" />
                <span>Test Lens Compatibility</span>
              </button>
              <button
                onClick={onExploreTracker}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>Live Deals & Pricing</span>
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block text-zinc-200 font-semibold text-sm font-mono tabular-nums">6 Flagships</span>
                <span className="text-zinc-500">A1 II to A6700 in-depth</span>
              </div>
              <div>
                <span className="block text-zinc-200 font-semibold text-sm font-mono tabular-nums">5 Retailers</span>
                <span className="text-zinc-500">Real-time stock alerts</span>
              </div>
              <div>
                <span className="block text-zinc-200 font-semibold text-sm font-mono tabular-nums">100% Native</span>
                <span className="text-zinc-500">FE & E-Mount diagnostics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img
                src="/src/assets/images/sony_alpha_flagship_hero_1794132074117.jpg"
                alt="Sony Alpha Full Frame Mirrorless Camera with G Master lens"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-zinc-900/85 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold">
                    <span>Spotlight Flagship</span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-zinc-400">Sony Alpha 1 II</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5">50.1 MP · 30 fps blackout-free · 8K 30p</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Lowest Authorized</span>
                  <span className="text-sm font-bold text-white font-mono tabular-nums">$6,498</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
