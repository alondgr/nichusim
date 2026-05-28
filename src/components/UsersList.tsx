'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';

interface SafeUser {
  id: string;
  name: string;
  imageUrl: string;
  username: string;
  createdAt: number;
}

export default function UsersList() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error('Error fetching active group users:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (error) return null; // Gracefully hide on error

  return (
    <div className="w-full max-w-xl p-2 sm:p-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col p-4 sm:p-6 rounded-3xl sm:rounded-[2rem] bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/20 shadow-xl shadow-indigo-950/20"
      >
        {/* Title Block */}
        <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <Users className="w-4 h-4 sm:w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-100">
              חברי פרלמנט הנאחס
            </h3>
          </div>
          {!loading && users.length > 0 && (
            <span className="text-[10px] sm:text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {users.length} משתתפים
            </span>
          )}
        </div>

        {/* Users Horizontal List */}
        <div className="flex overflow-x-auto gap-3 py-1 pr-0.5 pl-0.5 scrollbar-none select-none scroll-smooth" dir="rtl">
          {loading ? (
            // Loading Skeletons
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center gap-2.5 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-2.5 w-40 animate-pulse"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex-shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-3 bg-zinc-800 rounded w-4/5" />
                  <div className="h-2.5 bg-zinc-850 rounded w-3/5" />
                </div>
              </div>
            ))
          ) : users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 flex items-center gap-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-indigo-500/30 rounded-2xl p-2.5 pr-3 pl-3 w-auto min-w-[130px] max-w-[200px] transition-colors cursor-default"
              >
                {/* Profile Photo */}
                <div className="relative w-8.5 h-8.5 rounded-full flex-shrink-0 overflow-hidden border border-indigo-500/35 bg-zinc-900 shadow-md">
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60';
                    }}
                  />
                </div>

                {/* User details */}
                <div className="flex flex-col text-right min-w-0">
                  <span className="text-xs font-bold text-slate-200 truncate leading-tight">
                    {user.name}
                  </span>
                  {user.username ? (
                    <span className="text-[9px] text-zinc-500 truncate mt-0.5">
                      @{user.username}
                    </span>
                  ) : (
                    <span className="text-[9px] text-indigo-400/70 truncate flex items-center gap-0.5 mt-0.5 font-semibold">
                      <Sparkles className="w-2 h-2" />
                      חבר פעיל
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center py-2 text-zinc-500 text-xs sm:text-sm">
              ממתינים לחברי קבוצה נוספים שיצטרפו... 🏆
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
