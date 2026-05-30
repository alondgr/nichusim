import { NextResponse } from 'next/server';
import { clerkClient, auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList({ limit: 100 });
    
    // Find any user that has liveResults in their publicMetadata (Admin)
    const adminUser = users.data.find(u => u.publicMetadata?.liveResults);
    
    if (adminUser && adminUser.publicMetadata.liveResults) {
      return NextResponse.json(
        { liveResults: adminUser.publicMetadata.liveResults },
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
