'use client';

import { useState, useEffect } from 'react';
import { Show, SignUp, UserButton, useAuth } from '@clerk/nextjs';
import JinxIntroHome from '@/components/JinxIntroHome';
import UsersList from '@/components/UsersList';
import ScoringRules from '@/components/ScoringRules';
import OpeningJinxForm from '@/components/OpeningJinxForm';
import FlopTeamForm from '@/components/FlopTeamForm';
import GoalDroughtForm from '@/components/GoalDroughtForm';
import GroupStageMatchesForm from '@/components/GroupStageMatchesForm';
import CustomAvatarModal from '@/components/CustomAvatarModal';
import ChangeNameModal from '@/components/ChangeNameModal';
import { PredictionsState, getGroupMatches, TEAMS, ALL_TENNIS_MATCHES, UCL_MATCHES, calculateTotalScore } from '@/data/worldCupData';
import { Trophy } from 'lucide-react';

import LiveMatchShortcut from '@/components/LiveMatchShortcut';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const ALL_FOOTBALL_MATCHES = GROUPS.flatMap(g => getGroupMatches(g, TEAMS)).sort((a, b) => a.timestamp - b.timestamp);

export default function Home() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sport, setSport] = useState<'football' | 'tennis' | 'ucl'>('ucl');
  const [liveResults, setLiveResults] = useState<Record<string, any>>({});

  const { isLoaded, isSignedIn } = useAuth();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const [fPreds, setFPreds] = useState<PredictionsState>({});
  const [fSub, setFSub] = useState(false);

  const [tPreds, setTPreds] = useState<PredictionsState>({});
  const [tSub, setTSub] = useState(false);

  const [uPreds, setUPreds] = useState<PredictionsState>({});
  const [uSub, setUSub] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Poll live results every 10 seconds
    const fetchLive = () => {
      fetch('/api/live-results')
        .then(res => res.json())
        .then(data => {
          if (data.liveResults) {
            setLiveResults(data.liveResults);
          }
        })
        .catch(console.error);
    };
    
    fetchLive();
    const interval = setInterval(fetchLive, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Fetch from Cloud API
      fetch('/api/predictions')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            if (data.fPreds && Object.keys(data.fPreds).length > 0) {
              setFPreds(data.fPreds);
              localStorage.setItem('nichusim_group_stage_predictions', JSON.stringify(data.fPreds));
            } else {
              // Fallback to local if cloud is empty (first migration)
              const sf = localStorage.getItem('nichusim_group_stage_predictions');
              if (sf) try { setFPreds(JSON.parse(sf)); } catch (e) {}
            }
            if (data.fSub !== undefined) {
              setFSub(data.fSub);
              if (data.fSub) localStorage.setItem('nichusim_group_stage_submitted', 'true');
            } else {
              if (localStorage.getItem('nichusim_group_stage_submitted') === 'true') setFSub(true);
            }

            if (data.tPreds && Object.keys(data.tPreds).length > 0) {
              setTPreds(data.tPreds);
              localStorage.setItem('nichusim_tennis_predictions', JSON.stringify(data.tPreds));
            } else {
              const st = localStorage.getItem('nichusim_tennis_predictions');
              if (st) try { setTPreds(JSON.parse(st)); } catch (e) {}
            }
            if (data.tSub !== undefined) {
              setTSub(data.tSub);
              if (data.tSub) localStorage.setItem('nichusim_tennis_submitted', 'true');
            } else {
              if (localStorage.getItem('nichusim_tennis_submitted') === 'true') setTSub(true);
            }

            if (data.uPreds && Object.keys(data.uPreds).length > 0) {
              setUPreds(data.uPreds);
              localStorage.setItem('nichusim_ucl_predictions', JSON.stringify(data.uPreds));
            } else {
              const su = localStorage.getItem('nichusim_ucl_predictions');
              if (su) try { setUPreds(JSON.parse(su)); } catch (e) {}
            }
            if (data.uSub !== undefined) {
              setUSub(data.uSub);
              if (data.uSub) localStorage.setItem('nichusim_ucl_submitted', 'true');
            } else {
              if (localStorage.getItem('nichusim_ucl_submitted') === 'true') setUSub(true);
            }
          }
          setDataLoaded(true);
        })
        .catch(() => {
          setDataLoaded(true);
        });
    } else if (isLoaded && !isSignedIn) {
      setDataLoaded(true);
    }
  }, [isLoaded, isSignedIn]);

  const saveToCloud = (data: any) => {
    fetch('/api/predictions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(e => console.error("Cloud save error", e));
  };

  const saveFPreds = (preds: PredictionsState) => {
    setFPreds(preds);
    localStorage.setItem('nichusim_group_stage_predictions', JSON.stringify(preds));
    saveToCloud({ fPreds: preds });
  };
  const handleFSub = (val: boolean) => {
    setFSub(val);
    if (val) localStorage.setItem('nichusim_group_stage_submitted', 'true');
    else localStorage.removeItem('nichusim_group_stage_submitted');
    saveToCloud({ fSub: val });
  };

  const saveTPreds = (preds: PredictionsState) => {
    setTPreds(preds);
    localStorage.setItem('nichusim_tennis_predictions', JSON.stringify(preds));
    saveToCloud({ tPreds: preds });
  };
  const handleTSub = (val: boolean) => {
    setTSub(val);
    if (val) localStorage.setItem('nichusim_tennis_submitted', 'true');
    else localStorage.removeItem('nichusim_tennis_submitted');
    saveToCloud({ tSub: val });
  };

  const saveUPreds = (preds: PredictionsState) => {
    setUPreds(preds);
    localStorage.setItem('nichusim_ucl_predictions', JSON.stringify(preds));
    saveToCloud({ uPreds: preds });
  };
  const handleUSub = (val: boolean) => {
    setUSub(val);
    if (val) localStorage.setItem('nichusim_ucl_submitted', 'true');
    else localStorage.removeItem('nichusim_ucl_submitted');
    saveToCloud({ uSub: val });
  };

  const currentUserScore = calculateTotalScore({ fPreds, tPreds, uPreds }, sport, liveResults);

  if (!mounted) return null;

  return (
    <main className={`flex min-h-[100svh] flex-col items-center justify-start bg-zinc-950 relative ${sport === 'football' ? 'selection:bg-indigo-500/30' : sport === 'ucl' ? 'selection:bg-blue-500/30' : 'selection:bg-orange-500/30'}`}>
      <Show when="signed-out">
        <div className="flex min-h-[100svh] flex-col items-center justify-center w-full">
          {!started ? (
            <JinxIntroHome onStart={() => setStarted(true)} />
          ) : (
            <div className="z-10 relative flex items-center justify-center min-h-[100svh] w-full max-w-md p-4">
              <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none" />
              <SignUp routing="hash" />
            </div>
          )}
        </div>
      </Show>

      <Show when="signed-in">
        {!dataLoaded ? (
          <div className="flex flex-col items-center justify-center min-h-[100svh] w-full text-white">
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-zinc-400 font-bold text-sm">מסנכרן נתונים...</p>
          </div>
        ) : (
          <>
            {/* Sticky Header Layout Switcher */}
        <div className="sticky top-0 z-[60] w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 p-3 flex items-center">
          <div className="absolute left-4">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action 
                  label="ערוך שם לתצוגה ✏️" 
                  labelIcon={
                    <svg xmlns="http://www.w3.org/-2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  }
                  onClick={() => setIsNameModalOpen(true)} 
                />
                <UserButton.Action 
                  label="בחר אווטאר AI 🤖" 
                  labelIcon={
                    <svg xmlns="http://www.w3.org/-2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  }
                  onClick={() => setIsAvatarModalOpen(true)} 
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
          <div className="absolute right-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm font-black text-sm
              ${sport === 'ucl' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                sport === 'tennis' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}
            >
              <Trophy className="w-4 h-4" />
              <span>{currentUserScore}</span>
            </div>
          </div>
          <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800 mx-auto">
            <button
              disabled
              className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-zinc-600 opacity-40 cursor-not-allowed flex items-center gap-1 select-none"
              title="ייפתח בהמשך הטורניר"
            >
              🔒 World Cup
            </button>
            <button
              onClick={() => setSport('ucl')}
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-colors ${sport === 'ucl' ? 'bg-blue-600 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              ⭐ UCL Final
            </button>
            <button
              onClick={() => setSport('tennis')}
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-colors ${sport === 'tennis' ? 'bg-orange-600 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              🎾 French Open
            </button>
          </div>
        </div>

        <LiveMatchShortcut
          sport={sport}
          matches={sport === 'football' ? ALL_FOOTBALL_MATCHES : sport === 'ucl' ? UCL_MATCHES : ALL_TENNIS_MATCHES}
          liveResults={liveResults}
        />

        <div className="flex flex-col space-y-8 w-full max-w-xl my-12 items-center px-4">
          <UsersList sport={sport} liveResults={liveResults} />
          <ScoringRules sport={sport} />
          
          <OpeningJinxForm 
            sport={sport}
            matches={sport === 'football' ? ALL_FOOTBALL_MATCHES : sport === 'ucl' ? UCL_MATCHES : ALL_TENNIS_MATCHES}
            predictions={sport === 'football' ? fPreds : sport === 'ucl' ? uPreds : tPreds}
            savePredictions={sport === 'football' ? saveFPreds : sport === 'ucl' ? saveUPreds : saveTPreds}
            submitted={sport === 'football' ? fSub : sport === 'ucl' ? uSub : tSub}
            setSubmitted={sport === 'football' ? handleFSub : sport === 'ucl' ? handleUSub : handleTSub}
          />
          
          {sport === 'football' && (
            <>
              <FlopTeamForm />
              <GoalDroughtForm />
            </>
          )}

          <GroupStageMatchesForm 
            sport={sport}
            matches={sport === 'football' ? ALL_FOOTBALL_MATCHES : sport === 'ucl' ? UCL_MATCHES : ALL_TENNIS_MATCHES}
            predictions={sport === 'football' ? fPreds : sport === 'ucl' ? uPreds : tPreds}
            savePredictions={sport === 'football' ? saveFPreds : sport === 'ucl' ? saveUPreds : saveTPreds}
            submitted={sport === 'football' ? fSub : sport === 'ucl' ? uSub : tSub}
            setSubmitted={sport === 'football' ? handleFSub : sport === 'ucl' ? handleUSub : handleTSub}
            liveResults={liveResults}
          />
        </div>
        
        <CustomAvatarModal 
          isOpen={isAvatarModalOpen} 
          onClose={() => setIsAvatarModalOpen(false)} 
        />
        
        <ChangeNameModal
          isOpen={isNameModalOpen}
          onClose={() => setIsNameModalOpen(false)}
        />
        </>
        )}
      </Show>
    </main>
  );
}
