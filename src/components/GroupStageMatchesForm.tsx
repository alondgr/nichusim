'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Trophy, ShieldCheck, Sparkles, Trash2, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { TEAMS, Team } from '@/data/worldCupData';

// Realistic soccer score generator
const generateRealisticScore = (): number => {
  const rand = Math.random();
  if (rand < 0.28) return 1;  // ~28% chance of 1 goal
  if (rand < 0.52) return 0;  // ~24% chance of 0 goals
  if (rand < 0.77) return 2;  // ~25% chance of 2 goals
  if (rand < 0.91) return 3;  // ~14% chance of 3 goals
  if (rand < 0.97) return 4;  // ~6% chance of 4 goals
  return Math.floor(Math.random() * 2) + 5; // ~3% chance of 5+ goals
};

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const GROUP_HEBREW: Record<string, string> = {
  A: 'בית א\'', B: 'בית ב\'', C: 'בית ג\'', D: 'בית ד\'',
  E: 'בית ה\'', F: 'בית ו\'', G: 'בית ז\'', H: 'בית ח\'',
  I: 'בית ט\'', J: 'בית י\'', K: 'בית י"א', L: 'בית י"ב'
};

interface MatchPrediction {
  homeScore: number | '';
  awayScore: number | '';
}

type PredictionsState = Record<string, MatchPrediction>;

// Helper to generate the 6 standard round-robin matches for a group of 4 teams
const getGroupMatches = (group: string, teams: Team[]) => {
  const groupTeams = teams.filter(t => t.group === group);
  if (groupTeams.length < 4) return [];

  // Standard round robin matchups
  return [
    { id: `${group}-1`, home: groupTeams[0], away: groupTeams[1] },
    { id: `${group}-2`, home: groupTeams[2], away: groupTeams[3] },
    { id: `${group}-3`, home: groupTeams[0], away: groupTeams[3] },
    { id: `${group}-4`, home: groupTeams[1], away: groupTeams[2] },
    { id: `${group}-5`, home: groupTeams[0], away: groupTeams[2] },
    { id: `${group}-6`, home: groupTeams[1], away: groupTeams[3] },
  ];
};

export default function GroupStageMatchesForm() {
  const [activeGroup, setActiveGroup] = useState<string>('A');
  const [predictions, setPredictions] = useState<PredictionsState>({});
  const [submitted, setSubmitted] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load predictions from LocalStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('nichusim_group_stage_predictions');
    if (saved) {
      try {
        setPredictions(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading predictions', e);
      }
    }
    const wasSubmitted = localStorage.getItem('nichusim_group_stage_submitted');
    if (wasSubmitted === 'true') {
      setSubmitted(true);
    }
  }, []);

  // Save to LocalStorage on changes
  const savePredictions = (newPreds: PredictionsState) => {
    setPredictions(newPreds);
    localStorage.setItem('nichusim_group_stage_predictions', JSON.stringify(newPreds));
  };

  const handleScoreChange = (matchId: string, side: 'home' | 'away', val: string) => {
    const numVal = val === '' ? '' : Math.min(20, Math.max(0, Number(val)));
    const current = predictions[matchId] || { homeScore: '', awayScore: '' };
    
    const updated = {
      ...predictions,
      [matchId]: {
        ...current,
        [side === 'home' ? 'homeScore' : 'awayScore']: numVal
      }
    };
    savePredictions(updated);
  };

  // Populate ALL 72 matches with realistic soccer scores
  const handleAutoFillAll = () => {
    const updated: PredictionsState = {};
    
    GROUPS.forEach(g => {
      const matches = getGroupMatches(g, TEAMS);
      matches.forEach(m => {
        updated[m.id] = {
          homeScore: generateRealisticScore(),
          awayScore: generateRealisticScore()
        };
      });
    });

    savePredictions(updated);
  };

  // Clear all predictions
  const handleClearAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל הניחושים?')) {
      savePredictions({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCompleted === 72) {
      setSubmitted(true);
      localStorage.setItem('nichusim_group_stage_submitted', 'true');
    }
  };

  // Calculate completed matches per group
  const getGroupCompletedCount = (g: string) => {
    const matches = getGroupMatches(g, TEAMS);
    return matches.filter(m => {
      const p = predictions[m.id];
      return p && p.homeScore !== '' && p.awayScore !== '';
    }).length;
  };

  // Calculate total completed matches
  const totalCompleted = GROUPS.reduce((acc, g) => acc + getGroupCompletedCount(g), 0);

  // Filter current group matches
  const currentGroupMatches = getGroupMatches(activeGroup, TEAMS);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (!mounted) return null; // Avoid hydration mismatch

  if (submitted) {
    return (
      <div className="w-full max-w-lg p-2 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-5 sm:p-6 bg-indigo-500/20 rounded-full border border-indigo-500/50 flex items-center justify-center shadow-lg shadow-indigo-500/25"
        >
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">שלב הבתים ננעל! 🔒</h2>
        <div className="flex flex-col items-center space-y-4 bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full shadow-xl">
          <div className="inline-flex items-center justify-center p-2.5 bg-indigo-600/10 rounded-xl">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-500" />
          </div>
          <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
            כל 72 המשחקים של שלב הבתים של מונדיאל 2026 נוחשו וננעלו במערכת! 
          </p>
          <p className="text-zinc-500 text-xs sm:text-sm">
            ניתן להמשיך להציץ בניחושים שלך ישירות מתוך זיכרון הדפדפן.
          </p>
          
          <button
            type="button"
            onClick={() => {
              if (window.confirm('האם לפתוח מחדש את הנעילה כדי לערוך את הניחושים?')) {
                setSubmitted(false);
                localStorage.removeItem('nichusim_group_stage_submitted');
              }
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs sm:text-sm underline transition-colors pt-2"
          >
            פתח מחדש לעריכה 🔓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl p-2 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-4 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-zinc-950/80 backdrop-blur-xl border border-indigo-600/30 shadow-2xl shadow-indigo-900/20"
      >
        {/* Header */}
        <div className="text-center space-y-1 sm:space-y-2 mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-indigo-600/10 rounded-xl sm:rounded-2xl mb-1">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            ניחוש שלב הבתים
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-400">
            נחש את התוצאות המדויקות לכל 72 המשחקים ב-12 הבתים
          </p>
        </div>

        {/* Collapsible FIFA Draw Diagram */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowDiagram(!showDiagram)}
            className={`w-full py-2.5 px-3.5 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold border transition-all ${
              showDiagram 
                ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300' 
                : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${showDiagram ? 'text-indigo-400' : 'text-zinc-500'}`} />
              <span>🗺️ תרשים הבתים הרשמי של מונדיאל 2026</span>
            </div>
            <span className="text-zinc-500 text-[10px] sm:text-xs font-bold">{showDiagram ? 'הסתר ▲' : 'הצג תרשים ▼'}</span>
          </button>
          
          <AnimatePresence>
            {showDiagram && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl sm:rounded-2xl p-2 flex flex-col items-center">
                  <img 
                    src="/images/world-cup-groups.jpg" 
                    alt="תרשים הבתים הרשמי של פיפ''א 2026"
                    className="w-full rounded-lg sm:rounded-xl border border-zinc-800 shadow-md object-contain hover:scale-[1.01] transition-transform duration-300 cursor-zoom-in"
                    onClick={() => {
                      window.open('/images/world-cup-groups.jpg', '_blank');
                    }}
                  />
                  <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-2 text-center font-bold">
                    💡 לחץ על התרשים לפתיחה ברזולוציה מלאה בחלון חדש
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar & Actions */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3.5 sm:p-4 mb-5 sm:mb-6 space-y-3.5 sm:space-y-4">
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
            <span className="text-slate-300">התקדמות הניחוש הכללית:</span>
            <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-indigo-500/20">{totalCompleted} / 72 משחקים</span>
          </div>
          
          <div className="w-full bg-zinc-950 rounded-full h-2.5 sm:h-3 overflow-hidden border border-zinc-800">
            <motion.div 
              className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(totalCompleted / 72) * 100}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>

          <div className="flex gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={handleAutoFillAll}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300 font-bold rounded-xl text-[11px] sm:text-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              🔮 מילוי אקראי מהיר
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-950 border border-zinc-800 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-medium rounded-xl text-[11px] sm:text-sm transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              נקה
            </button>
          </div>
        </div>

        {/* Group Tabs Selector */}
        <div className="mb-5 sm:mb-6">
          <div className="flex overflow-x-auto gap-1.5 py-1 pr-0.5 pl-0.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent select-none" dir="rtl">
            {GROUPS.map((g) => {
              const isActive = g === activeGroup;
              const count = getGroupCompletedCount(g);
              const isGroupDone = count === 6;

              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveGroup(g)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold border transition-all ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      : isGroupDone
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/30'
                      : 'bg-zinc-900 border-zinc-800 text-slate-400 hover:bg-zinc-800'
                  }`}
                >
                  <span>{GROUP_HEBREW[g]}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isGroupDone 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-zinc-950 text-zinc-500'
                  }`}>
                    {count}/6
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Matches Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-0.5 pl-0.5 scrollbar-thin scrollbar-thumb-zinc-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {currentGroupMatches.map((m) => {
                  const p = predictions[m.id] || { homeScore: '', awayScore: '' };
                  return (
                    <div 
                      key={m.id}
                      className="flex items-center justify-between gap-1 w-full bg-zinc-900/40 border border-zinc-800/80 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover:border-zinc-700/60 transition-colors"
                    >
                      {/* Home Team */}
                      <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-start">
                        <img
                          src={`https://flagcdn.com/w40/${m.home.iso}.png`}
                          alt={m.home.name}
                          className="w-5.5 sm:w-7 h-3.5 sm:h-5 object-cover rounded-sm shadow-sm border border-zinc-800 bg-zinc-950 flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">{m.home.name}</span>
                      </div>

                      {/* Scores inputs */}
                      <div className="flex items-center justify-center gap-1 flex-shrink-0 mx-1 sm:mx-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          required
                          placeholder="-"
                          value={p.homeScore}
                          onChange={(e) => handleScoreChange(m.id, 'home', e.target.value)}
                          className="w-8.5 sm:w-12 h-8.5 sm:h-12 text-center text-sm sm:text-lg font-black bg-zinc-950 border border-zinc-800 rounded-lg sm:rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          dir="ltr"
                        />
                        <span className="text-zinc-600 font-extrabold text-xs sm:text-base">-</span>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          required
                          placeholder="-"
                          value={p.awayScore}
                          onChange={(e) => handleScoreChange(m.id, 'away', e.target.value)}
                          className="w-8.5 sm:w-12 h-8.5 sm:h-12 text-center text-sm sm:text-lg font-black bg-zinc-950 border border-zinc-800 rounded-lg sm:rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          dir="ltr"
                        />
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end text-left">
                        <span className="text-xs sm:text-sm font-bold text-slate-200 truncate order-2 sm:order-1">{m.away.name}</span>
                        <img
                          src={`https://flagcdn.com/w40/${m.away.iso}.png`}
                          alt={m.away.name}
                          className="w-5.5 sm:w-7 h-3.5 sm:h-5 object-cover rounded-sm shadow-sm border border-zinc-800 bg-zinc-950 flex-shrink-0 order-1 sm:order-2 ml-1.5 sm:ml-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Locked Submit Button */}
          <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
            {/* Quick Navigation Helper */}
            <div className="flex justify-between items-center sm:w-1/3 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-400 select-none">
              <button
                type="button"
                onClick={() => {
                  const idx = GROUPS.indexOf(activeGroup);
                  if (idx > 0) setActiveGroup(GROUPS[idx - 1]);
                }}
                disabled={activeGroup === 'A'}
                className="hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-300">נווט בתים</span>
              <button
                type="button"
                onClick={() => {
                  const idx = GROUPS.indexOf(activeGroup);
                  if (idx < GROUPS.length - 1) setActiveGroup(GROUPS[idx + 1]);
                }}
                disabled={activeGroup === 'L'}
                className="hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={totalCompleted < 72}
              className="flex-1 relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-indigo-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3 sm:py-3.5 text-base sm:text-lg font-bold text-white bg-transparent gap-2">
                <CheckCircle2 className="w-5 h-5" />
                נעל ניחוש בתים 🔒
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
