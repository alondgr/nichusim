'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, ChevronDown, Star } from 'lucide-react';

export default function ScoringRules() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md p-2 z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 shadow-lg shadow-zinc-950/50 overflow-hidden"
      >
        {/* Header Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3.5 text-right outline-none select-none transition-colors hover:bg-zinc-900/20"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Award className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black text-slate-200">
                🏆 שיטת הניקוד הרשמית
              </span>
              <span className="text-[9px] text-zinc-500 font-bold mt-0.5">
                איך צוברים נקודות בטבלה? לחצו לפרטים
              </span>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-250 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-zinc-900/60 bg-zinc-950/40"
            >
              <div className="p-4 space-y-3.5 text-xs sm:text-sm leading-relaxed" dir="rtl">
                
                {/* Major Predictions */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block px-1">ניחושים ארוכי טווח</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Winning Team */}
                    <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-xl flex flex-col items-center text-center space-y-1">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-slate-200 text-xs">נבחרת אלופה</span>
                      <span className="text-amber-400 font-black text-base mt-1">10 נק&apos;</span>
                    </div>

                    {/* Top Scorer */}
                    <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-xl flex flex-col items-center text-center space-y-1">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-slate-200 text-xs">מלך השערים</span>
                      <span className="text-amber-400 font-black text-base mt-1">10 נק&apos;</span>
                    </div>
                  </div>
                </div>

                {/* Match Predictions */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block px-1">ניקוד לשלב הבתים</span>
                  
                  <div className="space-y-2">
                    {/* Exact Score */}
                    <div className="flex items-center justify-between p-2.5 bg-zinc-900/30 border border-zinc-850 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">🎯</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200 text-xs">תוצאה בול (מדויקת)</span>
                          <span className="text-[9px] text-zinc-500 mt-0.5">ניחוש של התוצאה המדויקת של המשחק</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-black text-sm bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/10">3 נק&apos;</span>
                    </div>

                    {/* Outcome Direction */}
                    <div className="flex items-center justify-between p-2.5 bg-zinc-900/30 border border-zinc-850 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">🧭</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200 text-xs">כיוון (מנצחת או תיקו)</span>
                          <span className="text-[9px] text-zinc-500 mt-0.5">ניחוש נכון של זהות המנצחת או תוצאת תיקו</span>
                        </div>
                      </div>
                      <span className="text-indigo-400 font-black text-sm bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/10">1 נק&apos;</span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="text-[10px] text-zinc-500 bg-zinc-900/20 p-2.5 rounded-lg border border-zinc-850 text-center font-medium">
                  💡 שימו לב: אין כפל ניקוד על משחק (תוצאה מדויקת מעניקה 3 נקודות סך הכל).
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
