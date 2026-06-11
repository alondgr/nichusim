'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRIVIA = [
  '"כדורגל משחקים 90 דקות ובסוף הגרמנים מנצחים." - גארי ליניקר',
  '"הייתי אומר שפלה היה שחקן נהדר, אבל מרדונה היה פשוט אלוהי." - זינדין זידאן',
  'הידעת? מונדיאל 2026 יהיה הראשון אי פעם שיארח 48 נבחרות!',
  '"אני לא אלוהים, אני רק כדורגלן." - דייגו ארמנדו מרדונה',
  'הידעת? ז\'יסט פונטיין הצרפתי מחזיק בשיא הכיבושים למונדיאל בודד - 13 שערים ב-1958!',
  'הידעת? ברזיל היא הנבחרת היחידה שהשתתפה בכל מונדיאל אי פעם, והיא גם שיאנית הזכיות (5).',
  'הידעת? גביע העולם המקורי ("ז\'יל רימה") נגנב ב-1983 בברזיל ומעולם לא נמצא!',
  '"כדורגל הוא לא עניין של חיים ומוות, הוא הרבה יותר מזה." - ביל שאנקלי',
  '"בכדורגל, הכל מסובך כשיש לך את הכדור." - יוהאן קרויף',
  'הידעת? מונדיאל 2026 נערך ב-16 ערים שונות על פני שלוש מדינות: ארה"ב, מקסיקו וקנדה.',
];

export default function TriviaFooter() {
  const [triviaIndex, setTriviaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTriviaIndex((prev) => (prev + 1) % TRIVIA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 pt-6 pb-6 border-t border-zinc-800/50 w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-amber-400">💡</span>
        <span className="text-xs font-bold text-amber-500/80 tracking-wider">רגע של כדורגל - הידעת?</span>
      </div>
      <div className="h-16 flex items-center justify-center text-center px-4 max-w-lg w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={triviaIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-zinc-400 font-medium italic"
          >
            {TRIVIA[triviaIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
