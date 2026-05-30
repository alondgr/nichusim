'use client';

import { useState, useEffect } from 'react';
import { UCL_MATCHES, WORLD_CUP_MATCHES } from '@/data/worldCupData';

export default function AdminDashboard() {
  const [liveResults, setLiveResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const allMatches = [...UCL_MATCHES, ...WORLD_CUP_MATCHES];

  useEffect(() => {
    fetch('/api/live-results')
      .then(res => res.json())
      .then(data => {
        setLiveResults(data.liveResults || {});
        setLoading(false);
      });
  }, []);

  const handleUpdate = (matchId: string, field: string, value: any) => {
    setLiveResults(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value
      }
    }));
  };

  const handlePropBetUpdate = (matchId: string, propId: string, value: any) => {
    setLiveResults(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        actualPropBets: {
          ...(prev[matchId]?.actualPropBets || {}),
          [propId]: value
        }
      }
    }));
  };

  const saveLiveResults = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/live-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(liveResults)
      });
      if (res.ok) setSaveSuccess(true);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) return <div className="p-10 text-white">טוען...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-indigo-400">לוח בקרה - עדכון תוצאות חי</h1>
            <p className="text-zinc-400 mt-2">כל עדכון כאן ישתקף מיד אצל כל המשתמשים באפליקציה.</p>
          </div>
          <button 
            onClick={saveLiveResults}
            disabled={saving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105"
          >
            {saving ? 'שומר...' : saveSuccess ? 'נשמר בהצלחה!' : 'שמור תוצאות ועדכן את כולם'}
          </button>
        </div>

        <div className="space-y-6">
          {allMatches.map(match => {
            const currentMatch = liveResults[match.id] || {};
            const homeScore = currentMatch.actualHomeScore !== undefined ? currentMatch.actualHomeScore : match.actualHomeScore;
            const awayScore = currentMatch.actualAwayScore !== undefined ? currentMatch.actualAwayScore : match.actualAwayScore;
            const propBets = currentMatch.actualPropBets || match.actualPropBets || {};
            
            return (
              <div key={match.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{match.home.name}</span>
                    <input 
                      type="number" 
                      value={homeScore === null ? '' : homeScore} 
                      onChange={(e) => handleUpdate(match.id, 'actualHomeScore', e.target.value === '' ? null : Number(e.target.value))}
                      className="w-16 h-12 bg-zinc-950 border border-zinc-700 rounded-lg text-center text-xl font-bold"
                    />
                    <span className="text-zinc-500 font-black">-</span>
                    <input 
                      type="number" 
                      value={awayScore === null ? '' : awayScore} 
                      onChange={(e) => handleUpdate(match.id, 'actualAwayScore', e.target.value === '' ? null : Number(e.target.value))}
                      className="w-16 h-12 bg-zinc-950 border border-zinc-700 rounded-lg text-center text-xl font-bold"
                    />
                    <span className="font-bold">{match.away.name}</span>
                  </div>
                  <div className="text-sm text-zinc-500">{match.date}</div>
                </div>

                {match.prop_bets && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {match.prop_bets.map((prop: any) => (
                      <div key={prop.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                        <div className="text-sm text-zinc-400 mb-2">{prop.question}</div>
                        
                        {prop.type === 'number' ? (
                          <div className="flex gap-2 items-center">
                            <input 
                              type="number"
                              value={propBets[prop.id] || ''}
                              onChange={(e) => handlePropBetUpdate(match.id, prop.id, e.target.value)}
                              className="w-20 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-center"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => handlePropBetUpdate(match.id, prop.id, (Number(propBets[prop.id] || 0) + 1).toString())} className="w-10 h-10 bg-zinc-800 rounded-lg hover:bg-zinc-700">+</button>
                              <button onClick={() => handlePropBetUpdate(match.id, prop.id, Math.max(0, (Number(propBets[prop.id] || 0) - 1)).toString())} className="w-10 h-10 bg-zinc-800 rounded-lg hover:bg-zinc-700">-</button>
                            </div>
                          </div>
                        ) : prop.options ? (
                          <div className="flex flex-wrap gap-2">
                            {prop.options.map((opt: string) => (
                              <button
                                key={opt}
                                onClick={() => handlePropBetUpdate(match.id, prop.id, opt)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                  propBets[prop.id] === opt 
                                    ? 'bg-indigo-600 text-white font-bold' 
                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <input 
                            type="text"
                            value={propBets[prop.id] || ''}
                            onChange={(e) => handlePropBetUpdate(match.id, prop.id, e.target.value)}
                            placeholder="הכנס ערך..."
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
