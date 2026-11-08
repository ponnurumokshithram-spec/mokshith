import React, { useState } from 'react';
import { CAMERAS_DATA } from '../data/camerasData';
import { LENSES_DATA } from '../data/lensesData';
import { LensCategory, LensMount } from '../types/camera';
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  Zap, 
  ShieldCheck, 
  Camera, 
  Layers, 
  ArrowRight,
  Info
} from 'lucide-react';

export const LensCompatibilityView: React.FC = () => {
  // Lens Matcher State
  const [selectedBodyId, setSelectedBodyId] = useState<string>('sony-a7-iv');
  const [selectedLensId, setSelectedLensId] = useState<string>('fe-24-70-f28-gm-ii');

  // Directory Filter State
  const [mountFilter, setMountFilter] = useState<'all' | LensMount>('all');
  const [categoryFilter, setCategoryFilter] = useState<LensCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedBody = CAMERAS_DATA.find((c) => c.id === selectedBodyId) || CAMERAS_DATA[0];
  const selectedLens = LENSES_DATA.find((l) => l.id === selectedLensId) || LENSES_DATA[0];

  // Compatibility Calculation
  const isBodyFullFrame = selectedBody.sensorType === 'Full-Frame';
  const isLensFullFrame = selectedLens.mount === 'FE';

  let coverageStatus: 'full' | 'crop_mode' | 'aps_c_tele';
  let coverageTitle = '';
  let coverageDescription = '';

  if (isBodyFullFrame && isLensFullFrame) {
    coverageStatus = 'full';
    coverageTitle = 'Full-Frame 35mm Native Coverage';
    coverageDescription = `Full sensor area utilized at uncropped ${selectedBody.megapixels} MP resolution. Zero vignetting.`;
  } else if (isBodyFullFrame && !isLensFullFrame) {
    coverageStatus = 'crop_mode';
    coverageTitle = 'Automatic APS-C Crop Mode (1.5x)';
    const croppedMp = Math.round(selectedBody.megapixels / 2.25);
    coverageDescription = `The ${selectedBody.name} will crop its sensor by 1.5x to prevent dark circular vignetting. Effective resolution will be ~${croppedMp} MP.`;
  } else if (!isBodyFullFrame && isLensFullFrame) {
    coverageStatus = 'aps_c_tele';
    coverageTitle = 'APS-C 1.5x Reach Multiplier';
    coverageDescription = `Covers the 26MP APS-C sensor with sweet-spot center glass. Focal length is multiplied by 1.5x (e.g. 70-200mm behaves as 105-300mm equivalent).`;
  } else {
    coverageStatus = 'full';
    coverageTitle = 'Native APS-C Coverage';
    coverageDescription = `Perfect optical match for the ${selectedBody.name} 26MP sensor. Lightweight and balanced.`;
  }

  // Stabilization Sync Analysis
  const hasLensOss = selectedLens.hasOss;
  const hasBodyIbis = selectedBody.ibisStops > 0;
  let stabilizationTitle = '';
  let stabilizationDescription = '';

  if (hasLensOss && hasBodyIbis) {
    stabilizationTitle = 'Dual Optical SteadyShot (IBIS + OSS Co-Sync)';
    stabilizationDescription = `Pitch and Yaw angular shake are corrected by the lens optical elements, while Roll (rotation), X, and Y horizontal/vertical shifts are corrected by the camera sensor.`;
  } else if (!hasLensOss && hasBodyIbis) {
    stabilizationTitle = `Sensor-Shift In-Body Stabilization (${selectedBody.ibisStops} Stops)`;
    stabilizationDescription = `The camera’s 5-axis IBIS sensor mechanism fully stabilizes this lens for handheld photography and smooth video.`;
  } else if (hasLensOss && !hasBodyIbis) {
    stabilizationTitle = 'Optical SteadyShot Lens Stabilization';
    stabilizationDescription = `Stabilization is driven by the internal floating optical elements in the lens barrel.`;
  } else {
    stabilizationTitle = 'Manual / Electronic Stabilization Only';
    stabilizationDescription = `Neither body nor lens features mechanical stabilization. Use a tripod or active electronic gyro stabilization.`;
  }

  // High Speed Continuous Burst Limit
  const isSonyNative = selectedLens.brand.startsWith('Sony');
  const maxBurstAllowed = isSonyNative
    ? Math.min(selectedBody.burstFps, selectedLens.burstFpsLimitWithSony)
    : Math.min(selectedBody.burstFps, 15); // Third-party 15fps cap on Sony E-mount protocol

  // Breathing Compensation Support
  const supportsBreathing = selectedLens.supportsBreathingCompensation && (selectedBody.id === 'sony-a7-iv' || selectedBody.id === 'sony-a7r-v' || selectedBody.id === 'sony-a7c-ii' || selectedBody.id === 'sony-fx3' || selectedBody.id === 'sony-a6700' || selectedBody.id === 'sony-a1-ii');

  // Filtered Lens Directory
  const filteredLenses = LENSES_DATA.filter((lens) => {
    if (mountFilter !== 'all' && lens.mount !== mountFilter) return false;
    if (categoryFilter !== 'all' && lens.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lens.name.toLowerCase().includes(q) ||
        lens.brand.toLowerCase().includes(q) ||
        lens.focalLength.toLowerCase().includes(q) ||
        lens.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Introduction Header */}
      <div className="border-b border-zinc-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Sony E-Mount Lens Compatibility Guide & Interactive Matcher
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Sony's "One Mount" strategy connects full-frame (FE) and APS-C (E) bodies with a single universal bayonet. Test any combination below to verify sensor coverage, stabilization synchronization, burst rate limits, and focus breathing compensation.
        </p>
      </div>

      {/* Interactive Lens Matcher Diagnostic Console */}
      <div className="p-6 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Interactive Compatibility Analyzer</span>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              1. Select Sony Camera Body
            </label>
            <select
              value={selectedBodyId}
              onChange={(e) => setSelectedBodyId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {CAMERAS_DATA.map((cam) => (
                <option key={cam.id} value={cam.id}>
                  {cam.name} ({cam.sensorType} · {cam.megapixels}MP)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              2. Select E-Mount Lens
            </label>
            <select
              value={selectedLensId}
              onChange={(e) => setSelectedLensId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {LENSES_DATA.map((lens) => (
                <option key={lens.id} value={lens.id}>
                  {lens.name} ({lens.mount} Mount · {lens.brand})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Diagnostic Results Card */}
        <div className="p-5 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="text-xs text-zinc-400">Tested Configuration</span>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                {selectedBody.name} <span className="text-orange-400">+</span> {selectedLens.name}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Universal E-Mount Bayonet: Physically 100% Native</span>
            </div>
          </div>

          {/* 4 Diagnostic Result Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Optical Coverage & Crop Factor */}
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold uppercase">Sensor Coverage</span>
                {coverageStatus === 'full' ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Sensor
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> 1.5x Crop Mode
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-zinc-200">{coverageTitle}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{coverageDescription}</p>
            </div>

            {/* 2. Optical Stabilization (IBIS + OSS) */}
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold uppercase">Image Stabilization</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <h4 className="text-sm font-bold text-zinc-200">{stabilizationTitle}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{stabilizationDescription}</p>
            </div>

            {/* 3. High-Speed Burst Speed Limit */}
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold uppercase">Burst Tracking Speed</span>
                <span className="font-mono tabular-nums text-white font-bold">{maxBurstAllowed} fps max</span>
              </div>
              <h4 className="text-sm font-bold text-zinc-200">
                {isSonyNative ? 'Full Unlocked High-Speed Burst' : 'Third-Party 15fps Protocol Cap'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isSonyNative
                  ? `Native Sony linear XD actuators support the full burst speed of the ${selectedBody.name} (up to ${maxBurstAllowed} frames per second with full AF tracking).`
                  : `Sony firmware limits non-Sony E-mount lenses to a maximum of 15 fps on continuous AF tracking. If shooting on A7 IV (10 fps), you will feel zero slowdown.`}
              </p>
            </div>

            {/* 4. Focus Breathing Compensation */}
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold uppercase">Video Breathing Comp</span>
                {supportsBreathing ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Supported
                  </span>
                ) : (
                  <span className="text-zinc-500 font-semibold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Not Supported
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-zinc-200">
                {supportsBreathing ? 'In-Camera Breathing Correction' : 'Standard Optical Behavior'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {supportsBreathing
                  ? `The ${selectedBody.name} digitally eliminates subtle focal changes when racking focus between foreground and background subjects.`
                  : `Breathing compensation is only supported between modern native Sony G/GM lenses and 4th generation camera bodies.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sony E-Mount Lens Directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Sony E-Mount Lens Directory</h3>
            <p className="text-xs text-zinc-400">Explore prime and zoom lenses tested on Sony Alpha sensors.</p>
          </div>

          {/* Search Input & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search focal length, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500 w-52"
              />
            </div>

            {/* Mount Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">
              <button
                onClick={() => setMountFilter('all')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  mountFilter === 'all' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Mounts
              </button>
              <button
                onClick={() => setMountFilter('FE')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  mountFilter === 'FE' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                FE (Full Frame)
              </button>
              <button
                onClick={() => setMountFilter('E')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  mountFilter === 'E' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                E (APS-C)
              </button>
            </div>
          </div>
        </div>

        {/* Lenses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLenses.map((lens) => (
            <div
              key={lens.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="font-semibold text-orange-400">{lens.brand}</span>
                  <span className="font-mono text-zinc-400">{lens.mount} Mount</span>
                </div>

                <h4 className="text-base font-bold text-white">{lens.name}</h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-3 leading-relaxed">
                  {lens.overview}
                </p>

                {/* Specs Pill-Free Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Aperture</span>
                    <span className="text-zinc-200 font-mono font-semibold">{lens.maxAperture}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Filter Thread</span>
                    <span className="text-zinc-200 font-mono font-semibold">{lens.filterDiameterMm} mm</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Weight</span>
                    <span className="text-zinc-200 font-mono font-semibold">{lens.weightGrams} g</span>
                  </div>
                </div>

                {/* Best Uses Unboxed Text */}
                <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span className="text-zinc-500 font-medium">Ideal For: </span>
                  <span>{lens.bestUses.join(' · ')}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">MSRP</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums">
                    ${lens.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedLensId(lens.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                >
                  Test in Matcher
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
