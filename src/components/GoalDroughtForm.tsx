'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, ChevronDown, Check, Medal } from 'lucide-react';
import { TOP_SCORERS, Player } from '@/data/worldCupData';

// Helper to extract player initials in Hebrew/English
const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

interface AvatarProps {
  player: Player;
  size?: 'sm' | 'md' | 'lg';
}

function PlayerAvatar({ player, size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [flagError, setFlagError] = useState(false);
  const initials = getInitials(player.name);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-24 h-24 text-3xl'
  };

  const flagSizeClasses = {
    sm: '-bottom-0.5 -left-0.5',
    md: '-bottom-1 -left-1',
    lg: '-bottom-1 -left-1'
  };

  const flagEmojiSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const decodedUrl = player.imageUrl ? decodeURIComponent(player.imageUrl) : '';
  const proxyUrl = decodedUrl 
    ? `https://images.weserv.nl/?url=${encodeURIComponent(decodedUrl)}&w=150&h=150&fit=cover&a=top`
    : '';

  return (
    <div className={`relative rounded-full flex-shrink-0 ${sizeClasses[size]} overflow-visible`}>
      <div className="w-full h-full rounded-full overflow-hidden border border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-inner">
        {!imgError && proxyUrl ? (
          <img
            src={proxyUrl}
            alt={player.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center font-bold text-white tracking-wide shadow-md">
            {initials}
          </div>
        )}
      </div>
      
      <div className={`absolute ${flagSizeClasses[size]}`}>
        {!flagError ? (
          <img
            src={`https://flagcdn.com/w40/${player.iso}.png`}
            alt={player.team}
            className="w-6 h-4 object-cover rounded shadow-md border border-zinc-950"
            onError={() => setFlagError(true)}
          />
        ) : (
          <span className={`${flagEmojiSizeClasses[size]} select-none filter drop-shadow-md`}>
            {player.flag}
          </span>
        )}
      </div>
    </div>
  );
}

interface GoalDroughtFormProps {
  topScorer: string;
  setTopScorer: (t: string) => void;
  topScorerSub: boolean;
  setTopScorerSub: (s: boolean) => void;
  saveToCloud: (data: any) => void;
}

export default function GoalDroughtForm({ topScorer, setTopScorer, topScorerSub, setTopScorerSub, saveToCloud }: GoalDroughtFormProps) {
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
    if (topScorer) {
      setTopScorerSub(true);
      localStorage.setItem('nichusim_top_scorer', topScorer);
      localStorage.setItem('nichusim_top_scorer_submitted', 'true');
      saveToCloud({ topScorer, topScorerSub: true });
    }
  };

  const player = TOP_SCORERS.find(p => p.id === topScorer);

  const filteredPlayers = TOP_SCORERS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.team.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (topScorerSub && player) {
    return (
      <div className="w-full max-w-md p-2 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-1.5 bg-zinc-900 border border-amber-500/30 rounded-full shadow-lg shadow-amber-500/20"
        >
          <PlayerAvatar player={player} size="md" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">👟 נעל הזהב ננעלה!</h2>
        <div className="flex flex-col items-center space-y-4 bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-3xl p-6 w-full shadow-xl">
          <span className="text-xl font-bold text-slate-200">{player.name}</span>
          
          <div className="inline-flex items-center gap-1 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 shadow-sm mt-0.5 select-none animate-pulse">
            <span className="text-amber-400 text-xs font-black">שווה 10 נקודות במקרה של זכייה ⭐️</span>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            הניחוש שלך ש-**{player.name}** מנבחרת **{player.team}** יזכה בתואר מלך השערים של מונדיאל 2026 נשמר וננעל בהצלחה! 👑⚽
          </p>

          <button
            type="button"
            onClick={() => {
              setTopScorerSub(false);
              localStorage.removeItem('nichusim_top_scorer_submitted');
              saveToCloud({ topScorerSub: false });
            }}
            className="w-full mt-2 py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:bg-amber-500/10 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 font-bold rounded-xl text-xs transition-colors"
          >
            ערוך מלך שערים 🔓
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
            <Medal className="w-7 h-7 text-amber-500 animate-float" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            ⚽ מלך השערים (נעל הזהב)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            בחרו את השחקן שיסיים ככובש המצטיין של הטורניר ויזכה בנעל הזהב!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 relative" ref={dropdownRef}>
            <label className="text-slate-300 font-medium px-2 text-sm sm:text-base">מלך השערים:</label>
            
            {/* Custom Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-zinc-950 border border-zinc-700 text-slate-100 rounded-xl p-4 pl-12 pr-4 flex items-center justify-between text-right outline-none focus:ring-2 focus:ring-amber-500 transition-all text-lg font-medium"
              >
                {player ? (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <PlayerAvatar player={player} size="sm" />
                    <div className="flex flex-col text-right">
                      <span className="font-bold text-slate-200">{player.name}</span>
                      <span className="text-xs text-zinc-500">{player.team}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-zinc-500">בחר שחקן...</span>
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
                    className="absolute right-0 left-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-80"
                  >
                    {/* Search Field */}
                    <div className="p-2 border-b border-zinc-800 flex items-center space-x-2 space-x-reverse bg-zinc-950">
                      <Search className="w-4 h-4 text-zinc-500 mr-2" />
                      <input
                        type="text"
                        placeholder="חפש שחקן או נבחרת..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-200 placeholder-zinc-500 text-sm outline-none py-1.5 px-2"
                        dir="rtl"
                      />
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto flex-1 divide-y divide-zinc-800/40">
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((pOption) => {
                          const isSelected = pOption.id === topScorer;
                          return (
                            <button
                              key={pOption.id}
                              type="button"
                              onClick={() => {
                                setTopScorer(pOption.id);
                                setIsOpen(false);
                                setSearchQuery('');
                                localStorage.setItem('nichusim_top_scorer', pOption.id);
                                saveToCloud({ topScorer: pOption.id });
                              }}
                              className={`w-full text-right p-3 hover:bg-zinc-800/50 flex items-center justify-between text-slate-200 transition-colors ${isSelected ? 'bg-amber-500/10 hover:bg-amber-500/20' : ''}`}
                            >
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <PlayerAvatar player={pOption} size="sm" />
                                <div className="flex flex-col text-right">
                                  <span className={`text-base font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                                    {pOption.name}
                                  </span>
                                  <span className="text-xs text-zinc-400">
                                    {pOption.team}
                                  </span>
                                </div>
                              </div>
                              {isSelected && <Check className="w-5 h-5 text-amber-500 ml-2" />}
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-zinc-500 text-sm">
                          לא נמצאו שחקנים תואמים
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Immersive Player Preview Card */}
            <AnimatePresence>
              {player && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3.5 shadow-inner">
                    <PlayerAvatar player={player} size="md" />
                    <div className="flex flex-col text-right min-w-0">
                      <span className="text-sm font-black text-slate-200 truncate">{player.name}</span>
                      <span className="text-[10px] text-zinc-400 mt-1 font-bold">חלוץ נבחרת {player.team} {player.flag}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!topScorer}
              className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-amber-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent gap-1.5">
                נעל מלך שערים 🔒
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
