'use client';

import { Match } from '@/data/worldCupData';
import { Play, Radio, Tv } from 'lucide-react';

interface LiveMatchShortcutProps {
  sport: 'football' | 'tennis' | 'ucl';
  matches: Match[];
}

export default function LiveMatchShortcut({ sport, matches }: LiveMatchShortcutProps) {
  const liveMatch = matches.find((m) => m.status === 'live');

  if (!liveMatch) return null;

  const homeName = liveMatch.home.name;
  const awayName = liveMatch.away.name;
  const homeScore = liveMatch.actualHomeScore ?? 0;
  const awayScore = liveMatch.actualAwayScore ?? 0;
  const matchInfo = `${homeName} ${homeScore} - ${awayScore} ${awayName}`;

  const handleJump = () => {
    // Search both forms or general elements
    const element = document.getElementById(`match-${liveMatch.id}`);
    if (element) {
      // Offset scroll so it doesn't get covered by sticky headers
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Add border highlight animation
      element.classList.add('animate-flash-highlight');
      setTimeout(() => {
        element.classList.remove('animate-flash-highlight');
      }, 3000);
    }
  };

  return (
    <>
      {/* Desktop & Tablet sticky banner, positioned right below switcher header */}
      <div className="hidden md:flex sticky top-[69px] z-50 w-full bg-red-950/70 border-b border-red-500/20 backdrop-blur-md px-4 py-2.5 items-center justify-between transition-all select-none">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-[11px] font-black uppercase bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md text-red-400">
            LIVE NOW
          </span>
          <span className="text-xs font-black text-slate-200 font-sans tracking-wide">
            {matchInfo}
          </span>
          {liveMatch.timeStr && (
            <span className="text-[10px] text-red-400/70 font-semibold bg-red-500/5 px-1.5 py-0.5 rounded border border-red-500/5">
              ⏱️ {liveMatch.timeStr}
            </span>
          )}
        </div>
        <button
          onClick={handleJump}
          className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 select-none"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Jump to Match</span>
        </button>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <button
        onClick={handleJump}
        className="md:hidden fixed bottom-6 right-6 z-[99] flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg shadow-red-950/50 border border-red-400/20 transition-transform active:scale-90"
        title={`Live match: ${matchInfo}`}
      >
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-zinc-950"></span>
        </span>
        <Tv className="w-6 h-6 animate-pulse" />
      </button>
    </>
  );
}
