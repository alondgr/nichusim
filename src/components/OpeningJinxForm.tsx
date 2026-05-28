'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Target, Trophy } from 'lucide-react';

export default function OpeningJinxForm() {
  const [mexicoScore, setMexicoScore] = useState<number | ''>('');
  const [saScore, setSaScore] = useState<number | ''>('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load scores from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedMex = localStorage.getItem('nichusim_opening_mexico_score');
    const savedSa = localStorage.getItem('nichusim_opening_sa_score');
    const savedSub = localStorage.getItem('nichusim_opening_submitted');
    
    if (savedMex !== null) setMexicoScore(savedMex === '' ? '' : Number(savedMex));
    if (savedSa !== null) setSaScore(savedSa === '' ? '' : Number(savedSa));
    if (savedSub === 'true') setSubmitted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mexicoScore !== '' && saScore !== '') {
      setSubmitted(true);
      localStorage.setItem('nichusim_opening_mexico_score', String(mexicoScore));
      localStorage.setItem('nichusim_opening_sa_score', String(saScore));
      localStorage.setItem('nichusim_opening_submitted', 'true');
    }
  };

  const handleUnlock = () => {
    setSubmitted(false);
    localStorage.removeItem('nichusim_opening_submitted');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-md p-2 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-4 sm:p-8 rounded-3xl sm:rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-evileye-600/30 animate-[float_8s_ease-in-out_infinite_reverse] shadow-2xl shadow-blue-900/20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-2">
            {submitted ? (
              <Trophy className="w-8 h-8 text-indigo-400" />
            ) : (
              <Target className="w-8 h-8 text-red-500" />
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            משחק הפתיחה
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {submitted 
              ? 'הניחוס שלך למשחק הפתיחה ננעל בהצלחה! 🔒'
              : 'מקסיקו נגד דרום אפריקה. נאחס את התוצאה המדויקת.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            
            {/* Team 1: Mexico */}
            <div className="flex flex-col items-center space-y-3">
              <img
                src="https://flagcdn.com/w80/mx.png"
                alt="מקסיקו"
                className="w-14 h-9.5 object-cover rounded shadow-md border border-zinc-800 bg-zinc-900 flex-shrink-0"
              />
              <span className="font-bold text-slate-200">מקסיקו</span>
              <input
                type="number"
                min="0"
                max="10"
                required
                disabled={submitted}
                value={mexicoScore}
                onChange={(e) => setMexicoScore(e.target.value === '' ? '' : Math.min(10, Math.max(0, Number(e.target.value))))}
                className="w-16 h-16 text-center text-2xl font-bold bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-evileye-500 outline-none text-slate-100 disabled:opacity-90 disabled:text-indigo-400 disabled:border-indigo-500/30"
                dir="ltr"
              />
            </div>

            <div className="text-2xl font-black text-slate-600 mb-6">-</div>

            {/* Team 2: South Africa */}
            <div className="flex flex-col items-center space-y-3">
              <img
                src="https://flagcdn.com/w80/za.png"
                alt="דרום אפריקה"
                className="w-14 h-9.5 object-cover rounded shadow-md border border-zinc-800 bg-zinc-900 flex-shrink-0"
              />
              <span className="font-bold text-slate-200">ד. אפריקה</span>
              <input
                type="number"
                min="0"
                max="10"
                required
                disabled={submitted}
                value={saScore}
                onChange={(e) => setSaScore(e.target.value === '' ? '' : Math.min(10, Math.max(0, Number(e.target.value))))}
                className="w-16 h-16 text-center text-2xl font-bold bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-evileye-500 outline-none text-slate-100 disabled:opacity-90 disabled:text-indigo-400 disabled:border-indigo-500/30"
                dir="ltr"
              />
            </div>
          </div>

          <div className="pt-2">
            {submitted ? (
              <button
                type="button"
                onClick={handleUnlock}
                className="w-full relative group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-bold rounded-xl py-3.5 text-base flex items-center justify-center gap-1.5 transition-colors shadow-lg active:scale-98"
              >
                פתח נעילה לעריכה 🔓
              </button>
            ) : (
              <button
                type="submit"
                disabled={mexicoScore === '' || saScore === ''}
                className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
                <div className="absolute -inset-1 bg-red-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
                <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent">
                  נעל תוצאה 🎯
                </div>
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
