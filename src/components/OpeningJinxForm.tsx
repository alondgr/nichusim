'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Target, Trophy, ChevronRight, ChevronLeft, Lock, Radio } from 'lucide-react';
import { Match, PredictionsState, getMatchStatus } from '@/data/worldCupData';

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
        size === 'small' ? 'w-10 h-10 p-1.5' : 'w-12 h-12 sm:w-14 sm:h-14 p-2'
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
        size === 'small' ? 'w-10 h-10 text-sm' : 'w-12 h-12 sm:w-14 sm:h-14 text-lg'
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

interface OpeningJinxFormProps {
  sport?: 'football' | 'tennis' | 'ucl';
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
    setNow(Date.now()); // Sync immediately on client mount
    
    const liveIndex = matches.findIndex(m => getMatchStatus(m, Date.now()) === 'live');
    if (liveIndex !== -1) {
      setCurrentIndex(liveIndex);
    } else {
      const savedIdxKey = sport === 'football' ? 'nichusim_carousel_index' : sport === 'ucl' ? 'nichusim_ucl_carousel_index' : 'nichusim_tennis_carousel_index';
      const savedIdx = localStorage.getItem(savedIdxKey);
      if (savedIdx !== null) {
        const parsed = parseInt(savedIdx, 10);
        if (parsed >= 0 && parsed < matches.length) {
          setCurrentIndex(parsed);
        }
      } else {
        setCurrentIndex(0);
      }
    }

    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, [sport, matches]);

  const handleIndexChange = (newIdx: number, dir: number) => {
    if (newIdx >= 0 && newIdx < matches.length) {
      setDirection(dir);
      setCurrentIndex(newIdx);
      const savedIdxKey = sport === 'football' ? 'nichusim_carousel_index' : sport === 'ucl' ? 'nichusim_ucl_carousel_index' : 'nichusim_tennis_carousel_index';
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

  const GRACE_PERIOD_MS = 15 * 60 * 1000; // 15 minutes
  const isStarted = match.timestamp + GRACE_PERIOD_MS <= now;
  const isInputDisabled = submitted || isStarted;
  const liveIndex = matches.findIndex(m => getMatchStatus(m, now) === 'live');

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
              <Lock className={`w-6 h-6 ${sport === 'ucl' ? 'text-blue-400' : sport === 'tennis' ? 'text-orange-400' : 'text-indigo-400'}`} />
            ) : isOpening ? (
              <Trophy className="w-6 h-6 text-yellow-500" />
            ) : (
              <Target className="w-6 h-6 text-red-500" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {sport === 'ucl' 
              ? '⭐ גמר ליגת האלופות' 
              : sport === 'football' 
              ? (isOpening ? '🏆 משחק הפתיחה' : '🔮 נאחס את התוצאה') 
              : '🎾 נחש תוצאת מערכות'}
          </h2>
          <p className={`text-xs sm:text-sm font-medium ${
            getMatchStatus(match, now) === 'finished' 
              ? 'text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20'
              : submitted 
              ? 'text-indigo-300' 
              : isStarted 
              ? 'text-red-400' 
              : 'text-slate-400'
          }`}>
            {getMatchStatus(match, now) === 'finished' && match.actualHomeScore !== undefined && match.actualAwayScore !== undefined
              ? `תוצאת סיום: ${match.actualHomeScore} - ${match.actualAwayScore}`
              : submitted
              ? 'הניחוש שלך נשמר בהצלחה! 🎉'
              : isStarted
              ? 'המשחק כבר התחיל. הניחוש נעול! 🔒'
              : sport === 'ucl'
                ? 'פריז סן ז\'רמן נגד ארסנל. המנצחת זוכה בגביע.'
              : sport === 'football'
                ? (isOpening ? 'מקסיקו נגד דרום אפריקה. נאחס את התוצאה המדויקת.' : 'משחק ביתי של שלב הבתים של מונדיאל 2026.')
                : `משחק ${match.stage} ברולאן גארוס. הטוב מ-${match.bestOf} מערכות.`}
          </p>
        </div>

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
                <div className="flex flex-col items-center space-y-1 mb-4 pb-3.5 border-b border-zinc-800/60 select-none">
                  <div className={`text-[11px] font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm ${
                    sport === 'ucl' ? 'text-blue-400 bg-blue-500/10 border-blue-500/15' : sport === 'tennis' ? 'text-orange-400 bg-orange-500/10 border-orange-500/15' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/15'
                  }`}>
                    <span>📅</span>
                    <span>{match.dateStr}</span>
                    <span className="text-zinc-700 font-extrabold">|</span>
                    <span>⏰</span>
                    <span dir="ltr">{match.timeStr} שעון ישראל</span>
                    
                    {getMatchStatus(match, now) === 'live' && (
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
                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.home.iso} flag={match.home.flag} name={match.home.name} logo={match.home.logo} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 w-full text-center whitespace-normal break-words leading-tight" dir={/^[a-zA-Z]/.test(match.home.name) ? 'ltr' : 'rtl'}>{match.home.name}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min="0"
                      max={sport === 'tennis' ? (match.bestOf === 3 ? 2 : 3) : 10}
                      required
                      disabled={isInputDisabled}
                      value={p.homeScore}
                      onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border rounded-xl focus:ring-2 outline-none text-slate-100 disabled:opacity-90 disabled:border-opacity-30 transition-colors ${sport === 'ucl' ? 'border-blue-500/50 focus:ring-blue-500' : sport === 'tennis' ? 'border-orange-500/50 focus:ring-orange-500' : 'border-zinc-700 focus:ring-indigo-500'}`}
                      dir="ltr"
                    />
                  </div>

                  <div className={`text-xl font-black mb-6 px-3 flex-shrink-0 ${sport === 'ucl' ? 'text-blue-600/50' : sport === 'tennis' ? 'text-orange-600/50' : 'text-slate-600'}`}>-</div>

                  <div className="flex flex-col items-center space-y-3 flex-1 min-w-0">
                    <TeamFlag iso={match.away.iso} flag={match.away.flag} name={match.away.name} logo={match.away.logo} />
                    <span className="font-bold text-xs sm:text-sm text-slate-200 w-full text-center whitespace-normal break-words leading-tight" dir={/^[a-zA-Z]/.test(match.away.name) ? 'ltr' : 'rtl'}>{match.away.name}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min="0"
                      max={sport === 'tennis' ? (match.bestOf === 3 ? 2 : 3) : 10}
                      required
                      disabled={isInputDisabled}
                      value={p.awayScore}
                      onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-black bg-zinc-950 border rounded-xl focus:ring-2 outline-none text-slate-100 disabled:opacity-90 disabled:border-opacity-30 transition-colors ${sport === 'ucl' ? 'border-blue-500/50 focus:ring-blue-500' : sport === 'tennis' ? 'border-orange-500/50 focus:ring-orange-500' : 'border-zinc-700 focus:ring-indigo-500'}`}
                      dir="ltr"
                    />
                  </div>
                </div>

                {match.prop_bets && match.prop_bets.length > 0 ? (
                  <div className="mt-5 pt-4 border-t border-zinc-800/80 w-full space-y-5" dir="rtl">
                    <label className="block text-[10px] font-black text-blue-400 uppercase tracking-wider text-right mb-1">
                      🔥 שאלות בונוס (Prop Bets)
                    </label>
                    {match.prop_bets.map((bet) => {
                      const selectedOpt = (p.propBets || {})[bet.id] || '';
                      return (
                        <div key={bet.id} className="space-y-2 pb-3 border-b border-zinc-900/60 last:border-0 last:pb-0">
                          <span className="block text-xs font-extrabold text-slate-200 text-right">
                            {bet.question}
                          </span>
                          {bet.options.length === 0 ? (
                            <div className="w-full">
                              <input
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                min="0"
                                placeholder="הזינו מספר..."
                                disabled={isInputDisabled}
                                value={selectedOpt}
                                onChange={(e) => handleMultiPropChange(match.id, bet.id, e.target.value)}
                                className="w-full px-4 py-2.5 text-center text-sm font-black bg-zinc-950 border border-zinc-850 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 disabled:opacity-85 disabled:cursor-not-allowed transition-colors"
                                dir="ltr"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2 text-right">
                              {bet.options.map((opt) => {
                                const isSelected = selectedOpt === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    disabled={isInputDisabled}
                                    onClick={() => handleMultiPropChange(match.id, bet.id, opt)}
                                    className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                                      isSelected
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-950/20'
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
                ) : match.has_prop_bet && match.prop_question && match.prop_options ? (
                  <div className="mt-5 pt-4 border-t border-zinc-800/80 w-full" dir="rtl">
                    <label className="block text-[10px] font-black text-blue-400 uppercase tracking-wider mb-2 text-right">
                      🔥 שאלת בונוס (Prop Bet)
                    </label>
                    <span className="block text-xs font-extrabold text-slate-200 mb-3 text-right">
                      {match.prop_question}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-right">
                      {match.prop_options.map((opt) => {
                        const isSelected = p.selectedProp === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={isInputDisabled}
                            onClick={() => handlePropChange(match.id, opt)}
                            className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-950/20'
                                : 'bg-zinc-950 border-zinc-850 text-slate-400 hover:text-slate-200 hover:bg-zinc-900/40'
                            } disabled:opacity-80 disabled:cursor-not-allowed`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => handleIndexChange(currentIndex - 1, -1)}
            disabled={currentIndex === 0}
            className={`flex-1 py-2.5 px-3 bg-zinc-900 border hover:border-indigo-500/40 text-zinc-400 hover:text-indigo-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none ${sport === 'ucl' ? 'border-blue-900/30 hover:border-blue-500/40 hover:text-blue-400' : sport === 'tennis' ? 'border-orange-900/30 hover:border-orange-500/40 hover:text-orange-400' : 'border-zinc-800'}`}
          >
            <ChevronRight className="w-4 h-4" />
            משחק קודם
          </button>
          
          <button
            type="button"
            onClick={() => handleIndexChange(currentIndex + 1, 1)}
            disabled={currentIndex === matches.length - 1}
            className={`flex-1 py-2.5 px-3 border font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed select-none ${
              sport === 'ucl' ? 'bg-blue-600/10 border-blue-500/30 hover:bg-blue-600/20 text-blue-300' : sport === 'tennis' ? 'bg-orange-600/10 border-orange-500/30 hover:bg-orange-600/20 text-orange-300' : 'bg-indigo-600/10 border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300'
            }`}
          >
            משחק הבא
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {liveIndex !== -1 && currentIndex !== liveIndex && (
          <button
            type="button"
            onClick={() => {
              setDirection(liveIndex > currentIndex ? 1 : -1);
              setCurrentIndex(liveIndex);
            }}
            className="w-full mt-3 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md animate-pulse active:scale-95 select-none"
          >
            <Radio className="w-4.5 h-4.5" />
            <span>חזור למשחק הפעיל (לייב) 📺</span>
          </button>
        )}

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
