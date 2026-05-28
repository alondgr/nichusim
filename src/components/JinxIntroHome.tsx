'use client';

import { motion, Variants } from 'framer-motion';
import { Eye, Flame, AlertOctagon } from 'lucide-react';

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
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-blue-900/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-indigo-900/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-md w-full flex flex-col space-y-6 sm:space-y-8 z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-blue-600/10 rounded-2xl mb-1 sm:mb-2 animate-float">
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-evileye-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight bg-clip-text text-transparent bg-gradient-to-l from-blue-300 via-blue-500 to-indigo-400">
            מונדיאל 2026: <br /> זירת הניחוסים הרשמית לחברים
          </h1>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            במקום להמר כמו כולם ולצאת מופסדים, הגיע הזמן להנדס את הנאחס. האפליקציה שהופכת את העין הרע של החבר&apos;ה לשיטה מדעית.
          </p>
        </motion.div>

        {/* Features Stagger */}
        <div className="space-y-3 sm:space-y-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-evileye-600/30 animate-[float_6s_ease-in-out_infinite_reverse]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl sm:text-2xl shrink-0">🎈</span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">הבלון שיתפוצץ</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              בחירת הנבחרת שתקרוס ברגע האמת ותיקח את האליפות של כולם איתה.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-evileye-600/30 animate-float"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl sm:text-2xl shrink-0">👟</span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">נאחס הבצורת</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              סימון החלוץ שלא יראה שער אחד כל הטורניר. כל החמצה שלו שווה לכם נקודות.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col p-5 sm:p-6 rounded-3xl bg-blue-900/10 backdrop-blur-xl border border-blue-500/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-500 to-transparent opacity-50" />
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-blue-100 leading-tight">יריית הפתיחה: מקסיקו - דרום אפריקה</h3>
            </div>
            <p className="text-xs sm:text-sm text-blue-200/80">
              נעלו את הניחוס המדויק שלכם לתוצאת משחק הפתיחה לפני ה-11 ביוני!
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-evileye-500 rounded-2xl transition-all duration-300 group-hover:scale-[1.02]" />
            <div className="absolute -inset-1 bg-evileye-500/50 blur-lg opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center justify-center gap-2 py-3.5 sm:py-4 text-lg sm:text-xl font-bold text-white bg-transparent">
              <span>התחל לפתוח עיניים</span>
              <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform">🧿</span>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
