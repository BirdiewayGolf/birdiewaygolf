// src/lib/stores/tournament-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tournament, TournamentType, TournamentPairing } from '@/lib/types/tournament';
import { tournaments as defaultTournaments } from '../data/tournaments';

interface TournamentState {
  version: number;
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, 'id' | 'pairings' | 'createdAt' | 'isVisible'>) => void;
  updateTournament: (id: string, updates: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  getTournamentsByType: (type: TournamentType) => Tournament[];
  getTournamentById: (id: string) => Tournament | undefined;
  addPairing: (tournamentId: string, pairing: Omit<TournamentPairing, 'id'>) => void;
  updatePairing: (tournamentId: string, pairingId: string, updates: Partial<TournamentPairing>) => void;
  deletePairing: (tournamentId: string, pairingId: string) => void;
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      version: 2,
      tournaments: defaultTournaments, // Initialize with default tournaments
      
      addTournament: (tournament) => {
        const newTournament: Tournament = {
          ...tournament,
          id: crypto.randomUUID(),
          pairings: [],
          leaderboard: [],
          participants: [],
          isVisible: true,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          tournaments: [...state.tournaments, newTournament],
        }));
      },
      
      updateTournament: (id, updates) => {
        // Don't allow updating default tournaments
        if (defaultTournaments.some(t => t.id === id)) {
          console.warn('Cannot modify default tournament');
          return;
        }

        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id 
              ? { 
                  ...t, 
                  ...updates,
                  isVisible: updates.isVisible ?? t.isVisible ?? true,
                  createdAt: t.createdAt || new Date().toISOString()
                } 
              : t
          ),
        }));
      },
      
      deleteTournament: (id) => {
        // Don't allow deleting default tournaments
        if (defaultTournaments.some(t => t.id === id)) {
          console.warn('Cannot delete default tournament');
          return;
        }

        set((state) => ({
          tournaments: state.tournaments.filter((t) => t.id !== id),
        }));
      },
      
      getTournamentsByType: (type) => {
        const tournaments = get().tournaments;
        // Always include default tournaments of the requested type
        const defaultOfType = defaultTournaments.filter(t => t.type === type);
        const stateOfType = tournaments.filter(t => 
          t.type === type && 
          (t.isVisible ?? true) &&
          !defaultTournaments.some(dt => dt.id === t.id)
        );
        
        return [...defaultOfType, ...stateOfType]
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      
      getTournamentById: (id) => {
        // Check default tournaments first
        const defaultTournament = defaultTournaments.find(t => t.id === id);
        if (defaultTournament) return defaultTournament;

        // Then check store tournaments
        return get().tournaments.find((t) => 
          t.id === id && (t.isVisible ?? true)
        );
      },
      
      addPairing: (tournamentId, pairing) => {
        if (defaultTournaments.some(t => t.id === tournamentId)) {
          console.warn('Cannot modify default tournament');
          return;
        }

        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: [...(t.pairings || []), { 
                    ...pairing, 
                    id: crypto.randomUUID() 
                  }],
                }
              : t
          ),
        }));
      },
      
      updatePairing: (tournamentId, pairingId, updates) => {
        if (defaultTournaments.some(t => t.id === tournamentId)) {
          console.warn('Cannot modify default tournament');
          return;
        }

        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: (t.pairings || []).map((p) =>
                    p.id === pairingId ? { ...p, ...updates } : p
                  ),
                }
              : t
          ),
        }));
      },
      
      deletePairing: (tournamentId, pairingId) => {
        if (defaultTournaments.some(t => t.id === tournamentId)) {
          console.warn('Cannot modify default tournament');
          return;
        }

        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: (t.pairings || []).filter((p) => p.id !== pairingId),
                }
              : t
          ),
        }));
      },
    }),
    {
      name: 'tournament-storage',
      version: 2,
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          tournaments: [...defaultTournaments, ...(persistedState.tournaments || [])],
        };
      },
    }
  )
);