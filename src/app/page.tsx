'use client';

import { useState, useEffect } from 'react';
import { Show, SignUp, UserButton } from '@clerk/nextjs';
import JinxIntroHome from '@/components/JinxIntroHome';
import UsersList from '@/components/UsersList';
import ScoringRules from '@/components/ScoringRules';
import OpeningJinxForm from '@/components/OpeningJinxForm';
import FlopTeamForm from '@/components/FlopTeamForm';
import GoalDroughtForm from '@/components/GoalDroughtForm';
import GroupStageMatchesForm from '@/components/GroupStageMatchesForm';
import { PredictionsState, getGroupMatches, TEAMS, ALL_TENNIS_MATCHES, UCL_MATCHES } from '@/data/worldCupData';

import LiveMatchShortcut from '@/components/LiveMatchShortcut';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const ALL_FOOTBALL_MATCHES = GROUPS.flatMap(g => getGroupMatches(g, TEAMS)).sort((a, b) => a.timestamp - b.timestamp);

export default function Home() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sport, setSport] = useState<'football' | 'tennis' | 'ucl'>('ucl');

  const [fPreds, setFPreds] = useState<PredictionsState>({});
  const [fSub, setFSub] = useState(false);

  const [tPreds, setTPreds] = useState<PredictionsState>({});
  const [tSub, setTSub] = useState(false);

  const [uPreds, setUPreds] = useState<PredictionsState>({});
  const [uSub, setUSub] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load Football
    const sf = localStorage.getItem('nichusim_group_stage_predictions');
    if (sf) {
      try { setFPreds(JSON.parse(sf)); } catch (e) {}
    }
    if (localStorage.getItem('nichusim_group_stage_submitted') === 'true') {
      setFSub(true);
    }

    // Load Tennis
    const st = localStorage.getItem('nichusim_tennis_predictions');
    if (st) {
      try { setTPreds(JSON.parse(st)); } catch (e) {}
    }
    if (localStorage.getItem('nichusim_tennis_submitted') === 'true') {
      setTSub(true);
    }

    // Load UCL
    const su = localStorage.getItem('nichusim_ucl_predictions');
    if (su) {
      try { setUPreds(JSON.parse(su)); } catch (e) {}
    }
    if (localStorage.getItem('nichusim_ucl_submitted') === 'true') {
      setUSub(true);
    }
  }, []);

  const saveFPreds = (preds: PredictionsState) => {
    setFPreds(preds);
    localStorage.setItem('nichusim_group_stage_predictions', JSON.stringify(preds));
  };
  const handleFSub = (val: boolean) => {
    setFSub(val);
    if (val) localStorage.setItem('nichusim_group_stage_submitted', 'true');
    else localStorage.removeItem('nichusim_group_stage_submitted');
  };

  const saveTPreds = (preds: PredictionsState) => {
    setTPreds(preds);
    localStorage.setItem('nichusim_tennis_predictions', JSON.stringify(preds));
  };
  const handleTSub = (val: boolean) => {
    setTSub(val);
    if (val) localStorage.setItem('nichusim_tennis_submitted', 'true');
    else localStorage.removeItem('nichusim_tennis_submitted');
  };

  const saveUPreds = (preds: PredictionsState) => {
    setUPreds(preds);
    localStorage.setItem('nichusim_ucl_predictions', JSON.stringify(preds));
  };
  const handleUSub = (val: boolean) => {
    setUSub(val);
    if (val) localStorage.setItem('nichusim_ucl_submitted', 'true');
    else localStorage.removeItem('nichusim_ucl_submitted');
  };

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
        {/* Sticky Header Layout Switcher */}
        <div className="sticky top-0 z-[60] w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 p-3 flex items-center">
          <div className="absolute left-4">
            <UserButton />
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
        />

        <div className="flex flex-col space-y-8 w-full max-w-xl my-12 items-center px-4">
          <UsersList />
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
          />
        </div>
      </Show>
    </main>
  );
}
