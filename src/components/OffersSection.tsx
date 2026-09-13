import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, Clock, Copy, Check, Sparkles, ArrowRight, Zap, Gift } from 'lucide-react';
import { offersData } from '../data/offersData';
import { Offer } from '../types';

interface OffersSectionProps {
  onClaimOffer: (offerCode: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onClaimOffer }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section id="offers" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900 racing-stripes">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF6600]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] text-xs font-bold font-heading uppercase tracking-widest clip-angled mb-3">
              <Gift className="w-3.5 h-3.5 text-[#FF6600]" />
              SEASONAL RACING CAMPAIGN
            </div>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white">
              EXCLUSIVE <span className="text-[#FF6600]">SHOWROOM</span> OFFERS
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Limited-time seasonal incentives, factory finance subsidies, and performance upgrades.
            </p>
          </div>

          {/* Countdown Pill */}
          <div className="bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-xl flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#FF6600] animate-pulse" />
            <div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">Current Campaign Ends In</div>
              <div className="font-heading font-extrabold text-base text-white tracking-widest">
                14 DAYS : 08 HRS : 42 MIN
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offersData.map((offer, index) => {
            const isCopied = copiedCode === offer.code;

            return (
              <motion.div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-[#FF6600]/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                {/* Diagonal Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF6600]/15 to-transparent rounded-tr-2xl pointer-events-none" />

                <div>
                  {/* Top Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#FF6600]/20 border border-[#FF6600]/50 text-[#FF6600] text-xs font-heading font-bold uppercase tracking-wider clip-angled">
                      {offer.badge}
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-white">
                      {offer.discount}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase group-hover:text-[#FF6600] transition-colors leading-tight mb-1">
                    {offer.title}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                    {offer.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {offer.description}
                  </p>

                  {/* Eligible Bikes Chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[11px] text-neutral-400 font-mono">Applicable:</span>
                    {offer.eligibleBikes.map((bikeName) => (
                      <span
                        key={bikeName}
                        className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded text-[11px] font-semibold text-neutral-300"
                      >
                        {bikeName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Promo Code Box */}
                  <div className="w-full sm:w-auto flex items-center justify-between gap-3 bg-neutral-950 border border-neutral-800 px-3.5 py-2 rounded-lg font-mono text-xs">
                    <span className="text-neutral-400 uppercase tracking-widest text-[10px]">Code:</span>
                    <span className="font-bold text-[#FF6600] tracking-wider">{offer.code}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="text-neutral-400 hover:text-white transition-colors"
                      title="Copy promo code"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Claim Offer CTA */}
                  <button
                    type="button"
                    onClick={() => onClaimOffer(offer.code)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-extrabold text-xs uppercase tracking-wider clip-angled transition-all shadow-md shadow-[#FF6600]/20"
                  >
                    <span>Claim & Test Ride</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
