// src/components/tournaments/tournament-list.tsx
import React from 'react';
import { TournamentCard } from './tournament-card';
import type { TournamentType } from '@/lib/types/tournament';
import { useTournamentStore } from '@/lib/stores/tournament-store';

interface TournamentListProps {
  leagueType: TournamentType;
}

export function TournamentList({ leagueType }: TournamentListProps) {
  const getTournamentsByType = useTournamentStore(state => state.getTournamentsByType);
  const tournaments = getTournamentsByType(leagueType);
  
  // Debug logs
  console.log('TournamentList - League Type:', leagueType);
  console.log('TournamentList - Tournaments:', tournaments);

  if (!tournaments || tournaments.length === 0) {
    console.log('No tournaments found for type:', leagueType);
    return (
      <div className="text-center py-12 text-gray-500">
        No tournaments found for this league type.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tournaments.map((tournament) => {
          console.log('Rendering tournament:', tournament);
          return <TournamentCard key={tournament.id} tournament={tournament} />;
        })}
      </div>
    </div>
  );
}