import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { X, Save, User as UserIcon } from 'lucide-react';

interface ChangeNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangeNameModal({ isOpen, onClose }: ChangeNameModalProps) {
  const { user } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [isOpen, user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setIsSaving(true);
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim()
      });
      onClose();
    } catch (error) {
      console.error('Error updating name:', error);
      alert('שגיאה בשמירת השם. נסה שוב.');
    } finally {
      setIsSaving(false);
    }
  };

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
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 w-full max-w-sm relative shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          {/* Background Glow */}
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full p-1.5 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3">
              <UserIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-black text-white">איך לקרוא לך?</h2>
            <p className="text-xs text-zinc-400 mt-1">
              השם שיופיע בטבלת המובילים
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-400">שם פרטי</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="הכנס שם פרטי"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-400">שם משפחה (אופציונלי)</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="הכנס שם משפחה"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving || !firstName.trim()}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'שומר...' : 'שמור שם'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
