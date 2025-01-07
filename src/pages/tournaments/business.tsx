// src/pages/tournaments/business.tsx
import React from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TournamentList } from '@/components/tournaments/tournament-list';
import swingImage from '@/assets/swing.jpg';

export function BusinessTournaments() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[600px] xs:h-[650px] sm:h-[600px] md:h-[550px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${swingImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-6">
                <Trophy className="h-8 w-8 md:h-12 md:w-12 text-[#C5A572]" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Business League Tournament Series
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Play in our 4-tournament series while growing your network and building valuable business relationships.
                Any four players can represent a team or company at each tournament. Each event features lunch, premium golf
                gear, and great prizes, with teams competing for your company's chance at the season championship.
              </p>
              <Link
                to="/register/business"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-2 border-[#C5A572] 
                text-white font-semibold rounded-lg hover:bg-[#C5A572] transition-colors text-lg"
              >
                Register for Tournament Series - $3,400
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
              2025 Tournament Schedule
            </h2>
            <div className="w-20 h-1 bg-[#C5A572] mt-4"></div>
          </div>
          <TournamentList leagueType="business" />
        </div>
      </div>
    </div>
  );
}