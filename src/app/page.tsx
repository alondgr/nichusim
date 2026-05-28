'use client';

import { useState } from 'react';
import { Show, SignUp, UserButton } from '@clerk/nextjs';
import JinxIntroHome from '@/components/JinxIntroHome';
import OpeningJinxForm from '@/components/OpeningJinxForm';

export default function Home() {
  const [showClerk, setShowClerk] = useState(false);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-zinc-950 selection:bg-evileye-500/30">
      <Show when="signed-out">
        {!showClerk ? (
          <JinxIntroHome onStart={() => setShowClerk(true)} />
        ) : (
          <div className="z-10 relative">
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
        <OpeningJinxForm />
      </Show>
    </main>
  );
}
