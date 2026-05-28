'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Bomb, Trophy } from 'lucide-react';
import { TEAMS } from '@/data/worldCupData';

export default function FlopTeamForm() {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam) {
      setSubmitted(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  if (submitted) {
    const team = TEAMS.find(t => t.id === selectedTeam);
    return (
      <div className="w-full max-w-md p-4 sm:p-6 z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="p-6 bg-red-500/20 rounded-full border border-red-500/50"
        >
          <Bomb className="w-16 h-16 text-red-500" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100">הנאחס ננעל!</h2>
        <p className="text-slate-400 text-lg">
          ההימור שלך ש{team?.name} {team?.flag} תעוף מוקדם נרשם במערכת. 
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
        className="flex flex-col p-6 sm:p-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-red-600/30 animate-[float_8s_ease-in-out_infinite] shadow-2xl shadow-red-900/20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-red-600/10 rounded-2xl mb-2">
            <span className="text-3xl">🎈</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            הבלון שיתפוצץ
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            בחר את הנבחרת המפוארת שתקרוס ברגע האמת
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
            <label className="text-slate-300 font-medium px-2">נבחרת:</label>
            <div className="relative">
              <select
                required
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full appearance-none bg-zinc-950 border border-zinc-700 text-slate-100 rounded-xl p-4 pr-4 pl-10 focus:ring-2 focus:ring-red-500 outline-none transition-all text-lg"
                dir="rtl"
              >
                <option value="" disabled>בחר נבחרת...</option>
                {TEAMS.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.flag} {team.name}
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
              disabled={!selectedTeam}
              className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-red-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent">
                הטל קללה 🎈
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
