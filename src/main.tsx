// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import { tournaments as defaultTournaments } from '@/lib/data/tournaments';

// Initialize the store with default tournaments
useTournamentStore.getState().tournaments = [...defaultTournaments];

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);