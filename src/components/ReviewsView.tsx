import React, { useState } from 'react';
import { CameraModel, CameraCategory } from '../types/camera';
import { CAMERAS_DATA } from '../data/camerasData';
import { 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  ExternalLink, 
  Camera as CameraIcon, 
  Eye, 
  Zap, 
  Film, 
  Sliders, 
  Sparkles,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';

interface ReviewsViewProps {
  onSelectTrackerModel?: (cameraId: string) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onSelectTrackerModel }) => {
  const [activeCategory, setActiveCategory] = useState<CameraCategory>('all');
  const [selectedCameraForReview, setSelectedCameraForReview] = useState<CameraModel | null>(null);
  const [compareList, setCompareList] = useState<string[]>(['sony-a7-iv', 'sony-a7r-v']);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const filteredCameras = CAMERAS_DATA.filter((camera) => {
    if (activeCategory === 'all') return true;
    return camera.category === activeCategory;
  });

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id));
    } else {
      if (compareList.length >= 3) {
        setCompareList([compareList[1], compareList[2], id]);
      } else {
        setCompareList([...compareList, id]);
      }
    }
  };

  const comparedCameras = CAMERAS_DATA.filter((c) => compareList.includes(c.id));

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Camera Reviews & In-Depth Benchmarks</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-world studio analysis, sensor dynamic range, and field performance metrics.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Models
          </button>
          <button
            onClick={() => setActiveCategory('flagship')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'flagship'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Flagship
          </button>
          <button
            onClick={() => setActiveCategory('high_res')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'high_res'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            High Resolution
          </button>
          <button
            onClick={() => setActiveCategory('hybrid')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'hybrid'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Hybrid
          </button>
          <button
            onClick={() => setActiveCategory('compact')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'compact'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Compact
          </button>
          <button
            onClick={() => setActiveCategory('aps_c')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'aps_c'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            APS-C
          </button>
          <button
            onClick={() => setActiveCategory('cinema')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === 'cinema'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Cinema Line
          </button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCameras.map((camera) => {
          const isComparing = compareList.includes(camera.id);
          const lowestRetailer = camera.retailers.find((r) => r.isLowestPrice) || camera.retailers[0];

          return (
            <div
              key={camera.id}
              className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                <img
                  src={camera.image}
                  alt={camera.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                {/* Quiet unboxed top metadata */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <span className="font-semibold text-white drop-shadow-sm">{camera.categoryLabel}</span>
                  <span className="font-mono text-zinc-400">{camera.releaseYear}</span>
                </div>

                {/* Overall Score Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-orange-500/90 text-zinc-950 font-mono font-bold text-xs tabular-nums">
                    {camera.scores.overall.toFixed(1)} / 10
                  </div>
                  <span className="text-xs text-zinc-300 font-medium">{camera.badge}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {camera.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {camera.tagline}
                  </p>

                  {/* Key Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-xs">
                    <div>
                      <span className="text-zinc-500 block">Sensor</span>
                      <span className="text-zinc-200 font-semibold font-mono tabular-nums">{camera.megapixels} MP {camera.sensorType}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Burst Speed</span>
                      <span className="text-zinc-200 font-semibold font-mono tabular-nums">{camera.burstFps} fps</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Stabilization</span>
                      <span className="text-zinc-200 font-semibold font-mono tabular-nums">{camera.ibisStops} Stops IBIS</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Card Slots</span>
                      <span className="text-zinc-200 font-semibold truncate block">{camera.cardSlots.includes('Dual') ? 'Dual CF-A / SD' : 'Single SD'}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Primary Actions */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-400 block">Best Current Price</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-white font-mono tabular-nums">
                          ${lowestRetailer?.price.toLocaleString()}
                        </span>
                        {lowestRetailer && lowestRetailer.price < lowestRetailer.originalPrice && (
                          <span className="text-zinc-500 line-through font-mono tabular-nums">
                            ${lowestRetailer.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-400 block">Retailer</span>
                      <span className="text-xs text-orange-400 font-medium">{lowestRetailer?.shortName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCameraForReview(camera)}
                      className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleCompare(camera.id)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isComparing
                          ? 'border-orange-500/50 bg-orange-500/10 text-orange-300'
                          : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Tray (when at least 1 camera is selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 border border-zinc-700 backdrop-blur-md rounded-xl p-3 shadow-2xl flex items-center gap-4 max-w-xl w-[92%] sm:w-auto">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-zinc-200">
              Comparing {compareList.length} / 3 models
            </span>
          </div>

          <div className="flex items-center gap-2">
            {comparedCameras.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1 text-xs bg-zinc-800 text-zinc-200 px-2 py-1 rounded border border-zinc-700"
              >
                <span className="truncate max-w-[100px]">{c.name}</span>
                <button
                  onClick={() => toggleCompare(c.id)}
                  className="text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowCompareModal(true)}
            className="ml-auto px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            View Comparison
          </button>
        </div>
      )}

      {/* Full In-Depth Review Modal */}
      {selectedCameraForReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold uppercase tracking-wider">
                  <span>{selectedCameraForReview.categoryLabel}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">Released {selectedCameraForReview.releaseYear}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedCameraForReview.name} Review
                </h2>
                <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                  {selectedCameraForReview.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedCameraForReview(null)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Top Score & Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80">
              <div className="flex flex-col justify-center items-center text-center p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Editorial Score</span>
                <span className="text-4xl font-extrabold text-orange-400 font-mono tabular-nums my-1">
                  {selectedCameraForReview.scores.overall.toFixed(1)}
                </span>
                <span className="text-xs text-zinc-400">out of 10.0</span>
              </div>

              {/* Score Category Breakdown */}
              <div className="md:col-span-2 space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>Autofocus & Subject Tracking</span>
                    <span className="font-mono tabular-nums text-white font-semibold">{selectedCameraForReview.scores.autofocus} / 10</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedCameraForReview.scores.autofocus * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>Sensor Resolution & Dynamic Range</span>
                    <span className="font-mono tabular-nums text-white font-semibold">{selectedCameraForReview.scores.imageQuality} / 10</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedCameraForReview.scores.imageQuality * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>Video & Codec Flexibility</span>
                    <span className="font-mono tabular-nums text-white font-semibold">{selectedCameraForReview.scores.video} / 10</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedCameraForReview.scores.video * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1">
                    <span>Ergonomics & Viewfinder</span>
                    <span className="font-mono tabular-nums text-white font-semibold">{selectedCameraForReview.scores.ergonomics} / 10</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedCameraForReview.scores.ergonomics * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial In-Depth Review Section */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Laboratory & Field Verdict</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedCameraForReview.reviewSummary}
              </p>
              <div className="p-4 bg-zinc-800/40 border border-zinc-800 rounded-lg text-sm text-zinc-200 italic">
                "{selectedCameraForReview.editorialVerdict}"
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-900/30 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Key Strengths</span>
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {selectedCameraForReview.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">·</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-zinc-950 border border-rose-900/30 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-400" />
                  <span>Trade-offs & Considerations</span>
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {selectedCameraForReview.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">·</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sample Shots with EXIF Data */}
            {selectedCameraForReview.sampleShots.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-base font-bold text-white">Sample Field Captures & EXIF Benchmarks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCameraForReview.sampleShots.map((shot, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{shot.title}</span>
                        <span className="text-zinc-500">{shot.genre}</span>
                      </div>
                      <p className="text-xs text-zinc-400">{shot.description}</p>
                      <div className="p-2.5 bg-zinc-900 rounded border border-zinc-800/80 text-xs font-mono tabular-nums text-zinc-300 space-y-1">
                        <div className="text-orange-400 font-sans text-xs font-semibold">{shot.lensUsed}</div>
                        <div className="text-zinc-400 flex items-center gap-2">
                          <span>{shot.settings.aperture}</span>
                          <span>·</span>
                          <span>{shot.settings.shutter}</span>
                          <span>·</span>
                          <span>ISO {shot.settings.iso}</span>
                          <span>·</span>
                          <span>{shot.settings.focalLength}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Retailers Pricing for this model */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Authorized Retail Availability & Bundles</h3>
                <span className="text-xs text-zinc-400">Updated in real time</span>
              </div>

              <div className="space-y-2">
                {selectedCameraForReview.retailers.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{r.name}</span>
                        {r.isLowestPrice && (
                          <span className="text-xs text-emerald-400 font-semibold">Lowest Price</span>
                        )}
                      </div>
                      {r.bundleIncludes && (
                        <p className="text-xs text-zinc-400 mt-0.5">{r.bundleIncludes}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                        <span>{r.shipping}</span>
                        <span>·</span>
                        <span>{r.stockCountText}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-lg font-bold text-white font-mono tabular-nums">
                          ${r.price.toLocaleString()}
                        </span>
                        {r.price < r.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through block font-mono tabular-nums">
                            ${r.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>View Deal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Side-by-Side Sony Camera Comparison</h2>
                <p className="text-xs text-zinc-400 mt-1">Comparing technical specs, video capabilities, and live pricing.</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-3 px-4 text-zinc-400 font-semibold w-1/4">Specification</th>
                    {comparedCameras.map((camera) => (
                      <th key={camera.id} className="py-3 px-4 text-white font-bold text-sm w-1/4">
                        <div className="space-y-1">
                          <span className="text-xs font-normal text-orange-400 block">{camera.badge}</span>
                          <span>{camera.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Sensor & Megapixels</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-200 font-mono tabular-nums font-semibold">
                        {c.megapixels} MP ({c.sensorType})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">In-Body Stabilization</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-200 font-mono tabular-nums font-semibold">
                        {c.ibisStops} Stops IBIS
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Max Continuous Burst</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-200 font-mono tabular-nums font-semibold">
                        {c.burstFps} fps
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Autofocus Points</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-200 font-mono tabular-nums font-semibold">
                        {c.autofocusPoints} Phase-Detect Points
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Video Capabilities</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-300 leading-relaxed">
                        {c.videoSpecs}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Viewfinder (EVF)</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-300">
                        {c.evfResolution}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Screen Type</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-300">
                        {c.screenType}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Weight (Chassis + Battery)</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-200 font-mono tabular-nums font-semibold">
                        {c.weightGrams} grams
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-zinc-400 font-medium">Card Slots</td>
                    {comparedCameras.map((c) => (
                      <td key={c.id} className="py-3 px-4 text-zinc-300">
                        {c.cardSlots}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-zinc-950/40">
                    <td className="py-4 px-4 text-zinc-300 font-bold">Lowest Live Price</td>
                    {comparedCameras.map((c) => {
                      const lowest = c.retailers.find((r) => r.isLowestPrice) || c.retailers[0];
                      return (
                        <td key={c.id} className="py-4 px-4">
                          <div className="font-mono tabular-nums text-base font-bold text-orange-400">
                            ${lowest?.price.toLocaleString()}
                          </div>
                          <span className="text-xs text-zinc-500">at {lowest?.shortName}</span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
