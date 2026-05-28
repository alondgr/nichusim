'use client';

import { useState } from 'react';
import { Show, SignUp, UserButton } from '@clerk/nextjs';
import JinxIntroHome from '@/components/JinxIntroHome';
import OpeningJinxForm from '@/components/OpeningJinxForm';
import FlopTeamForm from '@/components/FlopTeamForm';
import GoalDroughtForm from '@/components/GoalDroughtForm';

export default function Home() {
  const [started, setStarted] = useState(false);

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
        <div className="flex flex-col space-y-12 w-full max-w-md my-12 items-center">
          <OpeningJinxForm />
          <FlopTeamForm />
          <GoalDroughtForm />
        </div>
      </Show>
    </main>
  );
}
