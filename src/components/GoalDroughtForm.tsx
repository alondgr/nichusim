'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Target } from 'lucide-react';
import { TOP_SCORERS } from '@/data/worldCupData';

export default function GoalDroughtForm() {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlayer) {
      setSubmitted(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (submitted) {
    const player = TOP_SCORERS.find(p => p.id === selectedPlayer);
    return (
      <div className="w-full max-w-md p-4 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-6 bg-orange-500/20 rounded-full border border-orange-500/50"
        >
          <span className="text-5xl">👟</span>
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100">הנאחס ננעל!</h2>
        <p className="text-slate-400 text-lg">
          ההימור שלך ש{player?.name} ({player?.flag}) ישכח איך לכבוש נרשם במערכת. 
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
        className="flex flex-col p-6 sm:p-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-orange-600/30 animate-[float_8s_ease-in-out_infinite_reverse] shadow-2xl shadow-orange-900/20"
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
          <div className="flex flex-col space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
            <label className="text-slate-300 font-medium px-2">שחקן:</label>
            <div className="relative">
              <select
                required
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                className="w-full appearance-none bg-zinc-950 border border-zinc-700 text-slate-100 rounded-xl p-4 pr-4 pl-10 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-lg"
                dir="rtl"
              >
                <option value="" disabled>בחר שחקן...</option>
                {TOP_SCORERS.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name} {player.flag} ({player.team})
                  </option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="text-zinc-500">▼</span>
              </div>
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
