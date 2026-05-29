'use client';

import { motion, Variants } from 'framer-motion';
import { Trophy, Flame, Medal } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function JinxIntroHome({ onStart }: Props) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-amber-900/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-indigo-900/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-md w-full flex flex-col space-y-6 sm:space-y-8 z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-amber-500/10 rounded-2xl mb-1 sm:mb-2 border border-amber-500/20 animate-float">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight bg-clip-text text-transparent bg-gradient-to-l from-amber-200 via-amber-400 to-indigo-300">
            מונדיאל 2026: <br /> זירת הניחושים הרשמית
          </h1>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            בואו להוכיח מי החבר שבאמת מבין כדורגל. האפליקציה שהופכת את הניחושים של החבר&apos;ה למשחק ניבוי מדעי ותחרותי! 🔮
          </p>
        </motion.div>

        {/* Features Stagger */}
        <div className="space-y-3 sm:space-y-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 animate-[float_6s_ease-in-out_infinite_reverse]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl sm:text-2xl shrink-0">🏆</span>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 leading-tight">הנבחרת הזוכה במונדיאל</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              בחרו את הנבחרת שתניף את גביע העולם ותוכתר כאלופת העולם הגדולה של מונדיאל 2026.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-amber-500/20 animate-float"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl sm:text-2xl shrink-0">👟</span>
              <h3 className="text-lg sm:text-xl font-bold text-amber-400 leading-tight">מלך השערים (נעל הזהב)</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              סמנו את השחקן שיסיים בראש טבלת הכובשים של הטורניר ויזכה בנעל הזהב היוקרתית.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-indigo-900/15 backdrop-blur-xl border border-indigo-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-indigo-500 to-transparent opacity-50" />
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-indigo-200 leading-tight">משחקי שלב הבתים של מונדיאל 2026</h3>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200/80">
              נחשו את תוצאות שלב הבתים, הממוינות כרונולוגית בדיוק לפי הלו"ז הרשמי של מונדיאל 2026!
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="pt-2 sm:pt-6">
          <button
            onClick={onStart}
            className="w-full relative group overflow-hidden rounded-2xl animate-float"
            style={{ animationDelay: '1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-indigo-600 rounded-2xl transition-all duration-300 group-hover:scale-[1.02]" />
            <div className="absolute -inset-1 bg-amber-500/40 blur-lg opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center justify-center gap-2 py-3.5 sm:py-4 text-lg sm:text-xl font-bold text-white bg-transparent">
              <span>התחל לנחש מונדיאל</span>
              <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform">🔮</span>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
