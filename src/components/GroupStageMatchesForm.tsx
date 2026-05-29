'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Trophy, ShieldCheck, Sparkles, Trash2, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon, X } from 'lucide-react';
import { Match, PredictionsState, generateTennisScore, calculateMatchPoints, getMatchStatus } from '@/data/worldCupData';

const GROUP_HEBREW: Record<string, string> = {
  A: 'בית א\'', B: 'בית ב\'', C: 'בית ג\'', D: 'בית ד\'',
  E: 'בית ה\'', F: 'בית ו\'', G: 'בית ז\'', H: 'בית ח\'',
  I: 'בית ט\'', J: 'בית י\'', K: 'בית י"א', L: 'בית י"ב'
};

const TeamFlag = ({ iso, flag, name, logo, size = 'large' }: { iso: string, flag: string, name: string, logo?: string, size?: 'small' | 'large' }) => {
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
  }, [iso, logo]);

  if (logo && !error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800 flex-shrink-0 shadow-md ${
        size === 'small' ? 'w-8 h-8 p-1' : 'w-12 h-12 sm:w-14 sm:h-14 p-2'
      }`}>
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  if (error && logo) {
    const firstLetter = name ? name.charAt(0).toUpperCase() : '';
    return (
      <div className={`flex items-center justify-center bg-zinc-800 rounded-full border border-zinc-700 flex-shrink-0 font-black text-slate-200 shadow-inner select-none ${
        size === 'small' ? 'w-8 h-8 text-[10px]' : 'w-12 h-12 sm:w-14 sm:h-14 text-lg'
      }`} title={name}>
        {firstLetter || '?'}
      </div>
    );
  }

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
        ? "w-5 h-3.5 object-cover rounded-sm shadow-sm border border-zinc-800 bg-zinc-950 flex-shrink-0"
        : "w-14 h-9.5 object-cover rounded shadow-md border border-zinc-800 bg-zinc-900 flex-shrink-0"
      }
      onError={() => setError(true)}
    />
  );
};

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

interface GroupStageMatchesFormProps {
  sport?: 'football' | 'tennis' | 'ucl';
  matches: Match[];
  predictions: PredictionsState;
  savePredictions: (preds: PredictionsState) => void;
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
}

export default function GroupStageMatchesForm({ sport = 'football', matches, predictions, savePredictions, submitted, setSubmitted }: GroupStageMatchesFormProps) {
  const [showDiagram, setShowDiagram] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [now, setNow] = useState(Date.now());

  const groups = useMemo(() => {
    if (sport === 'football') {
      return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    } else {
      return Array.from(new Set(matches.map(m => m.stage || 'all')));
    }
  }, [sport, matches]);

  const [activeGroup, setActiveGroup] = useState<string>(groups[0] || 'A');

  // Set mounted on mount
  useEffect(() => {
    setMounted(true);
    setNow(Date.now()); // Sync immediately on client mount
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (groups.length > 0 && !groups.includes(activeGroup)) {
      setActiveGroup(groups[0]);
    }
  }, [groups, activeGroup]);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleScoreChange = (matchId: string, side: 'home' | 'away', val: string) => {
    const numVal = val === '' ? '' : Math.min(10, Math.max(0, Number(val)));
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

  const handlePropChange = (matchId: string, option: string) => {
    const current = predictions[matchId] || { homeScore: '', awayScore: '' };
    const updated = {
      ...predictions,
      [matchId]: {
        ...current,
        selectedProp: option
      }
    };
    savePredictions(updated);
  };

  const handleMultiPropChange = (matchId: string, propId: string, option: string) => {
    const current = predictions[matchId] || { homeScore: '', awayScore: '' };
    const currentProps = current.propBets || {};
    const updated = {
      ...predictions,
      [matchId]: {
        ...current,
        propBets: {
          ...currentProps,
          [propId]: option
        }
      }
    };
    savePredictions(updated);
  };

  const handleAutoFillAll = () => {
    const updated: PredictionsState = {};
    matches.forEach(m => {
      if (sport === 'football') {
        updated[m.id] = {
          homeScore: generateRealisticScore(),
          awayScore: generateRealisticScore()
        };
      } else {
        const scores = generateTennisScore(m.bestOf || 3);
        updated[m.id] = {
          homeScore: scores.home,
          awayScore: scores.away
        };
      }
    });
    savePredictions(updated);
  };

  const handleClearAll = () => {
    if (!isConfirmingClear) {
      setIsConfirmingClear(true);
      setTimeout(() => setIsConfirmingClear(false), 4000);
      return;
    }
    savePredictions({});
    setIsConfirmingClear(false);
  };

  const totalRequired = matches.length;
  const totalCompleted = matches.filter(m => {
    const p = predictions[m.id];
    return p && p.homeScore !== '' && p.awayScore !== '';
  }).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCompleted === totalRequired) {
      setSubmitted(true);
      setIsModalOpen(false);
    }
  };

  const getGroupCompletedCount = (g: string) => {
    const groupMatches = sport === 'football' ? matches.filter(m => m.group === g) : matches.filter(m => m.stage === g);
    return groupMatches.filter(m => {
      const p = predictions[m.id];
      return p && p.homeScore !== '' && p.awayScore !== '';
    }).length;
  };

  const currentGroupMatches = sport === 'football' ? matches.filter(m => m.group === activeGroup) : matches.filter(m => m.stage === activeGroup);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (!mounted || matches.length === 0) return null;

  const themeColors = sport === 'football' 
    ? { primary: 'indigo', icon: Trophy, bg: 'bg-indigo-600/10' }
    : { primary: 'orange', icon: Trophy, bg: 'bg-orange-600/10' };

  // 1. Submitted Dashboard Card Mode
  if (submitted && !isModalOpen) {
    return (
      <div className="w-full max-w-md p-2 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className={`p-5 rounded-full border flex items-center justify-center shadow-lg animate-pulse ${
            sport === 'football' ? 'bg-indigo-500/20 border-indigo-500/50 shadow-indigo-500/25' : 'bg-orange-500/20 border-orange-500/50 shadow-orange-500/25'
          }`}
        >
          <themeColors.icon className={`w-12 h-12 ${sport === 'football' ? 'text-indigo-500' : 'text-orange-500'}`} />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          {sport === 'football' ? 'שלב הבתים ננעל! 🔒' : 'ניחוש המשחקים ננעל! 🔒'}
        </h2>
        <div className="flex flex-col items-center space-y-4 bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-3xl p-5 w-full shadow-xl">
          <p className="text-slate-400 text-sm leading-relaxed">
            {sport === 'football' ? `כל ${totalRequired} המשחקים של שלב הבתים נוחשו וננעלו!` : `כל ${totalRequired} המשחקים נוחשו וננעלו במערכת!`}
          </p>
          
          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={`flex-1 py-2.5 px-4 font-bold rounded-xl text-xs transition-colors ${
                sport === 'football' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : sport === 'ucl' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'
              }`}
            >
              הצג ניחושים 📋
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setIsModalOpen(true);
                localStorage.removeItem(sport === 'football' ? 'nichusim_group_stage_submitted' : 'nichusim_tennis_submitted');
              }}
              className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-bold rounded-xl text-xs transition-colors"
            >
              ערוך 🔓
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Compact Dashboard Card Mode (Unsubmitted)
  if (!isModalOpen) {
    return (
      <div className="w-full max-w-md p-2 sm:p-6 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={`flex flex-col p-5 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border shadow-2xl ${
            sport === 'football' ? 'border-indigo-600/30 shadow-indigo-900/20' : 'border-orange-600/30 shadow-orange-900/20'
          }`}
        >
          <div className="flex items-center gap-3.5 mb-4">
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${sport === 'football' ? 'bg-indigo-600/10' : 'bg-orange-600/10'}`}>
              <themeColors.icon className={`w-5.5 h-5.5 ${sport === 'football' ? 'text-indigo-500' : 'text-orange-500'}`} />
            </div>
            <div className="flex flex-col text-right min-w-0">
              <h2 className="text-lg font-extrabold text-slate-100 leading-tight">
                {sport === 'football' ? 'ניחוש שלב הבתים' : 'ניחוש משחקי היום'}
              </h2>
              <span className="text-[10px] text-zinc-500 mt-0.5">
                {sport === 'football' ? `כל ${totalRequired} המשחקים של 12 הבתים` : `כל ${totalRequired} המשחקים`}
              </span>
            </div>
          </div>

          {/* Compact Progress Bar */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-3.5 mb-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-400">התקדמות הניחושים:</span>
              <span className={sport === 'football' ? 'text-indigo-400' : 'text-orange-400'}>{totalCompleted} / {totalRequired}</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-850">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${sport === 'football' ? 'bg-gradient-to-r from-indigo-600 to-violet-500' : 'bg-gradient-to-r from-orange-600 to-amber-500'}`}
                style={{ width: `${(totalCompleted / totalRequired) * 100}%` }}
              />
            </div>
          </div>

          {/* Enter immersive wizard CTA */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full relative group overflow-hidden rounded-xl"
          >
            <div className={`absolute inset-0 rounded-xl transition-all duration-300 group-hover:scale-[1.02] ${
              sport === 'football' ? 'bg-gradient-to-r from-indigo-600 to-violet-500' : 'bg-gradient-to-r from-orange-600 to-amber-500'
            }`} />
            <div className={`absolute -inset-1 blur-lg opacity-40 group-hover:opacity-100 transition duration-300 ${
              sport === 'football' ? 'bg-indigo-500/50' : 'bg-orange-500/50'
            }`} />
            <div className="relative flex items-center justify-center py-3 text-sm font-bold text-white bg-transparent gap-2">
              <span className="text-xs">🔮</span>
              {totalCompleted > 0 ? 'המשך בניחושים' : 'התחל לנחש'}
            </div>
          </button>
        </motion.div>
      </div>
    );
  }

  // 3. Immersive Dedicated Full-Screen Overlay Predictor Wizard Mode!
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-2xl flex flex-col justify-between overflow-hidden" dir="rtl">
      
      {/* Modal Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${sport === 'football' ? 'bg-indigo-500/10' : 'bg-orange-500/10'}`}>
            <themeColors.icon className={`w-4.5 h-4.5 ${sport === 'football' ? 'text-indigo-400' : 'text-orange-400'}`} />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm font-extrabold text-slate-100 leading-none">{sport === 'football' ? 'היכל ניחוש הבתים' : 'היכל ניחושי טניס'}</span>
            <span className="text-[10px] text-zinc-500 mt-1 font-bold">{totalCompleted} / {totalRequired} משחקים הוזנו</span>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="p-2 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-slate-200 transition-all flex items-center gap-1 text-xs font-bold"
        >
          <X className="w-4 h-4" />
          סגור
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Collapsible FIFA Draw Diagram */}
        {sport === 'football' && (
          <div>
            <button
              type="button"
              onClick={() => setShowDiagram(!showDiagram)}
              className={`w-full py-2 px-3 rounded-xl flex items-center justify-between text-xs font-semibold border transition-all ${
                showDiagram 
                  ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300' 
                  : 'bg-zinc-900/40 hover:bg-zinc-900/85 border-zinc-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className={`w-4 h-4 ${showDiagram ? 'text-indigo-400' : 'text-zinc-500'}`} />
                <span>🗺️ תרשים הבתים הרשמי של מונדיאל 2026</span>
              </div>
              <span className="text-zinc-500 text-[10px] font-bold">{showDiagram ? 'הסתר ▲' : 'הצג תרשים ▼'}</span>
            </button>
            
            <AnimatePresence>
              {showDiagram && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 flex flex-col items-center mx-auto w-48 shadow-lg">
                    <div className="relative group cursor-zoom-in overflow-hidden rounded-lg">
                      <img 
                        src="/images/world-cup-groups.jpg" 
                        alt="תרשים הבתים הרשמי"
                        className="w-40 h-24 object-cover object-top hover:scale-105 transition-transform duration-300 border border-zinc-800"
                        onClick={() => {
                          window.open('/images/world-cup-groups.jpg', '_blank');
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                        <span className="text-[9px] text-white font-bold bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">הגדל 🔍</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-zinc-500 mt-2 text-center font-bold">
                      💡 לחץ על התרשים להגדלה
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Wizard Progress & Quick Actions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-3.5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-zinc-400">התקדמות הניחוש הכללית:</span>
            <span className={`${sport === 'football' ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/15' : 'text-orange-400 bg-orange-500/10 border-orange-500/15'} px-2 py-0.5 rounded-full border`}>{totalCompleted} / {totalRequired}</span>
          </div>
          
          <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-855">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${sport === 'football' ? 'bg-gradient-to-r from-indigo-600 to-violet-500' : 'bg-gradient-to-r from-orange-600 to-amber-500'}`}
              style={{ width: `${(totalCompleted / totalRequired) * 100}%` }}
            />
          </div>

          {!submitted && (
            <div className="flex gap-2 pt-0.5">
              <button
                type="button"
                onClick={handleAutoFillAll}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 font-bold rounded-xl text-xs transition-all border ${
                  sport === 'football' 
                    ? 'bg-indigo-600/10 border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300' 
                    : 'bg-orange-600/10 border-orange-500/30 hover:bg-orange-600/20 text-orange-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                🔮 מילוי אקראי מהיר
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 border rounded-xl text-xs transition-all ${
                  isConfirmingClear 
                    ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-pulse font-bold' 
                    : 'bg-zinc-950 border-zinc-850 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-500 hover:text-red-400 font-medium'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isConfirmingClear ? '⚠️ לחץ שוב למחיקה!' : 'נקה הכל'}
              </button>
            </div>
          )}
        </div>

        {/* Group Tabs Selector */}
        {groups.length > 1 && (
          <div>
            <div className="flex overflow-x-auto gap-1.5 py-1 scrollbar-none select-none" dir="rtl">
              {groups.map((g) => {
                const isActive = g === activeGroup;
                const count = getGroupCompletedCount(g);
                const matchesInGroup = sport === 'football' ? matches.filter(m => m.group === g).length : matches.filter(m => m.stage === g).length;
                const isGroupDone = count === matchesInGroup;

                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setActiveGroup(g)}
                    className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                      isActive
                        ? (sport === 'football' ? 'bg-indigo-600 border-indigo-500 text-white shadow shadow-indigo-600/15' : 'bg-orange-600 border-orange-500 text-white shadow shadow-orange-600/15')
                        : isGroupDone
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:bg-zinc-850'
                    }`}
                  >
                    <span>{sport === 'football' ? GROUP_HEBREW[g] : g}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : isGroupDone 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-zinc-950 text-zinc-500'
                    }`}>
                      {count}/{matchesInGroup}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Matches Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-2"
              >
                {currentGroupMatches.map((m) => {
                  const p = predictions[m.id] || { homeScore: '', awayScore: '' };
                  const GRACE_PERIOD_MS = 15 * 60 * 1000; // 15 minutes
                  const isStarted = m.timestamp + GRACE_PERIOD_MS <= now;
                  const isInputDisabled = submitted || isStarted;

                  let cardClass = "border-zinc-800/80 hover:border-zinc-700/60 bg-zinc-900/40 text-slate-100";
                  let pointsBadge = null;

                  if (getMatchStatus(m, now) === 'finished' && m.actualHomeScore !== undefined && m.actualAwayScore !== undefined) {
                    const points = calculateMatchPoints(
                      sport,
                      p.homeScore,
                      p.awayScore,
                      m.actualHomeScore,
                      m.actualAwayScore
                    );

                    const maxPoints = sport === 'ucl' ? 10 : 3;
                    const directionPoints = sport === 'ucl' ? 5 : 1;

                    if (points === maxPoints) {
                      cardClass = "border-green-500 bg-green-950/20 text-green-400";
                      pointsBadge = (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400">
                          +{maxPoints} PTS
                        </span>
                      );
                    } else if (points === directionPoints) {
                      cardClass = "border-blue-500 bg-blue-950/20 text-blue-400";
                      pointsBadge = (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          +{directionPoints} PTS
                        </span>
                      );
                    } else {
                      cardClass = "border-red-500 bg-red-950/20 text-red-400";
                      pointsBadge = (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400">
                          0 PTS
                        </span>
                      );
                    }
                  }

                  return (
                    <div 
                      key={m.id}
                      id={`match-${m.id}`}
                      className={`flex flex-col gap-1 w-full border rounded-xl p-2.5 transition-all duration-300 ${cardClass}`}
                    >
                      {pointsBadge && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-black tracking-wide text-slate-400 uppercase select-none">
                            {sport === 'ucl' ? 'Champions League Final' : m.group ? `Group ${m.group}` : m.stage}
                          </span>
                          {pointsBadge}
                        </div>
                      )}
                      <div className="flex items-center justify-between w-full">
                        {/* Home Team */}
                        <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-start">
                          <TeamFlag iso={m.home.iso} flag={m.home.flag} name={m.home.name} logo={m.home.logo} size="small" />
                          <span className={`text-xs font-bold truncate ${getMatchStatus(m, now) === 'finished' ? '' : 'text-slate-200'}`} dir={/^[a-zA-Z]/.test(m.home.name) ? 'ltr' : 'rtl'}>{m.home.name}</span>
                        </div>

                        {/* Scores inputs */}
                        <div className="flex items-center justify-center gap-1 flex-shrink-0 mx-1">
                          <input
                            type="number"
                            min="0"
                            max={sport === 'tennis' ? (m.bestOf === 3 ? 2 : 3) : 10}
                            required
                            disabled={isInputDisabled}
                            placeholder="-"
                            value={p.homeScore}
                            onChange={(e) => handleScoreChange(m.id, 'home', e.target.value)}
                            className={`w-8 h-8 text-center text-xs font-black bg-zinc-950 border rounded-md focus:ring-1 outline-none text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-90 disabled:border-opacity-30 border-zinc-800 ${sport === 'ucl' ? 'focus:border-blue-500 focus:ring-blue-500 disabled:text-blue-400' : sport === 'tennis' ? 'focus:border-orange-500 focus:ring-orange-500 disabled:text-orange-400' : 'focus:border-indigo-500 focus:ring-indigo-500 disabled:text-indigo-400'}`}
                            dir="ltr"
                          />
                          <span className={`font-extrabold text-xs ${sport === 'ucl' ? 'text-blue-600/50' : sport === 'tennis' ? 'text-orange-600/50' : 'text-zinc-600'}`}>-</span>
                          <input
                            type="number"
                            min="0"
                            max={sport === 'tennis' ? (m.bestOf === 3 ? 2 : 3) : 10}
                            required
                            disabled={isInputDisabled}
                            placeholder="-"
                            value={p.awayScore}
                            onChange={(e) => handleScoreChange(m.id, 'away', e.target.value)}
                            className={`w-8 h-8 text-center text-xs font-black bg-zinc-950 border rounded-md focus:ring-1 outline-none text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-90 disabled:border-opacity-30 border-zinc-800 ${sport === 'ucl' ? 'focus:border-blue-500 focus:ring-blue-500 disabled:text-blue-400' : sport === 'tennis' ? 'focus:border-orange-500 focus:ring-orange-500 disabled:text-orange-400' : 'focus:border-indigo-500 focus:ring-indigo-500 disabled:text-indigo-400'}`}
                            dir="ltr"
                          />
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end text-left">
                          <span className={`text-xs font-bold truncate order-2 sm:order-1 ${getMatchStatus(m, now) === 'finished' ? '' : 'text-slate-200'}`} dir={/^[a-zA-Z]/.test(m.away.name) ? 'ltr' : 'rtl'}>{m.away.name}</span>
                          <span className="order-1 sm:order-2 ml-1.5 flex items-center">
                            <TeamFlag iso={m.away.iso} flag={m.away.flag} name={m.away.name} logo={m.away.logo} size="small" />
                          </span>
                        </div>
                      </div>

                      {m.prop_bets && m.prop_bets.length > 0 ? (
                        <div className="mt-2.5 pt-2 border-t border-zinc-800/80 w-full space-y-3" dir="rtl">
                          <label className="block text-[9px] font-black text-blue-400 uppercase tracking-wider text-right mb-0.5">
                            🔥 שאלות בונוס (Prop Bets)
                          </label>
                          {m.prop_bets.map((bet) => {
                            const selectedOpt = (p.propBets || {})[bet.id] || '';
                            return (
                              <div key={bet.id} className="space-y-1 pb-2 border-b border-zinc-900/60 last:border-0 last:pb-0">
                                <span className="block text-[11px] font-extrabold text-slate-300 text-right">
                                  {bet.question}
                                </span>
                                {bet.options.length === 0 ? (
                                  <div className="w-full">
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="הזינו מספר..."
                                      disabled={isInputDisabled}
                                      value={selectedOpt}
                                      onChange={(e) => handleMultiPropChange(m.id, bet.id, e.target.value)}
                                      className="w-full px-3 py-1.5 text-center text-xs font-black bg-zinc-950 border border-zinc-850 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-slate-100 disabled:opacity-85 disabled:cursor-not-allowed transition-colors"
                                      dir="ltr"
                                    />
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-2 gap-1.5 text-right">
                                    {bet.options.map((opt) => {
                                      const isSelected = selectedOpt === opt;
                                      return (
                                        <button
                                          key={opt}
                                          type="button"
                                          disabled={isInputDisabled}
                                          onClick={() => handleMultiPropChange(m.id, bet.id, opt)}
                                          className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border text-center transition-all ${
                                            isSelected
                                              ? 'bg-blue-600 border-blue-500 text-white shadow shadow-blue-950/20'
                                              : 'bg-zinc-950 border-zinc-850 text-slate-400 hover:text-slate-200 hover:bg-zinc-900/40'
                                          } disabled:opacity-85 disabled:cursor-not-allowed`}
                                        >
                                          {opt}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : m.has_prop_bet && m.prop_question && m.prop_options ? (
                        <div className="mt-2.5 pt-2 border-t border-zinc-800/80 w-full" dir="rtl">
                          <label className="block text-[9px] font-black text-blue-400 uppercase tracking-wider mb-1 text-right">
                            🔥 שאלת בונוס (Prop Bet)
                          </label>
                          <span className="block text-[11px] font-extrabold text-slate-300 mb-2 text-right">
                            {m.prop_question}
                          </span>
                          <div className="grid grid-cols-2 gap-1.5 text-right">
                            {m.prop_options.map((opt) => {
                              const isSelected = p.selectedProp === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  disabled={isInputDisabled}
                                  onClick={() => handlePropChange(m.id, opt)}
                                  className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border text-center transition-all ${
                                    isSelected
                                      ? 'bg-blue-600 border-blue-500 text-white shadow shadow-blue-950/20'
                                      : 'bg-zinc-950 border-zinc-850 text-slate-400 hover:text-slate-200 hover:bg-zinc-900/40'
                                  } disabled:opacity-85 disabled:cursor-not-allowed`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                      {isStarted && getMatchStatus(m, now) !== 'finished' && (
                        <div className="text-[9px] text-center text-red-400 mt-0.5">
                          🔒 המשחק החל (נעול)
                        </div>
                      )}
                      {getMatchStatus(m, now) === 'finished' && m.actualHomeScore !== undefined && m.actualAwayScore !== undefined && (
                        <div className="text-[10px] text-center font-bold text-emerald-400 mt-0.5 bg-emerald-500/10 rounded-full py-1 border border-emerald-500/20">
                          תוצאת סיום: {m.actualHomeScore} - {m.actualAwayScore}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </form>
      </div>

      {/* Modal Fixed Footer Controls */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-zinc-900 bg-zinc-950 flex gap-2">
        {/* Navigation block */}
        {groups.length > 1 && (
          <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-2 text-zinc-400 select-none w-[110px]">
            <button
              type="button"
              onClick={() => {
                const idx = groups.indexOf(activeGroup);
                if (idx > 0) setActiveGroup(groups[idx - 1]);
              }}
              disabled={activeGroup === groups[0]}
              className={`hover:text-${themeColors.primary}-400 disabled:opacity-30 transition-colors`}
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
            <span className="text-[10px] font-bold text-zinc-400">{sport === 'football' ? 'בתים' : 'שלבים'}</span>
            <button
              type="button"
              onClick={() => {
                const idx = groups.indexOf(activeGroup);
                if (idx < groups.length - 1) setActiveGroup(groups[idx + 1]);
              }}
              disabled={activeGroup === groups[groups.length - 1]}
              className={`hover:text-${themeColors.primary}-400 disabled:opacity-30 transition-colors`}
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        {/* Lock / Save CTA */}
        {submitted ? (
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              localStorage.removeItem(sport === 'football' ? 'nichusim_group_stage_submitted' : 'nichusim_tennis_submitted');
            }}
            className="flex-1 flex items-center justify-center py-3 bg-zinc-950 border border-zinc-800 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-bold rounded-xl text-sm gap-1.5 transition-colors"
          >
            פתח נעילה וערוך 🔓
          </button>
        ) : totalCompleted === totalRequired ? (
          <button
            type="button"
            onClick={handleSubmit}
            className={`flex-1 flex items-center justify-center py-3 text-white font-extrabold rounded-xl text-sm gap-1.5 shadow-lg transition-transform active:scale-98 ${
              sport === 'football' ? 'bg-gradient-to-r from-indigo-600 to-violet-500 shadow-indigo-600/15' : 'bg-gradient-to-r from-orange-600 to-amber-500 shadow-orange-600/15'
            }`}
          >
            <CheckCircle2 className="w-4.5 h-4.5" />
            נעל ניחוש 🔒
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 flex items-center justify-center py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-slate-200 font-bold rounded-xl text-xs sm:text-sm transition-colors active:scale-98"
          >
            שמור התקדמות וסגור 💾
          </button>
        )}
      </div>

    </div>
  );
}
