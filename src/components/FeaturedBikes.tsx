import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bike } from '../types';
import { bikesData } from '../data/bikesData';
import { Zap, Gauge, ArrowRight, Check, Volume2, Flame } from 'lucide-react';
import { engineSound } from '../utils/soundEngine';

interface FeaturedBikesProps {
  onSelectBikeForDetails: (bike: Bike) => void;
  onBookTestRide: (bikeId: string) => void;
}

export const FeaturedBikes: React.FC<FeaturedBikesProps> = ({
  onSelectBikeForDetails,
  onBookTestRide
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeRevId, setActiveRevId] = useState<string | null>(null);

  const categories = ['All', 'Urban Naked', 'Streetfighter', 'Corner Rocket'];

  const filteredBikes = activeCategory === 'All'
    ? bikesData
    : bikesData.filter(bike => bike.category === activeCategory);

  const handleBikeRev = (e: React.MouseEvent, bike: Bike) => {
    e.stopPropagation();
    setActiveRevId(bike.id);
    engineSound.playRev(bike.revPitch, 1.2);
    setTimeout(() => {
      setActiveRevId(null);
    }, 1200);
  };

  return (
    <section id="bikes" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900">
      {/* Decorative track lines & orange background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6600]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-1 bg-[#FF6600]" />
              <span className="text-[#FF6600] font-heading text-xs uppercase tracking-widest font-bold">
                THE DUKE ARSENAL
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white">
              FEATURED <span className="text-[#FF6600]">DUKE</span> MACHINES
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              From entry-level city scalpel to the corner-shredding apex beast, choose your weapon.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-900/90 p-1.5 rounded-lg border border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-all clip-angled ${
                  activeCategory === cat
                    ? 'bg-[#FF6600] text-black shadow-md shadow-[#FF6600]/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBikes.map((bike, index) => {
            const isRevving = activeRevId === bike.id;

            return (
              <motion.article
                key={bike.id}
                id={`bike-card-${bike.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-[#FF6600]/80 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#FF6600]/10 hover:-translate-y-1"
              >
                {/* Top Corner Ribbon / Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-black/85 backdrop-blur-md border border-[#FF6600]/50 text-[#FF6600] text-[10px] font-heading font-bold uppercase tracking-widest clip-angled">
                    {bike.category}
                  </span>
                </div>

                {/* Rev Audio Button */}
                <button
                  type="button"
                  title={`Rev ${bike.name} engine`}
                  onClick={(e) => handleBikeRev(e, bike)}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all ${
                    isRevving
                      ? 'bg-[#FF6600] text-black border-[#FF6600] animate-pulse'
                      : 'bg-black/75 text-neutral-300 border-neutral-700 hover:border-[#FF6600] hover:text-[#FF6600]'
                  }`}
                  aria-label={`Rev engine of ${bike.name}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {/* Image Showcase */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 p-3 pt-6 flex items-center justify-center">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle lower gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tagline & Model Name */}
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF6600] font-semibold mb-1">
                      {bike.tagline}
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide uppercase group-hover:text-[#FF6600] transition-colors">
                      {bike.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="mt-1 mb-4 flex items-baseline gap-2">
                      <span className="text-xl font-heading font-bold text-white">
                        {bike.price}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        MSRP starting
                      </span>
                    </div>

                    {/* Short Specs Grid (Required by prompt) */}
                    <div className="grid grid-cols-2 gap-2.5 py-3 px-3 bg-neutral-950/80 rounded-lg border border-neutral-800/80 mb-4 text-xs">
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Displacement</span>
                        <span className="font-heading font-bold text-white text-sm">{bike.specs.displacement}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Power</span>
                        <span className="font-heading font-bold text-[#FF6600] text-sm">{bike.specs.maxPower.split('@')[0]}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Torque</span>
                        <span className="font-heading font-bold text-white text-sm">{bike.specs.maxTorque.split('@')[0]}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Dry Weight</span>
                        <span className="font-heading font-bold text-white text-sm">{bike.specs.dryWeight}</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                      {bike.shortDesc}
                    </p>
                  </div>

                  {/* Actions: View Details & Quick Test Ride */}
                  <div className="pt-2 flex flex-col gap-2 border-t border-neutral-800">
                    {/* View Details Button (Prompt required) */}
                    <button
                      id={`view-details-${bike.id}`}
                      type="button"
                      onClick={() => onSelectBikeForDetails(bike)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-heading font-bold text-xs uppercase tracking-wider rounded transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF6600]" />
                    </button>

                    {/* Quick Book Test Ride */}
                    <button
                      id={`card-book-test-ride-${bike.id}`}
                      type="button"
                      onClick={() => onBookTestRide(bike.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FF6600]/15 hover:bg-[#FF6600] border border-[#FF6600]/40 text-[#FF6600] hover:text-black font-heading font-bold text-xs uppercase tracking-wider rounded transition-all"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Book Test Ride</span>
                    </button>
                  </div>
                </div>

                {/* Bottom racing accent line */}
                <div className="h-1 w-full bg-neutral-800 group-hover:bg-[#FF6600] transition-colors" />
              </motion.article>
            );
          })}
        </div>

        {/* Comparison Callout Bar */}
        <div className="mt-14 p-6 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FF6600]/20 border border-[#FF6600]/40 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-[#FF6600]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                Need Help Selecting Your Duke?
              </h4>
              <p className="text-xs text-neutral-400">
                Compare power outputs, seat ergonomics, and license eligibility with our showroom specialists.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onBookTestRide('ktm-390-duke')}
            className="whitespace-nowrap px-6 py-2.5 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-extrabold text-xs uppercase tracking-wider clip-angled transition-all shadow-md shadow-[#FF6600]/20"
          >
            Consult a Specialist
          </button>
        </div>

      </div>
    </section>
  );
};
