import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ReviewsView } from './components/ReviewsView';
import { LensCompatibilityView } from './components/LensCompatibilityView';
import { TutorialsView } from './components/TutorialsView';
import { PriceTrackerView } from './components/PriceTrackerView';
import { CommunityView } from './components/CommunityView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'lenses' | 'tutorials' | 'tracker' | 'community'>('reviews');
  const [listingModalOpen, setListingModalOpen] = useState<boolean>(false);

  const handleOpenListingModal = () => {
    setActiveTab('community');
    setListingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Strict 3-zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenListingModal={handleOpenListingModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section shown on Reviews tab as primary entry */}
        {activeTab === 'reviews' && (
          <HeroSection
            onExploreReviews={() => {
              window.scrollTo({ top: 480, behavior: 'smooth' });
            }}
            onExploreLenses={() => setActiveTab('lenses')}
            onExploreTracker={() => setActiveTab('tracker')}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {activeTab === 'reviews' && (
            <ReviewsView
              onSelectTrackerModel={() => setActiveTab('tracker')}
            />
          )}

          {activeTab === 'lenses' && (
            <LensCompatibilityView />
          )}

          {activeTab === 'tutorials' && (
            <TutorialsView />
          )}

          {activeTab === 'tracker' && (
            <PriceTrackerView />
          )}

          {activeTab === 'community' && (
            <CommunityView
              listingModalOpen={listingModalOpen}
              onCloseListingModal={() => setListingModalOpen(false)}
            />
          )}
        </div>
      </main>

      {/* Clean quiet Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
