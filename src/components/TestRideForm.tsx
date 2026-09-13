import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, CheckCircle2, User, Mail, Phone, Shield, ArrowRight, X, Sparkles, FileText, Check } from 'lucide-react';
import { bikesData } from '../data/bikesData';
import { showroomsData } from '../data/showroomsData';
import { TestRideSubmission } from '../types';

interface TestRideFormProps {
  preselectedBikeId?: string;
}

export const TestRideForm: React.FC<TestRideFormProps> = ({ preselectedBikeId }) => {
  const [bikeModel, setBikeModel] = useState<string>(preselectedBikeId || bikesData[3].id);
  const [showroomLocation, setShowroomLocation] = useState<string>(showroomsData[0].id);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM - 12:00 PM');
  const [hasLicense, setHasLicense] = useState<boolean>(true);
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<TestRideSubmission | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Sync if preselected bike changes externally
  useEffect(() => {
    if (preselectedBikeId) {
      setBikeModel(preselectedBikeId);
    }
  }, [preselectedBikeId]);

  // Set default minimum date (tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    setPreferredDate(dateString);
  }, []);

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '05:00 PM - 06:00 PM'
  ];

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full legal name.';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please provide a valid email address.';
    if (!phone.trim() || phone.length < 8) errors.phone = 'Please provide a valid contact number.';
    if (!preferredDate) errors.preferredDate = 'Please select a preferred date.';
    if (!hasLicense) errors.hasLicense = 'A valid motorcycle endorsement is required for test rides.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedBikeObj = bikesData.find(b => b.id === bikeModel);
      const selectedShowroomObj = showroomsData.find(s => s.id === showroomLocation);

      const booking: TestRideSubmission = {
        id: `R2R-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        email,
        phone,
        bikeModel: selectedBikeObj?.name || 'KTM Duke',
        location: selectedShowroomObj?.name || 'Downtown Showroom',
        date: preferredDate,
        timeSlot,
        hasValidLicense: hasLicense,
        ridingExperience: experience,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConfirmedBooking(booking);
      setIsSubmitting(false);
    }, 700);
  };

  const selectedBike = bikesData.find(b => b.id === bikeModel) || bikesData[0];
  const selectedShowroom = showroomsData.find(s => s.id === showroomLocation) || showroomsData[0];

  return (
    <section id="test-ride" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6600]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] text-xs font-bold font-heading uppercase tracking-widest clip-angled mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
            EXPERIENCE THE SURGE
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white">
            BOOK YOUR <span className="text-[#FF6600]">TEST RIDE</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Feel the razor-sharp chassis response and explosive single-cylinder torque firsthand. 
            Helmet and riding gear available on-site.
          </p>
        </div>

        {/* Two-Column Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Summary Showcase */}
          <div className="lg:col-span-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#FF6600] tracking-wider">
                  Configured Test Machine
                </span>
                <span className="text-xs text-neutral-400">
                  {selectedBike.category}
                </span>
              </div>

              {/* Bike Thumbnail */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 mb-5">
                <img
                  src={selectedBike.image}
                  alt={selectedBike.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-heading font-bold text-white uppercase">
                  {selectedBike.name}
                </div>
              </div>

              {/* Specs Quick Checklist */}
              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Power Rating:</span>
                  <span className="font-heading font-bold text-white">{selectedBike.specs.maxPower}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Peak Torque:</span>
                  <span className="font-heading font-bold text-[#FF6600]">{selectedBike.specs.maxTorque}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Dry Weight:</span>
                  <span className="font-heading font-bold text-white">{selectedBike.specs.dryWeight}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400">Selected Showroom:</span>
                  <span className="font-heading font-bold text-neutral-200 truncate max-w-[180px]">{selectedShowroom.name}</span>
                </div>
              </div>
            </div>

            {/* Test Ride Requirements Callout */}
            <div className="mt-8 p-4 bg-neutral-950/80 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-2">
                <Shield className="w-4 h-4 text-[#FF6600]" />
                Rider Checklist for Test Day
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                <li>Valid motorcycle license / endorsement card</li>
                <li>DOT/ECE certified full-face helmet (or borrow ours)</li>
                <li>Sturdy boots and riding jacket recommended</li>
                <li>Zero commitment: Pure riding evaluation</li>
              </ul>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Duke Model */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  1. Select Your Duke Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {bikesData.map((bike) => (
                    <button
                      key={bike.id}
                      type="button"
                      onClick={() => setBikeModel(bike.id)}
                      className={`p-3 text-left rounded-lg border transition-all ${
                        bikeModel === bike.id
                          ? 'border-[#FF6600] bg-[#FF6600]/10 text-white shadow-md shadow-[#FF6600]/10'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-heading font-bold text-xs uppercase leading-tight text-white">
                        {bike.name.replace('KTM ', '')}
                      </div>
                      <div className="text-[10px] text-[#FF6600] font-mono mt-1">
                        {bike.specs.displacement}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Showroom & Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="test-ride-location" className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
                    2. Showroom Location
                  </label>
                  <select
                    id="test-ride-location"
                    value={showroomLocation}
                    onChange={(e) => setShowroomLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600] transition-colors"
                  >
                    {showroomsData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="test-ride-date" className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                    3. Preferred Ride Date
                  </label>
                  <input
                    id="test-ride-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600] transition-colors"
                  />
                  {formErrors.preferredDate && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.preferredDate}</span>
                  )}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF6600]" />
                  4. Available Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 px-2 text-center rounded border text-[11px] font-medium transition-all ${
                        timeSlot === slot
                          ? 'bg-[#FF6600] text-black font-bold border-[#FF6600]'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {slot.split(' - ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Rider Contact Details */}
              <div className="pt-2 border-t border-neutral-800 space-y-4">
                <span className="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-300">
                  5. Rider Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="test-ride-name" className="block text-[11px] text-neutral-400 mb-1">Full Legal Name</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        id="test-ride-name"
                        type="text"
                        placeholder="Alex Hunter"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>
                    {formErrors.fullName && (
                      <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="test-ride-email" className="block text-[11px] text-neutral-400 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        id="test-ride-email"
                        type="email"
                        placeholder="alex@rider.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>
                    {formErrors.email && (
                      <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="test-ride-phone" className="block text-[11px] text-neutral-400 mb-1">Mobile Phone</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        id="test-ride-phone"
                        type="tel"
                        placeholder="+1 (555) 019-2831"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>
                    {formErrors.phone && (
                      <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <span className="block text-[11px] text-neutral-400 mb-1.5">Motorcycle Riding Experience</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'beginner', label: 'Learner / < 1 Year' },
                    { key: 'intermediate', label: '1 - 4 Years Street' },
                    { key: 'expert', label: '5+ Years / Track' }
                  ].map((exp) => (
                    <button
                      key={exp.key}
                      type="button"
                      onClick={() => setExperience(exp.key as 'beginner' | 'intermediate' | 'expert')}
                      className={`py-2 px-2 text-center text-xs rounded border transition-all ${
                        experience === exp.key
                          ? 'border-[#FF6600] bg-[#FF6600]/10 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* License Checkbox Confirmation */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLicense}
                    onChange={(e) => setHasLicense(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-neutral-950 border-neutral-700 accent-[#FF6600]"
                  />
                  <span className="text-xs text-neutral-300">
                    I confirm I hold a valid 2-wheeler motorcycle driver's license and agree to wear proper riding attire during the test ride.
                  </span>
                </label>
                {formErrors.hasLicense && (
                  <span className="text-[11px] text-red-400 mt-1 block">{formErrors.hasLicense}</span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                id="submit-test-ride-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-extrabold text-sm uppercase tracking-wider clip-angled transition-all shadow-xl shadow-[#FF6600]/25 active:translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Test Slot...</span>
                ) : (
                  <>
                    <span>Confirm Test Ride Slot</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Confirmation Booking Modal / Pass */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-neutral-950 border border-[#FF6600]/60 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden text-center"
          >
            {/* Top decorative accent */}
            <div className="w-16 h-16 rounded-full bg-[#FF6600]/20 border border-[#FF6600] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#FF6600]" />
            </div>

            <span className="px-3 py-1 bg-[#FF6600]/15 text-[#FF6600] text-xs font-mono font-bold tracking-widest rounded clip-angled inline-block mb-2">
              BOOKING CONFIRMED: {confirmedBooking.id}
            </span>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase mb-2">
              YOU'RE READY TO RIDE!
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto mb-6">
              Your test ride slot has been officially reserved. An SMS and email confirmation have been dispatched.
            </p>

            {/* Pass Ticket Box */}
            <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Rider Name:</span>
                <span className="font-bold text-white">{confirmedBooking.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Motorcycle:</span>
                <span className="font-bold text-[#FF6600]">{confirmedBooking.bikeModel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Location:</span>
                <span className="font-bold text-white">{confirmedBooking.location}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Date & Slot:</span>
                <span className="font-bold text-white">{confirmedBooking.date} @ {confirmedBooking.timeSlot}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-3 bg-[#FF6600] hover:bg-[#E55B00] text-black font-heading font-bold text-xs uppercase tracking-wider clip-angled transition-all"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
