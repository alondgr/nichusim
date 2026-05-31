import { NextResponse } from 'next/server';
import { clerkClient, auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList({ limit: 500 });
    
    // Merge liveResults from ALL users (deep merge to prevent empty objects from overwriting populated ones)
    const allLiveResults = users.data.reduce((acc, user) => {
      const userLiveResults = user.publicMetadata?.liveResults as Record<string, any>;
      if (userLiveResults && typeof userLiveResults === 'object') {
        Object.keys(userLiveResults).forEach(matchId => {
          const matchData = userLiveResults[matchId];
          if (matchData && typeof matchData === 'object' && Object.keys(matchData).length > 0) {
            acc[matchId] = {
              ...(acc[matchId] || {}),
              ...matchData
            };
          }
        });
      }
      return acc;
    }, {} as Record<string, any>);

    // Fetch automated live data from ESPN API (cached for 60 seconds)
    try {
      const espnRes = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/summary?event=401862897', { next: { revalidate: 60 } });
      if (espnRes.ok) {
        const d = await espnRes.json();
        const homeScore = parseInt(d.header?.competitions?.[0]?.competitors?.find((c:any) => c.homeAway === 'home')?.score || '0');
        const awayScore = parseInt(d.header?.competitions?.[0]?.competitors?.find((c:any) => c.homeAway === 'away')?.score || '0');
        
        const y1 = parseInt(d.boxscore?.teams?.[0]?.statistics?.find((s:any)=>s.name==='yellowCards')?.displayValue||'0');
        const y2 = parseInt(d.boxscore?.teams?.[1]?.statistics?.find((s:any)=>s.name==='yellowCards')?.displayValue||'0');
        
        const r1 = parseInt(d.boxscore?.teams?.[0]?.statistics?.find((s:any)=>s.name==='redCards')?.displayValue||'0');
        const r2 = parseInt(d.boxscore?.teams?.[1]?.statistics?.find((s:any)=>s.name==='redCards')?.displayValue||'0');
        
        const c1 = parseInt(d.boxscore?.teams?.[0]?.statistics?.find((s:any)=>s.name==='wonCorners')?.displayValue||'0');
        const c2 = parseInt(d.boxscore?.teams?.[1]?.statistics?.find((s:any)=>s.name==='wonCorners')?.displayValue||'0');
        
        const goals = d.keyEvents?.filter((e:any) => e.type.text === 'Goal' || e.type.text === 'Penalty - Scored') || [];
        
        const translateName = (engName: string) => {
          if (!engName) return '';
          if (engName.includes('Havertz')) return 'ק. האברץ';
          if (engName.includes('Dembélé')) return 'ע. דמבלה';
          if (engName.includes('Saka')) return 'ב. סאקה';
          if (engName.includes('Martinelli')) return 'ג. מרטינלי';
          if (engName.includes('Kolo Muani')) return 'ר. קולו מואני';
          if (engName.includes('Kvaratskhelia')) return 'ח. קווארצחליה';
          return engName; // Fallback
        };

        const getGoalscorerName = (text: string) => {
          const match = text.match(/Goal! [^.]+\. ([^(]+) \(/);
          return match ? translateName(match[1]) : '';
        };

        const firstGoal = goals.length > 0 ? getGoalscorerName(goals[0].text) : '';
        const lastGoal = goals.length > 0 ? getGoalscorerName(goals[goals.length-1].text) : '';

        const gc: Record<string, number> = {};
        goals.forEach((g:any) => {
          const n = getGoalscorerName(g.text);
          if (n) gc[n] = (gc[n] || 0) + 1;
        });
        const topScorer = Object.entries(gc).sort((a,b)=>b[1]-a[1])[0]?.[0] || '';

        // Only merge if game has started or has data
        if (d.header?.competitions?.[0]?.status?.type?.name !== 'STATUS_SCHEDULED') {
          allLiveResults['ucl_2026_final'] = {
            ...(allLiveResults['ucl_2026_final'] || {}),
            actualHomeScore: homeScore,
            actualAwayScore: awayScore,
            actualPropBets: {
              ...(allLiveResults['ucl_2026_final']?.actualPropBets || {}),
              yellow_cards: (y1 + y2).toString(),
              red_cards: (r1 + r2).toString(),
              total_corners: (c1 + c2).toString(),
              first_goalscorer: firstGoal,
              last_goalscorer: lastGoal,
              top_scorer: topScorer
            }
          };
        }
      }
    } catch (e) {
      console.error("ESPN Sync Error", e);
    }

    if (Object.keys(allLiveResults).length > 0) {
      return NextResponse.json(
        { liveResults: allLiveResults },
        { headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    return NextResponse.json(
      { liveResults: {} },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error) {
    console.error('Error fetching live results:', error);
    return NextResponse.json({ liveResults: {} }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Merge incoming data with existing liveResults in publicMetadata
    const currentLiveResults = (user.publicMetadata?.liveResults as Record<string, any>) || {};
    
    const updatedLiveResults = {
      ...currentLiveResults,
      ...body
    };

    await client.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        liveResults: updatedLiveResults,
      },
    });

    return NextResponse.json({ success: true, liveResults: updatedLiveResults });
  } catch (error) {
    console.error('Error saving live results:', error);
    return NextResponse.json({ error: 'Failed to save live results' }, { status: 500 });
  }
}
