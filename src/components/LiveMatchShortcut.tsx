'use client';

import { useState } from 'react';
import { Match } from '@/data/worldCupData';
import { Play, Tv } from 'lucide-react';

interface LiveMatchShortcutProps {
  sport: 'football' | 'tennis' | 'ucl';
  matches: Match[];
}

export default function LiveMatchShortcut({ sport, matches }: LiveMatchShortcutProps) {
  const [scrollCycleIdx, setScrollCycleIdx] = useState(0);
  const liveMatches = matches.filter((m) => m.status === 'live');

  if (liveMatches.length === 0) return null;

  const handleJump = () => {
    // Cycle through all active live matches on click
    const targetMatch = liveMatches[scrollCycleIdx % liveMatches.length];
    const element = document.getElementById(`match-${targetMatch.id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      element.classList.add('animate-flash-highlight');
      setTimeout(() => {
        element.classList.remove('animate-flash-highlight');
      }, 3000);

      // Increment index for next snap click
      setScrollCycleIdx((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* Desktop & Tablet sticky banner, positioned right below switcher header */}
      <div className="hidden md:flex sticky top-[69px] z-50 w-full bg-red-950/75 border-b border-red-500/20 backdrop-blur-md px-4 py-2.5 items-center justify-between transition-all select-none">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-red-400 flex-shrink-0">
            {liveMatches.length === 1 ? 'LIVE NOW' : `${liveMatches.length} LIVE GAMES`}
          </span>
          
          <div className="flex gap-4 items-center text-xs font-black text-slate-200 tracking-wide truncate flex-wrap">
            {liveMatches.map((m, idx) => (
              <div key={m.id} className="flex items-center gap-2">
                {idx > 0 && <span className="text-red-500/40">|</span>}
                <span 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById(`match-${m.id}`);
                    if (el) {
                      const yOffset = -100;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                      el.classList.add('animate-flash-highlight');
                      setTimeout(() => el.classList.remove('animate-flash-highlight'), 3000);
                    }
                  }}
                >
                  {m.home.name} {m.actualHomeScore ?? 0} - {m.actualAwayScore ?? 0} {m.away.name}
                </span>
                <span className="text-[9px] text-red-400 bg-red-500/5 px-1 py-0.5 rounded border border-red-500/5 font-sans">
                  ⏱️ {m.timeStr}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleJump}
          className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 select-none flex-shrink-0 ml-4"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{liveMatches.length === 1 ? 'Jump to Match' : 'Cycle Live Games'}</span>
        </button>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <button
        onClick={handleJump}
        className="md:hidden fixed bottom-6 right-6 z-[99] flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg shadow-red-950/50 border border-red-400/20 transition-transform active:scale-90"
        title={liveMatches.length === 1 ? 'Jump to Live Match' : 'Cycle Live Matches'}
      >
        <span className="absolute top-0 right-0 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border border-zinc-950 items-center justify-center text-[9px] font-black text-white">
            {liveMatches.length}
          </span>
        </span>
        <Tv className="w-6 h-6 animate-pulse" />
      </button>
    </>
  );
}
