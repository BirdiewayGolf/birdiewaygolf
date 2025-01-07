// src/pages/tournaments/longday.tsx
import React from 'react';
import { Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TournamentList } from '@/components/tournaments/tournament-list';
import golfImage from '@/assets/golf.jpg';

export function LongDayTournaments() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[600px] xs:h-[650px] sm:h-[600px] md:h-[550px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${golfImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-6">
                <Sun className="h-8 w-8 md:h-12 md:w-12 text-[#C5A572]" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Long Day Tournament
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Challenge yourself in our 36-hole marathon event, where your 4-person team will compete 
                from dawn to dusk in an unforgettable day of golf. Your registration includes breakfast,
                lunch, dinner, prizes and merch. The top 12 teams advance to sudden-death match play 
                for the championship title.
              </p>
              <Link
                to="/register/longday"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-2 border-[#C5A572] 
                text-white font-semibold rounded-lg hover:bg-[#C5A572] transition-colors text-lg"
              >
                Register Your Team - $1,500
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament List Section */}
      <div className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Tournament Details
            </h2>
            <div className="w-20 h-1 bg-[#C5A572] mt-4"></div>
          </div>
          <TournamentList leagueType="longday" />
        </div>
      </div>
    </div>
  );
}