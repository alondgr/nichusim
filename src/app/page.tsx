'use client';

import { useState, useEffect } from 'react';
import { Show, SignUp, UserButton } from '@clerk/nextjs';
import JinxIntroHome from '@/components/JinxIntroHome';
import UsersList from '@/components/UsersList';
import OpeningJinxForm from '@/components/OpeningJinxForm';
import FlopTeamForm from '@/components/FlopTeamForm';
import GoalDroughtForm from '@/components/GoalDroughtForm';
import GroupStageMatchesForm from '@/components/GroupStageMatchesForm';
import { PredictionsState } from '@/data/worldCupData';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [predictions, setPredictions] = useState<PredictionsState>({});
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load predictions and submission status from LocalStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('nichusim_group_stage_predictions');
    if (saved) {
      try {
        setPredictions(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading predictions', e);
      }
    }
    const wasSubmitted = localStorage.getItem('nichusim_group_stage_submitted');
    if (wasSubmitted === 'true') {
      setSubmitted(true);
    }
  }, []);

  const savePredictions = (newPreds: PredictionsState) => {
    setPredictions(newPreds);
    localStorage.setItem('nichusim_group_stage_predictions', JSON.stringify(newPreds));
  };

  const handleSubmittedChange = (val: boolean) => {
    setSubmitted(val);
    if (val) {
      localStorage.setItem('nichusim_group_stage_submitted', 'true');
    } else {
      localStorage.removeItem('nichusim_group_stage_submitted');
    }
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-zinc-950 selection:bg-evileye-500/30 relative">
      <Show when="signed-out">
        {!started ? (
          <JinxIntroHome onStart={() => setStarted(true)} />
        ) : (
          <div className="z-10 relative flex items-center justify-center min-h-[100svh] w-full max-w-md p-4">
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-900/20 blur-[100px] rounded-full pointer-events-none" />
            <SignUp routing="hash" />
          </div>
        )}
      </Show>

      <Show when="signed-in">
        <div className="absolute top-4 left-4 z-50">
          <UserButton />
        </div>
        <div className="flex flex-col space-y-8 w-full max-w-xl my-12 items-center px-4">
          <UsersList />
          <OpeningJinxForm 
            predictions={predictions}
            savePredictions={savePredictions}
            submitted={submitted}
            setSubmitted={handleSubmittedChange}
          />
          <FlopTeamForm />
          <GoalDroughtForm />
          <GroupStageMatchesForm 
            predictions={predictions}
            savePredictions={savePredictions}
            submitted={submitted}
            setSubmitted={handleSubmittedChange}
          />
        </div>
      </Show>
    </main>
  );
}
