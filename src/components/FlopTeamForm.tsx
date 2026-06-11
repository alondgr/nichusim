'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Trophy, Search, ChevronDown, Check } from 'lucide-react';
import { TEAMS } from '@/data/worldCupData';

const TeamFlag = ({ iso, flag, name, size = 'large' }: { iso: string, flag: string, name: string, size?: 'small' | 'large' }) => {
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
  }, [iso]);

  if (error) {
    return (
      <span className={`${size === 'small' ? 'text-lg' : 'text-3xl'} flex-shrink-0 select-none filter drop-shadow-md`} title={name}>
        {flag}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w80/${iso}.png`}
      alt={name}
      className={size === 'small' 
        ? "w-7 h-5 object-cover rounded shadow-sm border border-zinc-800 bg-zinc-900 flex-shrink-0"
        : "w-12 h-8 object-cover rounded shadow-md border border-zinc-800 bg-zinc-900 flex-shrink-0"
      }
      onError={() => setError(true)}
    />
  );
};

interface FlopTeamFormProps {
  winnerTeam: string;
  setWinnerTeam: (t: string) => void;
  winnerSub: boolean;
  setWinnerSub: (s: boolean) => void;
  saveToCloud: (data: any) => void;
}

export default function FlopTeamForm({ winnerTeam, setWinnerTeam, winnerSub, setWinnerSub, saveToCloud }: FlopTeamFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (winnerTeam) {
      setWinnerSub(true);
      localStorage.setItem('nichusim_winner_team', winnerTeam);
      localStorage.setItem('nichusim_winner_submitted', 'true');
      saveToCloud({ winnerTeam, winnerSub: true });
    }
  };

  const selectedTeamData = TEAMS.find(t => t.id === winnerTeam);

  const filteredTeams = TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.1, ease: 'easeIn' }
    }
  };

  if (!mounted) return null;

  if (winnerSub && selectedTeamData) {
    return (
      <div className="w-full max-w-md p-2 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-6 bg-amber-500/20 rounded-full border border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-500/25 animate-pulse"
        >
          <Trophy className="w-16 h-16 text-amber-500" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">🏆 האלופה ננעלה!</h2>
        <div className="flex flex-col items-center space-y-4 bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-3xl p-6 w-full shadow-xl">
          <div className="flex items-center space-x-3 space-x-reverse">
            <TeamFlag iso={selectedTeamData.iso} flag={selectedTeamData.flag} name={selectedTeamData.name} />
            <span className="text-2xl font-bold text-slate-200">{selectedTeamData.name}</span>
          </div>
          
          <div className="inline-flex items-center gap-1 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 shadow-sm mt-1 select-none animate-pulse">
            <span className="text-amber-400 text-xs font-black">שווה 10 נקודות במקרה של זכייה ⭐️</span>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            הניחוש שלך ש-**{selectedTeamData.name}** תניף את גביע העולם במונדיאל 2026 נשמר וננעל בהצלחה! 🥇👑
          </p>

          <button
            type="button"
            onClick={() => {
              setWinnerSub(false);
              localStorage.removeItem('nichusim_winner_submitted');
              saveToCloud({ winnerSub: false });
            }}
            className="w-full mt-2 py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:bg-amber-500/10 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 font-bold rounded-xl text-xs transition-colors"
          >
            ערוך ניחוש זוכה 🔓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-2 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-4 sm:p-8 rounded-3xl sm:rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-amber-900/10"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-2xl mb-2 border border-amber-500/20">
            <Trophy className="w-7 h-7 text-amber-500 animate-float" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            🏆 הנבחרת הזוכה במונדיאל
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            בחרו את הנבחרת שתניף את גביע העולם ותהיה אלופת מונדיאל 2026!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 relative" ref={dropdownRef}>
            <label className="text-slate-300 font-medium px-2 text-sm sm:text-base">נבחרת זוכה:</label>
            
            {/* Custom Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-zinc-950 border border-zinc-700 text-slate-100 rounded-xl p-4 pl-12 pr-4 flex items-center justify-between text-right outline-none focus:ring-2 focus:ring-amber-500 transition-all text-lg font-medium"
              >
                {selectedTeamData ? (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <TeamFlag iso={selectedTeamData.iso} flag={selectedTeamData.flag} name={selectedTeamData.name} size="small" />
                    <span>{selectedTeamData.name}</span>
                  </div>
                ) : (
                  <span className="text-zinc-500">בחר נבחרת...</span>
                )}
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 left-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-72"
                  >
                    {/* Search Field */}
                    <div className="p-2 border-b border-zinc-800 flex items-center space-x-2 space-x-reverse bg-zinc-950">
                      <Search className="w-4 h-4 text-zinc-500 mr-2" />
                      <input
                        type="text"
                        placeholder="חפש נבחרת..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-200 placeholder-zinc-500 text-sm outline-none py-1.5 px-2"
                        dir="rtl"
                      />
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto flex-1 divide-y divide-zinc-800/40">
                      {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => {
                          const isSelected = team.id === winnerTeam;
                          return (
                            <button
                              key={team.id}
                              type="button"
                              onClick={() => {
                                setWinnerTeam(team.id);
                                setIsOpen(false);
                                setSearchQuery('');
                                localStorage.setItem('nichusim_winner_team', team.id);
                                saveToCloud({ winnerTeam: team.id });
                              }}
                              className={`w-full text-right p-3.5 hover:bg-zinc-800/50 flex items-center justify-between text-slate-200 transition-colors ${isSelected ? 'bg-amber-500/10 hover:bg-amber-500/20' : ''}`}
                            >
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <TeamFlag iso={team.iso} flag={team.flag} name={team.name} size="small" />
                                <span className={`text-base ${isSelected ? 'font-bold text-amber-400' : ''}`}>{team.name}</span>
                              </div>
                              {isSelected && <Check className="w-5 h-5 text-amber-500 ml-2" />}
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-zinc-500 text-sm">
                          לא נמצאו נבחרות תואמות
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!winnerTeam}
              className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-amber-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent gap-1.5">
                נעל נבחרת זוכה 🔒
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
