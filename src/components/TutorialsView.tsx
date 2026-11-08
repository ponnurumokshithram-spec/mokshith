import React, { useState } from 'react';
import { TUTORIALS_DATA } from '../data/tutorialsData';
import { TutorialGuide } from '../types/camera';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  Sliders, 
  ChevronRight, 
  CheckCircle2, 
  Eye, 
  Zap,
  SlidersHorizontal,
  Flame,
  HelpCircle
} from 'lucide-react';

export const TutorialsView: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialGuide>(TUTORIALS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Interactive Exposure Simulator State
  const [aperture, setAperture] = useState<number>(1.8);
  const [shutterSpeedIndex, setShutterSpeedIndex] = useState<number>(4); // index in shutterArray
  const [iso, setIso] = useState<number>(200);
  const [showZebras, setShowZebras] = useState<boolean>(false);
  const [showPeaking, setShowPeaking] = useState<boolean>(true);

  const shutterSpeeds = ['1/4000s', '1/2000s', '1/1000s', '1/500s', '1/250s', '1/125s', '1/60s', '1/30s', '1/4s'];
  const currentShutter = shutterSpeeds[shutterSpeedIndex];

  // Calculated EV Exposure Offset Simulation
  // Arbitrary baseline: f/2.8, 1/250s, ISO 400 is balanced (0.0 EV)
  const calcEv = () => {
    const apertureEv = Math.log2(aperture * aperture);
    const shutterEv = Math.log2(250 / (shutterSpeedIndex === 0 ? 4000 : shutterSpeedIndex === 1 ? 2000 : shutterSpeedIndex === 2 ? 1000 : shutterSpeedIndex === 3 ? 500 : shutterSpeedIndex === 4 ? 250 : shutterSpeedIndex === 5 ? 125 : shutterSpeedIndex === 6 ? 60 : shutterSpeedIndex === 7 ? 30 : 4));
    const isoEv = Math.log2(iso / 400);
    const evDiff = (isoEv - apertureEv - shutterEv * 0.4).toFixed(1);
    const num = parseFloat(evDiff);
    return num > 3 ? '+3.0' : num < -3 ? '-3.0' : (num >= 0 ? `+${num.toFixed(1)}` : num.toFixed(1));
  };

  const currentEv = calcEv();

  const filteredTutorials = TUTORIALS_DATA.filter((tut) => {
    if (activeCategory === 'all') return true;
    return tut.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  // Calculate simulated blur amount
  const blurPx = Math.max(0, (4 - Math.log2(aperture)) * 3.5);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Sony Alpha Academy: Hands-On Tutorials for New Photographers
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Step-by-step masterclasses designed to flatten the Sony mirrorless learning curve. Master the color-coded menu system, AI eye tracking, zebra highlight warnings, and S-Log video with interactive simulations.
        </p>
      </div>

      {/* Interactive Camera EVF & Exposure Simulator */}
      <div className="p-6 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Interactive Sony Electronic Viewfinder (EVF) Simulator</span>
          </div>
          <span className="text-xs text-zinc-400">
            Tweak dials below to see how Sony's Live View & Peaking react in real time.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Simulated Viewfinder Display Screen */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-xl border-2 border-zinc-700/80 p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden shadow-inner min-h-[300px]">
            {/* Viewfinder Top Status Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-2 z-10">
              <span className="text-orange-400 font-bold">STILLS · M</span>
              <span>RAW Lossless (L)</span>
              <span>[ 9999 ]</span>
              <span className="text-emerald-400">NP-FZ100 84%</span>
            </div>

            {/* Central Simulated Scene Area */}
            <div className="relative my-4 flex-1 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 p-6">
              {/* Background Bokeh Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-200"
                style={{
                  filter: `blur(${blurPx}px)`,
                  backgroundImage: `radial-gradient(circle at 30% 40%, rgba(249, 115, 22, 0.25) 0%, transparent 60%), radial-gradient(circle at 75% 65%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)`,
                }}
              />

              {/* Simulated Subject with Peaking Highlight */}
              <div className="relative z-10 text-center space-y-2">
                <div
                  className={`w-28 h-28 mx-auto rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    showPeaking ? 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]' : 'border-zinc-500'
                  }`}
                >
                  <Eye className={`w-10 h-10 ${showPeaking ? 'text-red-400' : 'text-zinc-300'}`} />
                </div>
                <div className="text-xs font-mono">
                  <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    [·] Eye AF Tracking: Locked
                  </span>
                </div>
              </div>

              {/* Simulated Zebra Pattern Overlays if overexposed */}
              {showZebras && (parseFloat(currentEv) > 1.2 || iso > 3200) && (
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,transparent_4px,transparent_10px)]" />
              )}
            </div>

            {/* Viewfinder Bottom Status Readout (Classic Sony Layout) */}
            <div className="flex items-center justify-between text-xs font-mono text-white border-t border-zinc-800/80 pt-2.5 z-10">
              <span className="text-zinc-300">f/{aperture}</span>
              <span className="text-zinc-300">{currentShutter}</span>
              <span className="text-orange-400 font-bold">MM {currentEv}</span>
              <span className="text-zinc-300">ISO {iso}</span>
              <span className="text-zinc-400">SteadyShot [((o))]</span>
            </div>
          </div>

          {/* Interactive Dials & Control Column */}
          <div className="lg:col-span-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-4">Real-Time Exposure Dials</h3>

              {/* 1. Aperture Slider */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Aperture (f/stop)</span>
                  <span className="font-mono text-orange-400 font-bold">f/{aperture}</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="16"
                  step="0.2"
                  value={aperture}
                  onChange={(e) => setAperture(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 block">
                  {aperture <= 2.8 ? 'Shallow Depth of Field (Creamy Bokeh)' : 'Deep Depth of Field (Sharp Landscapes)'}
                </span>
              </div>

              {/* 2. Shutter Speed Slider */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Shutter Speed</span>
                  <span className="font-mono text-orange-400 font-bold">{currentShutter}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={shutterSpeeds.length - 1}
                  step="1"
                  value={shutterSpeedIndex}
                  onChange={(e) => setShutterSpeedIndex(parseInt(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 block">
                  {shutterSpeedIndex <= 3 ? 'Freezes Fast Action / Wildlife' : 'Standard / Slower hand-held speed'}
                </span>
              </div>

              {/* 3. ISO Slider */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Sensor Sensitivity (ISO)</span>
                  <span className="font-mono text-orange-400 font-bold">ISO {iso}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="12800"
                  step="100"
                  value={iso}
                  onChange={(e) => setIso(parseInt(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 block">
                  {iso <= 800 ? 'Base Native ISO (Maximum Dynamic Range)' : 'High Sensitivity for Low Light / Night'}
                </span>
              </div>
            </div>

            {/* Viewfinder Overlays Toggles */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showZebras}
                  onChange={(e) => setShowZebras(e.target.checked)}
                  className="rounded accent-orange-500"
                />
                <span>Zebra Highlights (100% IRE)</span>
              </label>

              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPeaking}
                  onChange={(e) => setShowPeaking(e.target.checked)}
                  className="rounded accent-orange-500"
                />
                <span>Focus Peaking (Red)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Navigation & Step-by-Step Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tutorial List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tutorial Library</h3>
            <span className="text-xs text-zinc-400">{TUTORIALS_DATA.length} Guides</span>
          </div>

          <div className="space-y-2">
            {TUTORIALS_DATA.map((tutorial) => {
              const isSelected = selectedTutorial.id === tutorial.id;
              return (
                <button
                  key={tutorial.id}
                  onClick={() => setSelectedTutorial(tutorial)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 border-orange-500/60 shadow-sm'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-semibold text-orange-400">{tutorial.category}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {tutorial.estimatedMinutes} min
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {tutorial.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-300 text-[10px] font-medium border border-zinc-800">
                      {tutorial.level}
                    </span>
                    <span className="text-zinc-500">·</span>
                    <span>{tutorial.steps.length} Steps</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Tutorial Full Content */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold uppercase tracking-wider">
              <span>{selectedTutorial.category}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{selectedTutorial.level}</span>
              <span className="text-zinc-600">·</span>
              <span className="font-mono text-zinc-400">{selectedTutorial.estimatedMinutes} Min Read</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {selectedTutorial.title}
            </h3>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
              {selectedTutorial.summary}
            </p>
          </div>

          {/* Hero Tip Box */}
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">Key Golden Rule</span>
              <p className="text-xs sm:text-sm text-zinc-200 mt-0.5 leading-relaxed">{selectedTutorial.heroTip}</p>
            </div>
          </div>

          {/* Steps Breakdown */}
          <div className="space-y-6 pt-2">
            {selectedTutorial.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 text-orange-400 font-mono font-bold text-xs flex items-center justify-center border border-zinc-700">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-zinc-400">{step.summary}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-10">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">·</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>

                {step.sonyMenuPath && (
                  <div className="ml-10 p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
                    <span className="text-zinc-500 font-sans font-semibold">Sony Menu:</span>
                    <span className="text-orange-300">{step.sonyMenuPath}</span>
                  </div>
                )}

                <div className="ml-10 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-xs text-zinc-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-300">Pro Tip: </span>
                    <span>{step.proTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
