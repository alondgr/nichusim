import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { X, RefreshCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface CustomAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_STYLE = 'fun-emoji';
const GRID_SIZE = 9;

export default function CustomAvatarModal({ isOpen, onClose }: CustomAvatarModalProps) {
  const { user } = useUser();
  const [seeds, setSeeds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate new random seeds
  const generateNewAvatars = () => {
    setIsGenerating(true);
    const newSeeds = Array.from({ length: GRID_SIZE }, () => Math.random().toString(36).substring(2, 9));
    setSeeds(newSeeds);
    setSelectedSeed(null);
    setSuccess(false);
    setTimeout(() => setIsGenerating(false), 500);
  };

  useEffect(() => {
    if (isOpen && seeds.length === 0) {
      generateNewAvatars();
    }
  }, [isOpen]);

  const handleSelectAvatar = async (seed: string) => {
    if (!user) return;
    
    try {
      setSelectedSeed(seed);
      setIsUploading(true);
      
      // Fetch the PNG version through our proxy API
      const response = await fetch(`/api/avatar?seed=${seed}&style=${AVATAR_STYLE}`);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const file = new File([blob], `avatar-${seed}.png`, { type: 'image/png' });

      // Upload to Clerk
      await user.setProfileImage({ file });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('אירעה שגיאה בעת שמירת האווטאר.');
    } finally {
      setIsUploading(false);
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
        >
          {/* Background Glow */}
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full p-1.5 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl font-black text-white">בחר אווטאר מגניב</h2>
            <p className="text-xs text-zinc-400 mt-1">
              מופק בעזרת בינה מלאכותית, פשוט תבחר אחד!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 relative">
            {isUploading && (
              <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                {success ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                    <span className="text-emerald-400 font-bold text-sm">התמונה עודכנה!</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
                    <span className="text-indigo-400 font-bold text-sm animate-pulse">שומר לפרופיל שלך...</span>
                  </div>
                )}
              </div>
            )}
            
            {seeds.map((seed, i) => (
              <motion.button
                key={seed}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                disabled={isUploading}
                onClick={() => handleSelectAvatar(seed)}
                className={`aspect-square rounded-2xl p-2 transition-all ${
                  selectedSeed === seed 
                    ? 'bg-indigo-600 border-2 border-indigo-400 scale-105'
                    : 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:scale-105 active:scale-95'
                }`}
              >
                <img
                  src={`https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${seed}&backgroundColor=transparent`}
                  alt="Avatar option"
                  className={`w-full h-full object-contain transition-opacity ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                />
              </motion.button>
            ))}
          </div>

          <button
            onClick={generateNewAvatars}
            disabled={isUploading || isGenerating}
            className="w-full py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            הגרל פרצופים חדשים
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
