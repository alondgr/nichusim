'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Target, Trophy } from 'lucide-react';

export default function OpeningJinxForm() {
  const [mexicoScore, setMexicoScore] = useState<number | ''>('');
  const [saScore, setSaScore] = useState<number | ''>('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mexicoScore !== '' && saScore !== '') {
      setSubmitted(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md p-4 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-6 bg-evileye-500/20 rounded-full border border-evileye-500/50"
        >
          <Trophy className="w-16 h-16 text-evileye-500" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100">הניחוס ננעל!</h2>
        <p className="text-slate-400 text-lg">
          ההימור שלך על {mexicoScore} - {saScore} נרשם במערכת. 
          <br /> נתראה ב-11 ביוני!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-6 sm:p-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-evileye-600/30 animate-[float_8s_ease-in-out_infinite_reverse] shadow-2xl shadow-blue-900/20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-2">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            משחק הפתיחה
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            מקסיקו נגד דרום אפריקה. נאחס את התוצאה המדויקת.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            
            {/* Team 1: Mexico */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-800/30 border border-green-600/50 flex items-center justify-center text-xl shadow-lg">
                🇲🇽
              </div>
              <span className="font-bold text-slate-200">מקסיקו</span>
              <input
                type="number"
                min="0"
                max="10"
                required
                value={mexicoScore}
                onChange={(e) => setMexicoScore(e.target.value === '' ? '' : Math.min(10, Math.max(0, Number(e.target.value))))}
                className="w-16 h-16 text-center text-2xl font-bold bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-evileye-500 outline-none text-slate-100"
                dir="ltr"
              />
            </div>

            <div className="text-2xl font-black text-slate-600 mb-6">-</div>

            {/* Team 2: South Africa */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-600/30 border border-yellow-500/50 flex items-center justify-center text-xl shadow-lg">
                🇿🇦
              </div>
              <span className="font-bold text-slate-200">ד. אפריקה</span>
              <input
                type="number"
                min="0"
                max="10"
                required
                value={saScore}
                onChange={(e) => setSaScore(e.target.value === '' ? '' : Math.min(10, Math.max(0, Number(e.target.value))))}
                className="w-16 h-16 text-center text-2xl font-bold bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-evileye-500 outline-none text-slate-100"
                dir="ltr"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-red-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent">
                נעל תוצאה 🎯
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
