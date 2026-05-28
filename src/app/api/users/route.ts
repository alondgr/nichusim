import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clerkClient();
    
    // Fetch up to 100 recent users from Clerk
    const response = await client.users.getUserList({
      limit: 100,
      orderBy: '-created_at',
    });

    // Map only safe, public data to return to the frontend
    const safeUsers = response.data.map((u) => {
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
      };
    });

    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error('Error fetching users from Clerk:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
