import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, Calendar, Phone, ArrowRight, Gauge } from 'lucide-react';
import { engineSound } from '../utils/soundEngine';

interface NavbarProps {
  onBookTestRideClick: (bikeId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookTestRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [revving, setRevving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRev = () => {
    setRevving(true);
    engineSound.playRev(110, 1.3);
    setTimeout(() => setRevving(false), 1300);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Bikes', href: '#bikes' },
    { label: 'Offers', href: '#offers' },
    { label: 'Test Ride', href: '#test-ride' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-[#FF6600]/30 shadow-2xl shadow-black/80 py-3'
          : 'bg-gradient-to-b from-neutral-950/90 via-neutral-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#home"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
        >
          {/* Angled Badge Icon */}
          <div className="relative w-10 h-10 bg-[#FF6600] clip-angled flex items-center justify-center font-extrabold text-black tracking-tighter text-xl transition-transform group-hover:scale-105 shadow-md shadow-[#FF6600]/30">
            <span>R2R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-widest leading-tight group-hover:text-[#FF6600] transition-colors flex items-center gap-1.5">
              APEX <span className="text-[#FF6600]">DUKE</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-neutral-400">
              Ready To Ride Showroom
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              className="text-sm font-semibold tracking-wider uppercase text-neutral-300 hover:text-[#FF6600] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6600] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sound Rev Engine Button */}
          <button
            id="nav-rev-engine-btn"
            type="button"
            onClick={handleRev}
            title="Blip the 4-stroke throttle (synthesizer audio)"
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded border transition-all ${
              revving
                ? 'bg-[#FF6600] text-black border-[#FF6600] scale-95 shadow-lg shadow-[#FF6600]/40'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-[#FF6600] hover:text-[#FF6600]'
            }`}
          >
            <Gauge className={`w-3.5 h-3.5 ${revving ? 'animate-spin' : ''}`} />
            <span>{revving ? 'Revving...' : 'Rev Engine'}</span>
            <Volume2 className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Book Test Ride CTA */}
          <button
            id="nav-book-test-ride-btn"
            type="button"
            onClick={() => onBookTestRideClick()}
            className="group relative inline-flex items-center gap-2 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-bold text-sm tracking-wider uppercase px-5 py-2.5 transition-all clip-angled shadow-md shadow-[#FF6600]/30 hover:shadow-lg hover:shadow-[#FF6600]/50 hover:translate-y-[-1px] active:translate-y-[0px]"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book Test Ride</span>
            <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-rev-btn"
            type="button"
            onClick={handleRev}
            aria-label="Rev Engine"
            className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#FF6600] active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF6600]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-neutral-950/98 border-b border-[#FF6600]/40 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-heading font-bold uppercase tracking-wider text-neutral-200 hover:text-[#FF6600] py-2 border-b border-neutral-900 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#FF6600]/60" />
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                id="mobile-drawer-test-ride-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookTestRideClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6600] text-black font-heading font-bold text-base uppercase tracking-wider py-3 clip-angled shadow-md shadow-[#FF6600]/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Test Ride</span>
              </button>

              <a
                href="tel:+18005553853"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400 py-2 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>Showroom Hotline: +1 (800) 555-DUKE</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
