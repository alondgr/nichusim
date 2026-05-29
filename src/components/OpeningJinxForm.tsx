'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Target, Trophy, ChevronRight, ChevronLeft, Lock } from 'lucide-react';
import { Match, PredictionsState } from '@/data/worldCupData';

const GROUP_HEBREW: Record<string, string> = {
  A: 'בית א\'', B: 'בית ב\'', C: 'בית ג\'', D: 'בית ד\'',
  E: 'בית ה\'', F: 'בית ו\'', G: 'בית ז\'', H: 'בית ח\'',
  I: 'בית ט\'', J: 'בית י\'', K: 'בית י"א', L: 'בית י"ב'
};

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
  sport?: 'football' | 'tennis';
  matches: Match[];
  predictions: PredictionsState;
  savePredictions: (preds: PredictionsState) => void;
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
}

export default function OpeningJinxForm({ sport = 'football', matches, predictions, savePredictions, submitted, setSubmitted }: OpeningJinxFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  // Add a state to force re-render every minute to update the locked status
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setMounted(true);
    const savedIdxKey = sport === 'football' ? 'nichusim_carousel_index' : 'nichusim_tennis_carousel_index';
    const savedIdx = localStorage.getItem(savedIdxKey);
    if (savedIdx !== null) {
      const parsed = parseInt(savedIdx, 10);
      if (parsed >= 0 && parsed < matches.length) {
        setCurrentIndex(parsed);
      }
    } else {
      setCurrentIndex(0);
    }

    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, [sport, matches.length]);

  const handleIndexChange = (newIdx: number, dir: number) => {
    if (newIdx >= 0 && newIdx < matches.length) {
      setDirection(dir);
      setCurrentIndex(newIdx);
      const savedIdxKey = sport === 'football' ? 'nichusim_carousel_index' : 'nichusim_tennis_carousel_index';
      localStorage.setItem(savedIdxKey, String(newIdx));
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
    setSubmitted(false);
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

  if (!mounted || matches.length === 0) return null;

  const match = matches[currentIndex];
  const p = predictions[match.id] || { homeScore: '', awayScore: '' };
  const isOpening = sport === 'football' && currentIndex === 0;

  const completedCount = matches.filter(m => {
    const pred = predictions[m.id];
    return pred && pred.homeScore !== '' && pred.awayScore !== '';
  }).length;

  const isStarted = match.timestamp <= now;
  const isInputDisabled = submitted || isStarted;

  return (
    <div className="w-full max-w-md p-2 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`flex flex-col p-4 sm:p-8 rounded-3xl sm:rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border shadow-2xl overflow-hidden ${
          sport === 'tennis' ? 'border-orange-600/30 shadow-orange-900/20' : 'border-indigo-600/30 shadow-indigo-900/20'
        }`}
      >
        {/* Carousel Progress Header */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold mb-4 px-1 select-none">
          <span className={`px-2 py-0.5 rounded-full border ${
            sport === 'tennis' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          }`}>
            {sport === 'football' && match.group ? GROUP_HEBREW[match.group] : match.stage}
          </span>
          <span className="text-zinc-400">
            משחק {currentIndex + 1} מתוך {matches.length}
          </span>
          <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full text-[10px] text-zinc-400">
            הוזנו: {completedCount} / {matches.length}
          </span>
        </div>

        {/* Card Main Info */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-1">
            {submitted || isStarted ? (
              <Lock className={`w-6 h-6 ${sport === 'tennis' ? 'text-orange-400' : 'text-indigo-400'}`} />
            ) : isOpening ? (
              <Trophy className="w-6 h-6 text-yellow-500" />
            ) : (
              <Target className="w-6 h-6 text-red-500" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {sport === 'football' 
              ? (isOpening ? '🏆 משחק הפתיחה' : '🔮 נאחס את התוצאה') 
              : '🎾 נחש תוצאת מערכות'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isStarted
              ? 'המשחק כבר התחיל. הניחוש נעול! 🔒'
              : submitted 
                ? 'כל הניחושים ננעלו בהצלחה! 🔒'
                : sport === 'football'
                  ? (isOpening ? 'מקסיקו נגד דרום אפריקה. נאחס את התוצאה המדויקת.' : 'משחק ביתי של שלב הבתים של מונדיאל 2026.')
                  : `משחק ${match.stage} ברולאן גארוס. הטוב מ-${match.bestOf} מערכות.`}
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
                  <div className={`text-[11px] font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm ${
                    sport === 'tennis' ? 'text-orange-400 bg-orange-500/10 border-orange-500/15' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/15'
                  }`}>
                    <span>📅</span>
                    <span>{match.dateStr}</span>
                    <span className="text-zinc-700 font-extrabold">|</span>
                    <span>⏰</span>
                    <span dir="ltr">{match.timeStr} שעון ישראל</span>
                    
                    {match.status === 'live' && (
                      <span className="ml-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded uppercase animate-pulse">Live</span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/15">
                    <span>📺</span>
                    <span>שידור ישיר: {match.channel}</span>
                  </div>
                  <div className="text-[10px] font-extrabold text-amber-400 flex flex-col items-center bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/15 mt-1 select-none">
                    <div className="flex items-center gap-1.5">
                      <span>🎯</span>
                      <span>בול: 3 נק&apos;</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span>🧭</span>
                      <span>כיוון: 1 נק&apos;</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Team 1: Home */}
                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.home.iso} flag={match.home.flag} name={match.home.name} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">{match.home.name}</span>
                    {sport === 'football' && (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        required
                        disabled={isInputDisabled}
                        value={p.homeScore}
                        onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border rounded-xl focus:ring-2 outline-none text-slate-100 disabled:opacity-90 disabled:border-opacity-30 transition-colors border-zinc-700 focus:ring-indigo-500`}
                        dir="ltr"
                      />
                    )}
                  </div>

                  {/* Tennis Select (Center) or Football Dash */}
                  {sport === 'tennis' ? (
                    <div className="px-2">
                      <select
                        disabled={isInputDisabled}
                        value={p.homeScore !== '' && p.awayScore !== '' ? `${p.homeScore}-${p.awayScore}` : '-'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '-') {
                            handleScoreChange(match.id, 'home', '');
                            handleScoreChange(match.id, 'away', '');
                          } else {
                            const [h, a] = val.split('-');
                            handleScoreChange(match.id, 'home', h);
                            handleScoreChange(match.id, 'away', a);
                          }
                        }}
                        className="bg-zinc-950 border border-orange-500/50 text-slate-100 text-sm sm:text-lg font-black rounded-xl px-2 py-3 focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-90 transition-colors text-center cursor-pointer"
                        dir="ltr"
                      >
                        <option value="-">-- : --</option>
                        {match.bestOf === 3 ? (
                          <>
                            <option value="2-0">2 - 0</option>
                            <option value="2-1">2 - 1</option>
                            <option value="1-2">1 - 2</option>
                            <option value="0-2">0 - 2</option>
                          </>
                        ) : (
                          <>
                            <option value="3-0">3 - 0</option>
                            <option value="3-1">3 - 1</option>
                            <option value="3-2">3 - 2</option>
                            <option value="2-3">2 - 3</option>
                            <option value="1-3">1 - 3</option>
                            <option value="0-3">0 - 3</option>
                          </>
                        )}
                      </select>
                    </div>
                  ) : (
                    <div className="text-xl font-black text-slate-600 mb-6 px-3 flex-shrink-0">-</div>
                  )}

                  {/* Team 2: Away */}
                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.away.iso} flag={match.away.flag} name={match.away.name} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 truncate w-full text-center">{match.away.name}</span>
                    {sport === 'football' && (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        required
                        disabled={isInputDisabled}
                        value={p.awayScore}
                        onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border rounded-xl focus:ring-2 outline-none text-slate-100 disabled:opacity-90 disabled:border-opacity-30 transition-colors border-zinc-700 focus:ring-indigo-500`}
                        dir="ltr"
                      />
                    )}
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
            className={`flex-1 py-2.5 px-3 bg-zinc-900 border hover:border-indigo-500/40 text-zinc-400 hover:text-indigo-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none ${sport === 'tennis' ? 'border-orange-900/30 hover:border-orange-500/40 hover:text-orange-400' : 'border-zinc-800'}`}
          >
            <ChevronRight className="w-4 h-4" />
            משחק קודם
          </button>
          
          <button
            type="button"
            onClick={() => handleIndexChange(currentIndex + 1, 1)}
            disabled={currentIndex === matches.length - 1}
            className={`flex-1 py-2.5 px-3 border font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none ${
              sport === 'tennis' ? 'bg-orange-600/10 border-orange-500/30 hover:bg-orange-600/20 text-orange-300' : 'bg-indigo-600/10 border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300'
            }`}
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
