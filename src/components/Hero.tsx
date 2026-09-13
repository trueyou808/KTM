import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar, ChevronRight, Gauge, Zap, ShieldAlert, Award } from 'lucide-react';
import heroBikeImg from '../assets/images/hero_sports_bike_1789319764870.jpg';
import { engineSound } from '../utils/soundEngine';

interface HeroProps {
  onExploreClick: () => void;
  onBookTestRideClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookTestRideClick }) => {
  const [rpmValue, setRpmValue] = useState(1200);
  const [isBlipActive, setIsBlipActive] = useState(false);

  const handleThrottleRev = () => {
    setIsBlipActive(true);
    engineSound.playRev(105, 1.4);
    setRpmValue(9500);

    setTimeout(() => {
      setRpmValue(3500);
    }, 450);

    setTimeout(() => {
      setRpmValue(1200);
      setIsBlipActive(false);
    }, 1400);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-neutral-950 racing-stripes"
    >
      {/* Background Decorative Gradients & Circuit Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Intense orange radial glow behind motorcycle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] bg-[#FF6600]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#FF6600]/10 rounded-full blur-[140px]" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 carbon-mesh opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Aggressive Typography & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Top Badge / Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] text-xs font-bold font-heading uppercase tracking-widest clip-angled">
                <Flame className="w-3.5 h-3.5 text-[#FF6600]" />
                2026 DUKE STREETFIGHTER SERIES
              </span>
              <span className="text-neutral-400 text-xs font-mono tracking-widest hidden sm:inline">
                // RACING HERITAGE
              </span>
            </div>

            {/* Main Prompt Headline: "READY TO RIDE?" */}
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white tracking-tight uppercase leading-[0.95] mb-6">
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] via-[#FF8533] to-white">
                RIDE?
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed mb-8">
              Experience unfiltered torque, razor-sharp steel trellis geometry, and track-engineered cornering dynamics. 
              Step into the world of pure naked sports machines built without compromise.
            </p>

            {/* Main Action Buttons (Prompt requirement: Explore Bikes and Book Test Ride) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {/* Explore Bikes Button */}
              <button
                id="hero-explore-bikes-btn"
                type="button"
                onClick={onExploreClick}
                className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 text-black font-heading font-extrabold text-base tracking-wider uppercase px-7 py-3.5 clip-angled transition-all shadow-lg hover:shadow-white/20 active:translate-y-0.5"
              >
                <span>Explore Bikes</span>
                <ChevronRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
              </button>

              {/* Book Test Ride Button */}
              <button
                id="hero-book-test-ride-btn"
                type="button"
                onClick={onBookTestRideClick}
                className="group inline-flex items-center justify-center gap-3 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-extrabold text-base tracking-wider uppercase px-7 py-3.5 clip-angled transition-all shadow-lg shadow-[#FF6600]/30 hover:shadow-xl hover:shadow-[#FF6600]/50 active:translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-black" />
                <span>Book Test Ride</span>
              </button>

              {/* Interactive Rev Throttle Blip Button */}
              <button
                id="hero-rev-blip-btn"
                type="button"
                onClick={handleThrottleRev}
                className={`inline-flex items-center gap-2 border px-4 py-3 rounded-none clip-angled transition-all text-xs uppercase font-bold tracking-wider ${
                  isBlipActive
                    ? 'bg-[#FF6600] text-black border-[#FF6600] scale-95 shadow-md shadow-[#FF6600]'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:border-[#FF6600] hover:text-[#FF6600]'
                }`}
              >
                <Zap className={`w-4 h-4 ${isBlipActive ? 'animate-bounce text-black' : 'text-[#FF6600]'}`} />
                <span>{isBlipActive ? 'RPM PEAKING!' : 'Rev Throttle'}</span>
              </button>
            </div>

            {/* Quick Spec Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/80 max-w-2xl">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Top Acceleration</span>
                <span className="font-heading font-extrabold text-2xl text-white">
                  0-100 <span className="text-sm font-semibold text-[#FF6600]">4.8s</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Engine Max Power</span>
                <span className="font-heading font-extrabold text-2xl text-white">
                  45 <span className="text-sm font-semibold text-[#FF6600]">HP</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Suspension Tech</span>
                <span className="font-heading font-extrabold text-2xl text-white">
                  WP <span className="text-sm font-semibold text-[#FF6600]">APEX</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Safety Suite</span>
                <span className="font-heading font-extrabold text-2xl text-white">
                  BOSCH <span className="text-sm font-semibold text-[#FF6600]">ABS</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact KTM Sports Motorcycle Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Motorcycle Card Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 p-2 shadow-2xl shadow-black">
              {/* Outer orange corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF6600]/30 to-transparent pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#FF6600]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Main Sports Motorcycle Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-950">
                <img
                  id="hero-motorcycle-img"
                  src={heroBikeImg}
                  alt="KTM-inspired high performance sports naked motorcycle"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual racing watermark badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-[#FF6600]/40 px-3 py-1.5 rounded clip-angled flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6600] animate-ping" />
                  <span className="font-heading text-xs font-bold tracking-widest text-white uppercase">
                    390 DUKE GEN-3 PLATFORM
                  </span>
                </div>

                {/* Simulated Live RPM Gauge Overlay */}
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded flex items-center gap-2 font-mono text-xs">
                  <Gauge className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span className="text-neutral-400">RPM:</span>
                  <span className={`font-bold transition-colors ${rpmValue > 7000 ? 'text-[#FF6600]' : 'text-white'}`}>
                    {rpmValue}
                  </span>
                </div>
              </div>

              {/* Bottom Feature Pill Row */}
              <div className="mt-3 px-3 py-2 bg-neutral-950/70 rounded-lg flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>Cornering MTC</span>
                </div>
                <div className="h-3 w-[1px] bg-neutral-800" />
                <div className="flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>Supermoto Mode</span>
                </div>
                <div className="h-3 w-[1px] bg-neutral-800" />
                <div className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-[#FF6600]" />
                  <span>Quickshifter+</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
