'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, ChevronDown, Check, UserMinus } from 'lucide-react';
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
  const initials = getInitials(player.name);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-24 h-24 text-3xl'
  };

  const flagSizeClasses = {
    sm: 'w-4.5 h-3.5 -bottom-0.5 -left-0.5',
    md: 'w-6 h-4.5 -bottom-1 -left-1',
    lg: 'w-9 h-6.5 -bottom-1 -left-1'
  };

  return (
    <div className={`relative rounded-full flex-shrink-0 ${sizeClasses[size]} overflow-visible`}>
      <div className="w-full h-full rounded-full overflow-hidden border border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-inner">
        {!imgError && player.imageUrl ? (
          <img
            src={player.imageUrl}
            alt={player.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-yellow-500 flex items-center justify-center font-bold text-white tracking-wide shadow-md">
            {initials}
          </div>
        )}
      </div>
      <img
        src={`https://flagcdn.com/w40/${player.iso}.png`}
        alt={player.team}
        className={`absolute rounded-md shadow-md border border-zinc-950 object-cover ${flagSizeClasses[size]}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

export default function GoalDroughtForm() {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (selectedPlayer) {
      setSubmitted(true);
    }
  };

  const player = TOP_SCORERS.find(p => p.id === selectedPlayer);

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

  if (submitted && player) {
    return (
      <div className="w-full max-w-md p-4 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-1.5 bg-zinc-900 border border-orange-500/30 rounded-full shadow-2xl shadow-orange-500/20"
        >
          <PlayerAvatar player={player} size="lg" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">הנאחס ננעל!</h2>
        <div className="flex flex-col items-center space-y-3 bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-3xl p-6 w-full shadow-xl">
          <div className="inline-flex items-center justify-center p-2.5 bg-orange-600/10 rounded-xl mb-1">
            <span className="text-2xl">🌵</span>
          </div>
          <span className="text-2xl font-bold text-slate-200">{player.name}</span>
          <p className="text-slate-400 text-base leading-relaxed">
            ההימור שלך שחלוץ נבחרת {player.team} ישכח איך לכבוש ויסיים בבצורת שערים מוחלטת נרשם במערכת! 🎯
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-6 sm:p-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-orange-600/30 shadow-2xl shadow-orange-900/20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-orange-600/10 rounded-2xl mb-2">
            <span className="text-3xl">👟</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            נאחס הבצורת
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            סמן את החלוץ שלא יראה שער אחד כל הטורניר
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 relative" ref={dropdownRef}>
            <label className="text-slate-300 font-medium px-2 text-sm sm:text-base">שחקן:</label>
            
            {/* Custom Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-zinc-950 border border-zinc-700 text-slate-100 rounded-xl p-4 pl-12 pr-4 flex items-center justify-between text-right outline-none focus:ring-2 focus:ring-orange-500 transition-all text-lg font-medium"
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
                          const isSelected = pOption.id === selectedPlayer;
                          return (
                            <button
                              key={pOption.id}
                              type="button"
                              onClick={() => {
                                setSelectedPlayer(pOption.id);
                                setIsOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-right p-3 hover:bg-zinc-800/50 flex items-center justify-between text-slate-200 transition-colors ${isSelected ? 'bg-orange-500/10 hover:bg-orange-500/20' : ''}`}
                            >
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <PlayerAvatar player={pOption} size="sm" />
                                <div className="flex flex-col text-right">
                                  <span className={`text-base font-semibold ${isSelected ? 'text-orange-400' : 'text-slate-200'}`}>
                                    {pOption.name}
                                  </span>
                                  <span className="text-xs text-zinc-400">
                                    {pOption.team}
                                  </span>
                                </div>
                              </div>
                              {isSelected && <Check className="w-5 h-5 text-orange-500 ml-2" />}
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
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!selectedPlayer}
              className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-orange-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent">
                נעל נאחס 🎯
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
