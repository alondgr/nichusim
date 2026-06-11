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
import { PredictionsState, getGroupMatches, TEAMS, calculateTotalScore, getMatchStatus } from '@/data/worldCupData';
import { Trophy } from 'lucide-react';

import LiveMatchShortcut from '@/components/LiveMatchShortcut';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const ALL_FOOTBALL_MATCHES = GROUPS.flatMap(g => getGroupMatches(g, TEAMS)).sort((a, b) => a.timestamp - b.timestamp);

export default function Home() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sport = 'football';
  const [liveResults, setLiveResults] = useState<Record<string, any>>({});

  const { isLoaded, isSignedIn } = useAuth();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const [fPreds, setFPreds] = useState<PredictionsState>({});
  const [fSub, setFSub] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState<string>('');
  const [winnerSub, setWinnerSub] = useState(false);
  const [topScorer, setTopScorer] = useState<string>('');
  const [topScorerSub, setTopScorerSub] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Poll live results every 10 seconds
    const fetchLive = () => {
      fetch(`/api/live-results?t=${Date.now()}`)
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
      fetch(`/api/predictions?t=${Date.now()}`)
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
            
            // Winner Team (FlopTeamForm actually used for Winner)
            if (data.winnerTeam) {
              setWinnerTeam(data.winnerTeam);
              localStorage.setItem('nichusim_winner_team', data.winnerTeam);
            } else {
              const sw = localStorage.getItem('nichusim_winner_team');
              if (sw) setWinnerTeam(sw);
            }
            if (data.winnerSub !== undefined) {
              setWinnerSub(data.winnerSub);
              if (data.winnerSub) localStorage.setItem('nichusim_winner_submitted', 'true');
            } else {
              if (localStorage.getItem('nichusim_winner_submitted') === 'true') setWinnerSub(true);
            }

            // Top Scorer (Golden Shoe)
            if (data.topScorer) {
              setTopScorer(data.topScorer);
              localStorage.setItem('nichusim_top_scorer', data.topScorer);
            } else {
              const st = localStorage.getItem('nichusim_top_scorer');
              if (st) setTopScorer(st);
            }
            if (data.topScorerSub !== undefined) {
              setTopScorerSub(data.topScorerSub);
              if (data.topScorerSub) localStorage.setItem('nichusim_top_scorer_submitted', 'true');
            } else {
              if (localStorage.getItem('nichusim_top_scorer_submitted') === 'true') setTopScorerSub(true);
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

  const currentUserScore = calculateTotalScore({ fPreds }, sport, liveResults);

  const firstMatch = ALL_FOOTBALL_MATCHES[0];
  const isTournamentStarted = firstMatch ? getMatchStatus(firstMatch, Date.now()) !== 'upcoming' : false;

  if (!mounted) return null;

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-start bg-zinc-950 relative selection:bg-indigo-500/30">
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
            {/* Sticky Header */}
            <div className="sticky top-0 z-[60] w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 p-3 flex items-center justify-between">
              <div className="pl-2">
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
                        <svg xmlns="http://www.w3.org/-2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                      }
                      onClick={() => setIsAvatarModalOpen(true)} 
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm font-black text-sm bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                <Trophy className="w-4 h-4" />
                <span>{currentUserScore}</span>
              </div>
            </div>

            <LiveMatchShortcut
              sport={sport}
              matches={ALL_FOOTBALL_MATCHES}
              liveResults={liveResults}
            />

            <div className="flex flex-col space-y-8 w-full max-w-xl my-12 items-center px-4">
              <UsersList sport={sport} liveResults={liveResults} />
              <ScoringRules sport={sport} />
              
              <OpeningJinxForm 
                sport={sport}
                matches={ALL_FOOTBALL_MATCHES}
                predictions={fPreds}
                savePredictions={saveFPreds}
                submitted={fSub}
                setSubmitted={handleFSub}
              />
              
              <FlopTeamForm 
                winnerTeam={winnerTeam}
                setWinnerTeam={setWinnerTeam}
                winnerSub={winnerSub}
                setWinnerSub={setWinnerSub}
                saveToCloud={saveToCloud}
                isTournamentStarted={isTournamentStarted}
              />
              <GoalDroughtForm 
                topScorer={topScorer}
                setTopScorer={setTopScorer}
                topScorerSub={topScorerSub}
                setTopScorerSub={setTopScorerSub}
                saveToCloud={saveToCloud}
                isTournamentStarted={isTournamentStarted}
              />

              <GroupStageMatchesForm 
                sport={sport}
                matches={ALL_FOOTBALL_MATCHES}
                predictions={fPreds}
                savePredictions={saveFPreds}
                submitted={fSub}
                setSubmitted={handleFSub}
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
