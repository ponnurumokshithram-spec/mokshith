import React, { useState } from 'react';
import { CAMERAS_DATA } from '../data/camerasData';
import { CameraModel, RetailerPrice } from '../types/camera';
import { 
  TrendingDown, 
  RefreshCw, 
  Bell, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles,
  ShoppingBag,
  DollarSign,
  X
} from 'lucide-react';

export const PriceTrackerView: React.FC = () => {
  const [cameras, setCameras] = useState<CameraModel[]>(CAMERAS_DATA);
  const [filterDiscountedOnly, setFilterDiscountedOnly] = useState<boolean>(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertTargetCameraId, setAlertTargetCameraId] = useState<string>('sony-a7-iv');
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('2100');
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertSuccessMsg, setAlertSuccessMsg] = useState<string | null>(null);

  // Simulate real-time price & stock refresh
  const handleSimulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Create slight simulated updates
      const updated = cameras.map((cam) => {
        const updatedRetailers = cam.retailers.map((ret) => {
          return {
            ...ret,
            lastUpdated: '10 seconds ago',
          };
        });
        return {
          ...cam,
          retailers: updatedRetailers,
        };
      });
      setCameras(updated);
      setIsRefreshing(false);
      setLastRefreshedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 700);
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    const cam = cameras.find((c) => c.id === alertTargetCameraId);
    setAlertSuccessMsg(`Price alert saved! We will monitor authorized retailers for ${cam?.name} under $${alertTargetPrice}.`);
    setTimeout(() => {
      setShowAlertModal(false);
      setAlertSuccessMsg(null);
      setAlertEmail('');
    }, 2200);
  };

  const displayedCameras = cameras.filter((cam) => {
    if (!filterDiscountedOnly) return true;
    const lowest = cam.retailers.find((r) => r.isLowestPrice) || cam.retailers[0];
    return lowest && lowest.price < lowest.originalPrice;
  });

  return (
    <div className="space-y-8">
      {/* Header and Live Control Strip */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Real-Time Sony Camera Price & Availability Tracker
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Polling
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Aggregated from authorized dealers (B&H, Adorama, Amazon, Sony Direct) with instant rebate verification.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterDiscountedOnly(!filterDiscountedOnly)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterDiscountedOnly
                ? 'bg-orange-500/10 border-orange-500/50 text-orange-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5 text-orange-400" />
            <span>Active Rebates Only</span>
          </button>

          <button
            onClick={() => setShowAlertModal(true)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-orange-400" />
            <span>Set Price Alert</span>
          </button>

          <button
            onClick={handleSimulateRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-zinc-950 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Prices</span>
          </button>
        </div>
      </div>

      {/* Real-time sync timestamp banner */}
      <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>Last automated price verification: <strong className="text-zinc-200 font-mono">{lastRefreshedTime}</strong></span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">All prices in USD. Authorized US warranty inventory only.</span>
      </div>

      {/* Camera Price Comparison Cards */}
      <div className="space-y-6">
        {displayedCameras.map((camera) => {
          const lowestRetailer = camera.retailers.find((r) => r.isLowestPrice) || camera.retailers[0];
          const hasDiscount = lowestRetailer && lowestRetailer.price < lowestRetailer.originalPrice;
          const savings = hasDiscount ? lowestRetailer.originalPrice - lowestRetailer.price : 0;

          return (
            <div
              key={camera.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 hover:border-zinc-700 transition-colors"
            >
              {/* Camera Header Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                    <img
                      src={camera.image}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{camera.name}</h3>
                      <span className="text-xs text-zinc-400">({camera.categoryLabel})</span>
                    </div>
                    <p className="text-xs text-zinc-400">{camera.sensor}</p>
                  </div>
                </div>

                {/* Lowest Live Price Callout */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs text-zinc-500 block">Lowest Authorized Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                        ${lowestRetailer?.price.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <div className="text-right">
                          <span className="text-xs text-zinc-500 line-through block font-mono tabular-nums">
                            ${lowestRetailer.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-400">
                            Save ${savings}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setAlertTargetCameraId(camera.id);
                      setAlertTargetPrice((lowestRetailer?.price - 100).toString());
                      setShowAlertModal(true);
                    }}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Alert me when this price drops"
                  >
                    <Bell className="w-4 h-4 text-orange-400" />
                  </button>
                </div>
              </div>

              {/* Retailers Table for this Model */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800/60 pb-2">
                      <th className="py-2 font-medium">Authorized Retailer</th>
                      <th className="py-2 font-medium">Availability & Stock</th>
                      <th className="py-2 font-medium">Included Bundles</th>
                      <th className="py-2 font-medium">Price</th>
                      <th className="py-2 font-medium text-right">Direct Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {camera.retailers.map((ret) => (
                      <tr key={ret.id} className="hover:bg-zinc-950/40 transition-colors">
                        <td className="py-3 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span>{ret.name}</span>
                            {ret.isLowestPrice && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-mono">
                                Best Price
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500 font-normal block font-mono">
                            Checked {ret.lastUpdated}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            {ret.stockStatus === 'in_stock' ? (
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                            ) : (
                              <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                            )}
                            <span className="text-zinc-200">{ret.stockCountText || 'In Stock'}</span>
                          </div>
                          <span className="text-[11px] text-zinc-500 block">{ret.shipping}</span>
                        </td>
                        <td className="py-3 text-zinc-300 max-w-xs">
                          {ret.bundleIncludes || 'Standard camera box contents'}
                        </td>
                        <td className="py-3">
                          <span className="text-sm font-bold text-white font-mono tabular-nums">
                            ${ret.price.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <a
                            href={ret.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                          >
                            <span>Buy</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Price History Sparkline / Text */}
              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">6-Month Price Trend:</span>
                  <div className="flex items-center gap-2 font-mono tabular-nums text-zinc-300">
                    {camera.priceHistory.map((h, i) => (
                      <span key={i} className="text-zinc-400">
                        {h.month}: <strong className="text-zinc-200">${h.price}</strong>
                        {i < camera.priceHistory.length - 1 && <span className="text-zinc-600 ml-2">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Set Price Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-400" />
                <h3 className="text-base font-bold text-white">Create Real-Time Price Alert</h3>
              </div>
              <button
                onClick={() => setShowAlertModal(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {alertSuccessMsg ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Alert Successfully Scheduled</span>
                </div>
                <p>{alertSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSaveAlert} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Camera Body to Track
                  </label>
                  <select
                    value={alertTargetCameraId}
                    onChange={(e) => setAlertTargetCameraId(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {cameras.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Target Price Threshold ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-xs">$</span>
                    <input
                      type="number"
                      required
                      value={alertTargetPrice}
                      onChange={(e) => setAlertTargetPrice(e.target.value)}
                      placeholder="e.g. 2100"
                      className="w-full pl-7 pr-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    We trigger notifications when any authorized retailer drops to or below this amount.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Notification Email
                  </label>
                  <input
                    type="email"
                    required
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="photographer@example.com"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAlertModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Activate Alert
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
