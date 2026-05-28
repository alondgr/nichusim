'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

interface Props {
  onSignupComplete: () => void;
}

export default function SignupForm({ onSignupComplete }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual authentication logic
    onSignupComplete();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-6 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col p-6 sm:p-8 rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-evileye-600/30 animate-[float_8s_ease-in-out_infinite] shadow-2xl shadow-blue-900/20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-2xl mb-2">
            <UserPlus className="w-8 h-8 text-evileye-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            הצטרף לזירה
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            צור משתמש כדי להתחיל לתת נאחס
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="name"
                required
                placeholder="שם מלא"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-slate-100 rounded-xl block pr-11 p-3.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Nickname Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="nickname"
                required
                placeholder="כינוי בחבר'ה"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-slate-100 rounded-xl block pr-11 p-3.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="אימייל"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-slate-100 rounded-xl block pr-11 p-3.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 outline-none"
                dir="ltr"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="סיסמה"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-slate-100 rounded-xl block pr-11 p-3.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 outline-none"
                dir="ltr"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-evileye-500 rounded-xl transition-all duration-300 group-hover:scale-[1.02]" />
              <div className="absolute -inset-1 bg-evileye-500/50 blur-lg opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative flex items-center justify-center py-3.5 text-lg font-bold text-white bg-transparent">
                הירשם עכשיו
              </div>
            </button>
          </div>
          
          <p className="text-center text-sm text-slate-500 mt-4">
            יש לך כבר חשבון? <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">התחבר</button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
