'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronLeft } from 'lucide-react';
import LeaderboardModal from './LeaderboardModal';
import UserProfileModal from './UserProfileModal';

interface SafeUser {
  id: string;
  name: string;
  imageUrl: string;
  username: string;
  createdAt: number;
  predictions?: any;
}

interface UsersListProps {
  sport: 'football' | 'tennis' | 'ucl';
  liveResults?: Record<string, any>;
}

export default function UsersList({ sport, liveResults }: UsersListProps) {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/users?t=${Date.now()}`, { cache: 'no-store' });
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
    <>
      <div className="w-full max-w-md p-2 z-10">
        <motion.button
          onClick={() => setIsLeaderboardOpen(true)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/25 shadow-lg shadow-indigo-950/20 group transition-all hover:border-indigo-500/50 hover:bg-zinc-950/90"
        >
          {/* Left Side: Hebrew Title & Info */}
          <div className="flex items-center gap-2 min-w-0 text-right">
            <div className="p-1.5 bg-indigo-500/10 rounded-lg flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
              <Users className="w-3.5 h-3.5 sm:w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-200 truncate group-hover:text-white transition-colors">
                חברי פרלמנט הנאחס
              </span>
              <span className="text-[9px] text-zinc-500 font-bold mt-0.5 flex items-center gap-1">
                {loading ? 'טוען חברים...' : `${users.length} רשומים בקבוצה`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ultra-compact Facepile */}
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
            <ChevronLeft className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
          </div>
        </motion.button>
      </div>

      <LeaderboardModal 
        isOpen={isLeaderboardOpen} 
        onClose={() => setIsLeaderboardOpen(false)} 
        users={users} 
        onUserSelect={(u) => setSelectedUser(u)} 
        sport={sport}
        liveResults={liveResults}
      />

      <UserProfileModal 
        isOpen={selectedUser !== null} 
        onClose={() => setSelectedUser(null)} 
        user={selectedUser} 
        sport={sport}
        liveResults={liveResults}
      />
    </>
  );
}
