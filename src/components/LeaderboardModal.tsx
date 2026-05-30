import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal } from 'lucide-react';
import { calculateTotalScore } from '@/data/worldCupData';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
  onUserSelect: (user: any) => void;
  sport: 'football' | 'tennis' | 'ucl';
}

export default function LeaderboardModal({ isOpen, onClose, users, onUserSelect, sport }: LeaderboardModalProps) {
  // Sort users by their calculated score
  const sortedUsers = useMemo(() => {
    return [...users]
      .map(u => ({ ...u, score: calculateTotalScore(u.predictions, sport) }))
      .sort((a, b) => b.score - a.score);
  }, [users, sport]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          {/* Background Glow */}
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-amber-600/10 blur-[80px] rounded-full pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full p-1.5 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6 shrink-0">
            <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-xl font-black text-white">טבלת המובילים</h2>
            <p className="text-xs text-zinc-400 mt-1">
              בחר משתמש כדי לראות את הניחושים שלו
            </p>
          </div>

          <div className="overflow-y-auto pr-2 space-y-2 relative z-10 custom-scrollbar">
            {sortedUsers.map((user, index) => (
              <motion.button
                key={user.id}
                onClick={() => onUserSelect(user)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full flex items-center p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800/80 transition-all text-right group"
              >
                <div className="flex-shrink-0 w-8 text-center ml-2">
                  {index === 0 ? <Medal className="w-6 h-6 text-amber-400 mx-auto" /> :
                   index === 1 ? <Medal className="w-6 h-6 text-slate-300 mx-auto" /> :
                   index === 2 ? <Medal className="w-6 h-6 text-amber-700 mx-auto" /> :
                   <span className="text-sm font-bold text-zinc-500">{index + 1}</span>}
                </div>
                
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full bg-zinc-800 object-cover ring-2 ring-zinc-900 group-hover:ring-indigo-500 transition-all"
                />
                
                <div className="mr-3 flex-1 min-w-0">
                  <div className="font-bold text-sm text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-zinc-500 truncate">הצטרף לאחרונה</div>
                </div>
                
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-zinc-950/50 rounded-xl px-3 py-1 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">נקודות</span>
                  <span className="text-sm font-black text-amber-400">{user.score}</span>
                </div>
              </motion.button>
            ))}
            {sortedUsers.length === 0 && (
              <div className="text-center text-zinc-500 text-sm py-8">אין משתמשים בקבוצה...</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
