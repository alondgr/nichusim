'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Target, Trophy, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import { TEAMS, Team, PredictionsState, getGroupMatches, Match } from '@/data/worldCupData';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const GROUP_HEBREW: Record<string, string> = {
  A: 'בית א\'', B: 'בית ב\'', C: 'בית ג\'', D: 'בית ד\'',
  E: 'בית ה\'', F: 'בית ו\'', G: 'בית ז\'', H: 'בית ח\'',
  I: 'בית ט\'', J: 'בית י\'', K: 'בית י"א', L: 'בית י"ב'
};

const ALL_MATCHES = GROUPS.flatMap(g => getGroupMatches(g, TEAMS)).sort((a, b) => a.timestamp - b.timestamp);

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
        ? "w-5 h-3.5 object-cover rounded-sm shadow-sm border border-zinc-800 bg-zinc-950 flex-shrink-0"
        : "w-14 h-9.5 object-cover rounded shadow-md border border-zinc-800 bg-zinc-900 flex-shrink-0"
      }
      onError={() => setError(true)}
    />
  );
};

interface OpeningJinxFormProps {
  predictions: PredictionsState;
  savePredictions: (preds: PredictionsState) => void;
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
}

export default function OpeningJinxForm({ predictions, savePredictions, submitted, setSubmitted }: OpeningJinxFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [mounted, setMounted] = useState(false);

  // Load carousel index from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedIdx = localStorage.getItem('nichusim_carousel_index');
    if (savedIdx !== null) {
      const parsed = parseInt(savedIdx, 10);
      if (parsed >= 0 && parsed < ALL_MATCHES.length) {
        setCurrentIndex(parsed);
      }
    }
  }, []);

  const handleIndexChange = (newIdx: number, dir: number) => {
    if (newIdx >= 0 && newIdx < ALL_MATCHES.length) {
      setDirection(dir);
      setCurrentIndex(newIdx);
      localStorage.setItem('nichusim_carousel_index', String(newIdx));
    }
  };

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

  const handleUnlock = () => {
    if (window.confirm('האם לפתוח מחדש את הנעילה כדי לערוך את כל הניחושים?')) {
      setSubmitted(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.18, ease: 'easeIn' as const }
    })
  };

  if (!mounted) return null; // Avoid hydration mismatch

  const match = ALL_MATCHES[currentIndex];
  const p = predictions[match.id] || { homeScore: '', awayScore: '' };
  const isOpening = currentIndex === 0;

  // Calculate total answered in carousel
  const completedCount = ALL_MATCHES.filter(m => {
    const pred = predictions[m.id];
    return pred && pred.homeScore !== '' && pred.awayScore !== '';
  }).length;

  return (
    <div className="w-full max-w-md p-2 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-4 sm:p-8 rounded-3xl sm:rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-indigo-600/30 shadow-2xl shadow-indigo-900/20 overflow-hidden"
      >
        {/* Carousel Progress Header */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold mb-4 px-1 select-none">
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            {GROUP_HEBREW[match.group]}
          </span>
          <span className="text-zinc-400">
            משחק {currentIndex + 1} מתוך {ALL_MATCHES.length}
          </span>
          <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full text-[10px] text-zinc-400">
            הוזנו: {completedCount} / 72
          </span>
        </div>

        {/* Card Main Info */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-1">
            {submitted ? (
              <Lock className="w-6 h-6 text-indigo-400" />
            ) : isOpening ? (
              <Trophy className="w-6 h-6 text-yellow-500" />
            ) : (
              <Target className="w-6 h-6 text-red-500" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {isOpening ? '🏆 משחק הפתיחה' : '🔮 נאחס את התוצאה'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {submitted 
              ? 'כל הניחושים ננעלו בהצלחה! 🔒'
              : isOpening 
              ? 'מקסיקו נגד דרום אפריקה. נאחס את התוצאה המדויקת.'
              : `משחק ביתי של שלב הבתים של מונדיאל 2026.`}
          </p>
        </div>

        {/* Swipeable Match Area */}
        <div className="relative min-h-[190px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 sm:p-6">
                {/* Match Schedule & Channel Info */}
                <div className="flex flex-col items-center space-y-1 mb-4 pb-3.5 border-b border-zinc-800/60 select-none">
                  <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/15 shadow-sm">
                    <span>📅</span>
                    <span>{match.dateStr}</span>
                    <span className="text-zinc-700 font-extrabold">|</span>
                    <span>⏰</span>
                    <span dir="ltr">{match.timeStr} שעון ישראל</span>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/15">
                    <span>📺</span>
                    <span>שידור ישיר: {match.channel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Team 1: Home */}
                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.home.iso} flag={match.home.flag} name={match.home.name} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">{match.home.name}</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      required
                      disabled={submitted}
                      value={p.homeScore}
                      onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-100 disabled:opacity-90 disabled:text-indigo-400 disabled:border-indigo-500/30"
                      dir="ltr"
                    />
                  </div>

                  <div className="text-xl font-black text-slate-600 mb-6 px-3 flex-shrink-0">-</div>

                  {/* Team 2: Away */}
                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.away.iso} flag={match.away.flag} name={match.away.name} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">{match.away.name}</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      required
                      disabled={submitted}
                      value={p.awayScore}
                      onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-100 disabled:opacity-90 disabled:text-indigo-400 disabled:border-indigo-500/30"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex justify-between items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => handleIndexChange(currentIndex - 1, -1)}
            disabled={currentIndex === 0}
            className="flex-1 py-2.5 px-3 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 text-zinc-400 hover:text-indigo-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none"
          >
            <ChevronRight className="w-4 h-4" />
            משחק קודם
          </button>
          
          <button
            type="button"
            onClick={() => handleIndexChange(currentIndex + 1, 1)}
            disabled={currentIndex === ALL_MATCHES.length - 1}
            className="flex-1 py-2.5 px-3 bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none"
          >
            משחק הבא
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Submit / Unlock global state */}
        {submitted && (
          <div className="mt-4 pt-1 border-t border-zinc-900/60">
            <button
              type="button"
              onClick={handleUnlock}
              className="w-full py-3 bg-zinc-950 border border-zinc-850 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-500 hover:text-red-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg active:scale-98"
            >
              פתח נעילה לעריכה 🔓
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
