import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Shield, Navigation, CheckCircle, Send, Sparkles, Wrench } from 'lucide-react';
import { showroomsData } from '../data/showroomsData';
import { Showroom } from '../types';
import showroomInteriorImg from '../assets/images/showroom_store_1789319834610.jpg';

export const ShowroomSection: React.FC = () => {
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(showroomsData[0]);
  const [contactSubject, setContactSubject] = useState('General Showroom Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactMessage('');
      setContactEmail('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF6600]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] text-xs font-bold font-heading uppercase tracking-widest clip-angled mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
            EXPERIENCE HUBS & SERVICE
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white">
            VISIT OUR <span className="text-[#FF6600]">SHOWROOMS</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Immerse yourself in the Duke atmosphere. Meet our certified motorsport engineers and explore the complete Duke stable.
          </p>
        </div>

        {/* Showroom Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {showroomsData.map((s) => (
            <button
              key={s.id}
              id={`showroom-tab-${s.id}`}
              type="button"
              onClick={() => setSelectedShowroom(s)}
              className={`px-5 py-3 text-xs font-heading font-extrabold uppercase tracking-wider rounded-lg border transition-all ${
                selectedShowroom.id === s.id
                  ? 'bg-[#FF6600] text-black border-[#FF6600] shadow-lg shadow-[#FF6600]/25'
                  : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <span>{s.name}</span>
              {s.isFlagship && (
                <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded uppercase font-mono ${
                  selectedShowroom.id === s.id ? 'bg-black text-[#FF6600]' : 'bg-[#FF6600]/20 text-[#FF6600]'
                }`}>
                  Flagship
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Showroom Card + Interactive Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Showcase & Operating Information */}
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Showroom Photographic Banner */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
              <img
                src={showroomInteriorImg}
                alt="Motorcycle showroom interior lounge"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              {/* Floating Status Pill */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#FF6600]/40 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN TODAY • WALK-INS WELCOME</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-mono text-[#FF6600] uppercase tracking-wider mb-1">
                  {selectedShowroom.city}
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase">
                  {selectedShowroom.name}
                </h3>
              </div>
            </div>

            {/* Info Grid */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Address */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Location Address</span>
                    <span className="text-white font-medium leading-relaxed">{selectedShowroom.address}</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Hours of Operation</span>
                    <div className="text-white font-medium">Mon - Fri: {selectedShowroom.hours.weekdays}</div>
                    <div className="text-neutral-300">Sat - Sun: {selectedShowroom.hours.weekends}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Direct Line</span>
                    <a href={`tel:${selectedShowroom.phone.split('/')[0]}`} className="text-white font-medium hover:text-[#FF6600] transition-colors">
                      {selectedShowroom.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">Concierge Email</span>
                    <a href={`mailto:${selectedShowroom.email}`} className="text-white font-medium hover:text-[#FF6600] transition-colors truncate block">
                      {selectedShowroom.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Showroom Features / Amenities */}
              <div className="pt-2">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Showroom Amenities & Services
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedShowroom.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#FF6600]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Direction Button */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Valet parking available for motorcycles and cars.
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedShowroom.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#FF6600] hover:text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Showroom Concierge & Service Enquiry */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-[#FF6600]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF6600]">Direct Desk</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl uppercase text-white mb-2">
                ASK THE SHOWROOM TEAM
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                Have questions regarding bike inventory, custom PowerWear gear, parts dispatch, or service bookings? 
                Drop a direct note to our showroom team.
              </p>

              {messageSent ? (
                <div className="p-6 bg-neutral-950 border border-emerald-500/40 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-white uppercase">Inquiry Received</h4>
                  <p className="text-xs text-neutral-400">
                    A showroom specialist from {selectedShowroom.name} will reach out to you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-subject"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600]"
                    >
                      <option>New Motorcycle Purchase Inquiry</option>
                      <option>Duke 390 Inventory & Waiting Period</option>
                      <option>Finance & EMI Pre-Approval</option>
                      <option>Scheduled Workshop Maintenance</option>
                      <option>PowerParts & Performance Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="rider@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                      Your Message or Requirement
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Let us know what you'd like to ask about the bikes, delivery timeline, or financing options..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600] resize-none"
                    />
                  </div>

                  <button
                    id="submit-contact-message-btn"
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-extrabold text-xs uppercase tracking-wider clip-angled transition-all shadow-md shadow-[#FF6600]/20 active:translate-y-0.5"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>Send Message to {selectedShowroom.city}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Hotline Emergency Support */}
            <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6600]/15 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#FF6600]" />
              </div>
              <div className="text-xs">
                <span className="text-neutral-400 block">Immediate Sales Desk Assistance:</span>
                <span className="font-heading font-bold text-white tracking-wider text-sm">+1 (800) 555-DUKE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
