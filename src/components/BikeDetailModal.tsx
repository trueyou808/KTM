import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Volume2, Calendar, Calculator, ShieldCheck, Gauge, Award, Fuel } from 'lucide-react';
import { Bike } from '../types';
import { engineSound } from '../utils/soundEngine';

interface BikeDetailModalProps {
  bike: Bike | null;
  onClose: () => void;
  onBookTestRide: (bikeId: string) => void;
}

export const BikeDetailModal: React.FC<BikeDetailModalProps> = ({
  bike,
  onClose,
  onBookTestRide
}) => {
  if (!bike) return null;

  const [selectedColor, setSelectedColor] = useState(bike.colorOptions[0]?.name || 'Standard');
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [isRevving, setIsRevving] = useState(false);

  // EMI calculation: (Price - DownPayment) * (1 + (APR * Years)) / Months
  const price = bike.startingPriceNumber;
  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;
  const annualInterestRate = 0.0499; // 4.99% APR promo rate
  const totalInterest = loanAmount * annualInterestRate * (tenureMonths / 12);
  const monthlyPayment = Math.round((loanAmount + totalInterest) / tenureMonths);

  const handleRev = () => {
    setIsRevving(true);
    engineSound.playRev(bike.revPitch, 1.4);
    setTimeout(() => setIsRevving(false), 1400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        {/* Backdrop dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[#FF6600]/20 border border-[#FF6600]/40 text-[#FF6600] text-xs font-heading font-bold uppercase tracking-wider clip-angled">
                {bike.category}
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white uppercase">
                {bike.name}
              </h3>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            
            {/* Image & Quick Action Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-neutral-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                  <span>Colorway: {selectedColor}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRev}
                  className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded text-xs font-heading font-bold uppercase tracking-wider border transition-all ${
                    isRevving
                      ? 'bg-[#FF6600] text-black border-[#FF6600]'
                      : 'bg-black/80 text-white border-neutral-700 hover:border-[#FF6600]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isRevving ? 'Revving Engine...' : 'Hear Exhaust'}</span>
                </button>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#FF6600] uppercase tracking-widest block mb-1">
                    {bike.tagline}
                  </span>
                  <div className="text-3xl font-heading font-extrabold text-white mb-2">
                    {bike.price}
                    <span className="text-xs text-neutral-400 font-sans font-normal ml-2">Base MSRP</span>
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {bike.longDesc}
                  </p>
                </div>

                {/* Color Selector */}
                <div className="pt-3 border-t border-neutral-800">
                  <span className="text-xs font-semibold uppercase text-neutral-400 block mb-2">
                    Factory Livery Selection
                  </span>
                  <div className="flex gap-3">
                    {bike.colorOptions.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-700"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookTestRide(bike.id);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-bold text-sm uppercase tracking-wider clip-angled transition-all shadow-lg shadow-[#FF6600]/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Test Ride on {bike.name}</span>
                </button>
              </div>
            </div>

            {/* Comprehensive Technical Specifications Table */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="w-4 h-4 text-[#FF6600]" />
                <h4 className="font-heading font-bold text-lg uppercase text-white tracking-wider">
                  Technical Specifications
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Engine Displacement</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.displacement}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Maximum Power Output</span>
                  <div className="text-[#FF6600] font-heading font-bold text-base mt-0.5">{bike.specs.maxPower}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Peak Torque</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.maxTorque}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Top Track Velocity</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.topSpeed}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Acceleration Sprint</span>
                  <div className="text-[#FF6600] font-heading font-bold text-base mt-0.5">{bike.specs.acceleration}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Ready To Race Dry Weight</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.dryWeight}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Seat Ergonomics</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.seatHeight}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Fuel Tank Range</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.fuelCapacity}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Transmission & Clutch</span>
                  <div className="text-white font-heading font-bold text-base mt-0.5">{bike.specs.transmission}</div>
                </div>
                <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-neutral-800 sm:col-span-2 lg:col-span-3">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Suspension & Chassis Setup</span>
                  <div className="text-white font-heading font-bold text-sm mt-0.5">{bike.specs.suspension}</div>
                </div>
              </div>
            </div>

            {/* Model Highlights */}
            <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
              <h4 className="font-heading font-bold text-sm uppercase text-neutral-200 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FF6600]" />
                Key Engineered Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {bike.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF6600] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Finance EMI Estimator */}
            <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#FF6600]" />
                  <h4 className="font-heading font-bold text-base uppercase text-white">
                    Showroom Finance Calculator
                  </h4>
                </div>
                <span className="text-xs text-[#FF6600] font-semibold bg-[#FF6600]/10 px-2 py-1 rounded">
                  Special 4.99% APR Applied
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-bold text-white">${Math.round(downPayment).toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#FF6600] bg-neutral-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-xs text-neutral-400 block mb-2">Loan Duration</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[12, 24, 36, 48].map((months) => (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setTenureMonths(months)}
                          className={`py-1.5 text-xs font-heading font-bold uppercase rounded border transition-all ${
                            tenureMonths === months
                              ? 'bg-[#FF6600] text-black border-[#FF6600]'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {months} Mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-950 rounded-lg border border-neutral-800 text-center flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Estimated Monthly Payment</span>
                  <div className="text-3xl font-heading font-extrabold text-[#FF6600] my-1">
                    ${monthlyPayment} <span className="text-xs text-neutral-400 font-normal">/ month</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    Includes taxes & registration estimates. Subject to credit verification.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white"
            >
              Back to Catalog
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookTestRide(bike.id);
              }}
              className="px-5 py-2.5 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-bold text-xs uppercase tracking-wider clip-angled transition-all"
            >
              Book Test Ride
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
