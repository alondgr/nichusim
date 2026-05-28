'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

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
    <div className="w-full max-w-md p-2 z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/25 shadow-lg shadow-indigo-950/20"
      >
        {/* Left Side: Hebrew Title & Info */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg flex-shrink-0">
            <Users className="w-3.5 h-3.5 sm:w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex flex-col text-right min-w-0">
            <span className="text-[11px] sm:text-xs font-black text-slate-200 truncate">
              חברי פרלמנט הנאחס
            </span>
            <span className="text-[9px] text-zinc-500 font-bold mt-0.5">
              {loading ? 'טוען חברים...' : `${users.length} רשומים בקבוצה`}
            </span>
          </div>
        </div>

        {/* Right Side: Ultra-compact Facepile */}
        <div className="flex items-center flex-shrink-0">
          {loading ? (
            // Mini Skeleton Loader
            <div className="flex -space-x-1.5 space-x-reverse">
              <div className="w-6 h-6 rounded-full bg-zinc-800 animate-pulse border border-zinc-950" />
              <div className="w-6 h-6 rounded-full bg-zinc-850 animate-pulse border border-zinc-950" />
              <div className="w-6 h-6 rounded-full bg-zinc-900 animate-pulse border border-zinc-950" />
            </div>
          ) : users.length > 0 ? (
            <div className="flex -space-x-1.5 space-x-reverse overflow-hidden">
              {users.slice(0, 4).map((user) => (
                <img
                  key={user.id}
                  src={user.imageUrl}
                  alt={user.name}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-950 object-cover bg-zinc-900"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60';
                  }}
                />
              ))}
              {users.length > 4 && (
                <div className="inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-zinc-950 bg-indigo-950 border border-indigo-500/30 text-[8px] font-black text-indigo-400">
                  +{users.length - 4}
                </div>
              )}
            </div>
          ) : (
            <span className="text-[9px] text-zinc-600 font-medium">ממתינים למצטרפים...</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
