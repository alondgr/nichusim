import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, CalendarClock, Lock } from 'lucide-react';
import { UCL_MATCHES, TENNIS_MATCHES, getMatchStatus, calculateMatchPoints } from '@/data/worldCupData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
  if (!isOpen || !user) return null;

  const uPreds = user.predictions?.uPreds || {};
  const tPreds = user.predictions?.tPreds || {};
  const now = Date.now();

  const renderMatch = (sport: 'ucl' | 'tennis', match: any, preds: any) => {
    const p = preds[match.id];
    if (!p) return null; // Don't render matches the user hasn't predicted yet
    
    const status = getMatchStatus(match, now);
    
    const hasPredictedScore = p.homeScore !== '' && p.awayScore !== '';
    const hasActualScore = match.actualHomeScore !== undefined && match.actualAwayScore !== undefined;

    const points = hasPredictedScore && hasActualScore 
      ? calculateMatchPoints(sport, p.homeScore, p.awayScore, match.actualHomeScore, match.actualAwayScore, p.propBets || p.selectedProp, match.actualPropBets || {})
      : 0;

    const isUpcoming = status === 'upcoming';
    const displayHomeScore = isUpcoming ? '?' : (hasPredictedScore ? p.homeScore : '-');
    const displayAwayScore = isUpcoming ? '?' : (hasPredictedScore ? p.awayScore : '-');

    return (
      <div key={match.id} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
            {status === 'finished' ? 'הסתיים' : status === 'live' ? 'חי' : 'מתקרב'}
          </span>
          {status === 'finished' && hasActualScore && (
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              +{points} נק'
            </span>
          )}
          {isUpcoming && (
            <span className="flex items-center gap-1 text-[10px] text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded-full">
              <Lock className="w-3 h-3" />
              <span>חסוי</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between px-2 mb-4">
          <div className="flex flex-col items-center gap-1 w-1/3">
            <span className="text-xl">{match.home.flag || match.home.logo && <img src={match.home.logo} alt={match.home.name} className="w-8 h-8 object-contain" />}</span>
            <span className="text-[10px] font-bold text-center leading-tight truncate w-full">{match.home.name}</span>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3 px-2">
            <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border w-full shadow-inner ${isUpcoming ? 'bg-zinc-900 border-zinc-700/50 opacity-80' : 'bg-zinc-950 border-zinc-800'}`}>
              <span className={`text-lg font-black ${isUpcoming ? 'text-zinc-500' : 'text-white'}`}>{displayHomeScore}</span>
              <span className="text-zinc-600 font-bold">:</span>
              <span className={`text-lg font-black ${isUpcoming ? 'text-zinc-500' : 'text-white'}`}>{displayAwayScore}</span>
            </div>
            {hasActualScore && (
              <div className="text-[9px] text-zinc-500 mt-1">
                תוצאה: {match.actualHomeScore}:{match.actualAwayScore}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 w-1/3">
            <span className="text-xl">{match.away.flag || match.away.logo && <img src={match.away.logo} alt={match.away.name} className="w-8 h-8 object-contain" />}</span>
            <span className="text-[10px] font-bold text-center leading-tight truncate w-full">{match.away.name}</span>
          </div>
        </div>

        {/* Prop Bets section */}
        {match.has_prop_bet && match.prop_bets && p?.propBets && (
          <div className="mt-3 space-y-1 border-t border-zinc-800/50 pt-3">
            {match.prop_bets.map((prop: any) => {
              const userGuess = p.propBets[prop.id];
              const actualAns = match.actualPropBets?.[prop.id];
              if (!userGuess) return null;
              
              const isCorrect = actualAns && String(actualAns) === String(userGuess);
              
              return (
                <div key={prop.id} className="flex flex-col bg-zinc-950/50 rounded-lg p-2 border border-zinc-800/30">
                  <span className="text-[9px] text-zinc-500 mb-0.5">{prop.question}</span>
                  <div className="flex items-center justify-between">
                    {isUpcoming ? (
                      <span className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> מוסתר
                      </span>
                    ) : (
                      <>
                        <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-zinc-300'}`}>
                          {userGuess}
                        </span>
                        {actualAns && (
                          <span className="text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                            בפועל: {actualAns}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          {/* Header */}
          <div className="relative bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col items-center shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700 rounded-full p-1.5 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full bg-zinc-800 object-cover ring-4 ring-zinc-950 shadow-xl mb-3 z-10"
            />
            <h2 className="text-xl font-black text-white">{user.name}</h2>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mt-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>סה"כ נקודות: {user.score}</span>
            </div>
          </div>

          <div className="overflow-y-auto p-4 custom-scrollbar">
            
            {/* UCL Matches */}
            {UCL_MATCHES.some(m => uPreds[m.id]) && (
              <>
                <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4" />
                  <span>ליגת האלופות (גמר)</span>
                </h3>
                {UCL_MATCHES.map(m => renderMatch('ucl', m, uPreds))}
              </>
            )}

            {/* Tennis Matches */}
            {TENNIS_MATCHES.some(m => tPreds[m.id]) && (
              <>
                <h3 className="text-sm font-bold text-zinc-400 mt-6 mb-3 flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4" />
                  <span>טניס - רולאן גארוס</span>
                </h3>
                {TENNIS_MATCHES.map(m => renderMatch('tennis', m, tPreds))}
              </>
            )}
            
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
