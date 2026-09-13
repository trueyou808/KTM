import React, { useState } from 'react';
import { ArrowUp, Phone, Shield, Mail, CheckCircle2, ChevronRight, Flame } from 'lucide-react';

interface FooterProps {
  onSelectBikeForDetailsById: (bikeId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectBikeForDetailsById }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-950 text-white border-t border-neutral-800 pt-16 pb-12 relative overflow-hidden">
      {/* Upper orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6600] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Vision & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6600] clip-angled flex items-center justify-center font-extrabold text-black tracking-tighter text-xl">
                <span>R2R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl text-white tracking-widest leading-tight">
                  APEX <span className="text-[#FF6600]">DUKE</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-neutral-400">
                  Ready To Ride Showroom
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed pr-4">
              Dedicated to uncompromising naked performance, precision trellis engineering, and track-forged thrills. 
              Discover the full Duke arsenal and book your personal test ride today.
            </p>

            {/* 24/7 Roadside Assistance Badge */}
            <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center gap-3 max-w-sm">
              <div className="w-8 h-8 rounded bg-[#FF6600]/20 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#FF6600]" />
              </div>
              <div className="text-xs">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">24/7 Emergency Roadside Desk</span>
                <span className="font-heading font-bold text-white tracking-wider">+1 (800) 555-APEX</span>
              </div>
            </div>
          </div>

          {/* Duke Lineup Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Duke Lineup
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'KTM 125 Duke', id: 'ktm-125-duke' },
                { name: 'KTM 200 Duke', id: 'ktm-200-duke' },
                { name: 'KTM 250 Duke', id: 'ktm-250-duke' },
                { name: 'KTM 390 Duke', id: 'ktm-390-duke' }
              ].map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => onSelectBikeForDetailsById(b.id)}
                    className="text-neutral-400 hover:text-[#FF6600] transition-colors flex items-center gap-1 group text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FF6600] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{b.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Services Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#home" className="hover:text-[#FF6600] transition-colors">Home Showcase</a></li>
              <li><a href="#bikes" className="hover:text-[#FF6600] transition-colors">All Duke Models</a></li>
              <li><a href="#offers" className="hover:text-[#FF6600] transition-colors">Seasonal Offers</a></li>
              <li><a href="#test-ride" className="hover:text-[#FF6600] transition-colors">Book Test Ride</a></li>
              <li><a href="#contact" className="hover:text-[#FF6600] transition-colors">Showrooms & Contact</a></li>
            </ul>
          </div>

          {/* Newsletter / Paddock Club Subscription */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
              Paddock Club Dispatch
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe for track day announcements, technical releases, and exclusive seasonal finance packages.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-900 border border-emerald-500/40 rounded-lg flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're in the paddock club! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6600]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-bold text-xs uppercase tracking-wider clip-angled transition-all"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-neutral-400 block">
                  Zero spam. Unsubscribe anytime with 1-click.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="space-y-1 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} APEX DUKE MOTORS SHOWROOM. All rights reserved.
            </p>
            <p className="text-[11px] text-neutral-400 max-w-2xl">
              Disclaimer: This website is an independent dealership demo inspired by modern Austrian naked motorcycle styling. 
              Duke and associated designations are trademarks of their respective brand holders.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all text-xs uppercase font-mono"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF6600]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
