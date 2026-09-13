import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBikes } from './components/FeaturedBikes';
import { BikeDetailModal } from './components/BikeDetailModal';
import { TestRideForm } from './components/TestRideForm';
import { OffersSection } from './components/OffersSection';
import { ShowroomSection } from './components/ShowroomSection';
import { Footer } from './components/Footer';
import { bikesData } from './data/bikesData';
import { Bike } from './types';

export default function App() {
  const [selectedBikeForDetails, setSelectedBikeForDetails] = useState<Bike | null>(null);
  const [testRidePreselectedBikeId, setTestRidePreselectedBikeId] = useState<string | undefined>(undefined);

  // Smooth scroll handler helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTestRide = (bikeId?: string) => {
    if (bikeId) {
      setTestRidePreselectedBikeId(bikeId);
    }
    scrollToSection('test-ride');
  };

  const handleExploreBikes = () => {
    scrollToSection('bikes');
  };

  const handleClaimOffer = (offerCode: string) => {
    // Scroll to test ride and open
    scrollToSection('test-ride');
  };

  const handleSelectBikeForDetailsById = (bikeId: string) => {
    const found = bikesData.find(b => b.id === bikeId);
    if (found) {
      setSelectedBikeForDetails(found);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-[#FF6600] selection:text-black">
      {/* Sticky Navigation */}
      <Navbar onBookTestRideClick={() => handleBookTestRide()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreBikes}
          onBookTestRideClick={() => handleBookTestRide()}
        />

        {/* Featured Bikes Section (KTM 125, 200, 250, 390 Duke) */}
        <FeaturedBikes
          onSelectBikeForDetails={(bike) => setSelectedBikeForDetails(bike)}
          onBookTestRide={(bikeId) => handleBookTestRide(bikeId)}
        />

        {/* Exclusive Showroom Offers Section */}
        <OffersSection onClaimOffer={handleClaimOffer} />

        {/* Test Ride Enquiry & Booking Form */}
        <TestRideForm preselectedBikeId={testRidePreselectedBikeId} />

        {/* Showrooms & Concierge Contact Section */}
        <ShowroomSection />
      </main>

      {/* Professional Footer */}
      <Footer onSelectBikeForDetailsById={handleSelectBikeForDetailsById} />

      {/* Interactive Detail Modal */}
      <BikeDetailModal
        bike={selectedBikeForDetails}
        onClose={() => setSelectedBikeForDetails(null)}
        onBookTestRide={(bikeId) => handleBookTestRide(bikeId)}
      />
    </div>
  );
}
