import { NextResponse } from 'next/server';
import { clerkClient, auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clerkClient();
    
    // 1. Identify the current logged-in user and auto-enroll them in the World Cup app (nichusim)
    const { userId } = await auth();
    if (userId) {
      const currentUser = await client.users.getUser(userId);
      // Auto-enroll: check if the 'app' metadata field is set to 'nichusim'
      if (currentUser.publicMetadata?.app !== 'nichusim') {
        await client.users.updateUser(userId, {
          // Perform a safe merge to preserve any other metadata fields (e.g. from the portfolio app)
          publicMetadata: {
            ...currentUser.publicMetadata,
            app: 'nichusim',
          },
        });
      }
    }

    // 2. Fetch up to 500 recent users from Clerk
    const response = await client.users.getUserList({
      limit: 500,
      orderBy: '-created_at',
    });

    // 3. Filter only users tagged with the 'nichusim' app metadata flag
    const safeUsers = response.data
      .filter((u) => u.publicMetadata?.app === 'nichusim')
      .map((u) => {
        let displayName = `${u.firstName || ''} ${u.lastName || ''}`.trim();
        if (!displayName) {
          displayName = u.username || 'משתמש אנונימי';
        }

        return {
          id: u.id,
          name: displayName,
          imageUrl: u.imageUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60',
          username: u.username || '',
          createdAt: u.createdAt,
          predictions: u.privateMetadata?.predictions || {}
        };
      });

    return NextResponse.json(
      { users: safeUsers },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error) {
    console.error('Error fetching users from Clerk:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
