import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Activity } from 'lucide-react';

interface MatchPredictionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: any;
  sport: 'football' | 'tennis' | 'ucl';
}

export default function MatchPredictionsModal({ isOpen, onClose, match, sport }: MatchPredictionsModalProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setUsers(data.users || []);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [isOpen]);

  const predictionsKey = sport === 'football' ? 'fPreds' : sport === 'ucl' ? 'uPreds' : 'tPreds';

  const userGuesses = useMemo(() => {
    if (!match) return [];
    
    return users
      .filter(u => {
        const p = u.predictions?.[predictionsKey]?.[match.id];
        return p && p.homeScore !== '' && p.awayScore !== '';
      })
      .map(u => ({
        user: u,
        guess: u.predictions[predictionsKey][match.id]
      }));
  }, [users, match, predictionsKey]);

  if (!isOpen || !match) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full p-1.5 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6 shrink-0 mt-2">
            <div className="mx-auto w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-black text-white">ניחושי הקבוצה</h2>
            
            <div className="flex items-center justify-center gap-3 mt-3 px-4 py-2 bg-zinc-900/50 rounded-xl border border-zinc-800/80 mx-auto w-max">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{match.home.flag || match.home.logo && <img src={match.home.logo} alt="" className="w-5 h-5 object-contain" />}</span>
                <span className="text-xs font-bold">{match.home.name}</span>
              </div>
              <span className="text-zinc-600 font-black">-</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">{match.away.name}</span>
                <span className="text-sm">{match.away.flag || match.away.logo && <img src={match.away.logo} alt="" className="w-5 h-5 object-contain" />}</span>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto pr-2 space-y-2 relative z-10 custom-scrollbar flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
                <span className="text-xs font-bold">טוען ניחושים...</span>
              </div>
            ) : userGuesses.length === 0 ? (
              <div className="text-center text-zinc-500 text-sm py-8 font-medium">
                אף אחד עוד לא ניחש את המשחק הזה!
              </div>
            ) : (
              userGuesses.map(({ user, guess }, idx) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full flex flex-col p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl"
                >
                  <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={user.imageUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full bg-zinc-800 object-cover ring-2 ring-zinc-900"
                        />
                        <span className="font-bold text-sm text-white truncate">{user.name}</span>
                      </div>
                      
                      <div className="flex-shrink-0 flex items-center justify-center bg-zinc-950 px-4 py-1.5 rounded-xl border border-zinc-800 shadow-inner w-20">
                        <span className="text-base font-black text-indigo-400">{guess.homeScore}</span>
                        <span className="text-zinc-600 font-bold mx-1">:</span>
                        <span className="text-base font-black text-indigo-400">{guess.awayScore}</span>
                      </div>
                    </div>

                    {/* Prop Bets Section */}
                    {match.prop_bets && guess.propBets && Object.keys(guess.propBets).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/50 grid grid-cols-1 gap-2">
                        {match.prop_bets.map((prop: any) => {
                           if (!guess.propBets[prop.id]) return null;
                           return (
                             <div key={prop.id} className="flex justify-between items-center text-xs">
                               <span className="text-zinc-500 truncate pl-2">{prop.question}</span>
                               <span className="font-bold text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded-md shrink-0">
                                 {guess.propBets[prop.id]}
                               </span>
                             </div>
                           );
                        })}
                      </div>
                    )}

                    {/* Legacy Single Prop Bet */}
                    {match.has_prop_bet && guess.selectedProp && !match.prop_bets && (
                      <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-zinc-800/50">
                        <span className="text-zinc-500 truncate pl-2">{match.prop_question}</span>
                        <span className="font-bold text-zinc-300 bg-zinc-800/50 px-2 py-1 rounded-md shrink-0">
                          {guess.selectedProp}
                        </span>
                      </div>
                    )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
