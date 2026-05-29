import { NextResponse } from 'next/server';
import { clerkClient, auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const data = user.privateMetadata?.predictions || {
      fPreds: {},
      fSub: false,
      tPreds: {},
      tSub: false,
      uPreds: {},
      uSub: false,
      uclCarouselIndex: 0,
      tennisCarouselIndex: 0,
      footballCarouselIndex: 0
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching predictions from Clerk:', error);
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
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

    // Merge incoming data with existing predictions in privateMetadata
    const currentPredictions = (user.privateMetadata?.predictions as Record<string, any>) || {};
    
    const updatedPredictions = {
      ...currentPredictions,
      ...body
    };

    await client.users.updateUser(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        predictions: updatedPredictions,
      },
    });

    return NextResponse.json({ success: true, predictions: updatedPredictions });
  } catch (error) {
    console.error('Error saving predictions to Clerk:', error);
    return NextResponse.json({ error: 'Failed to save predictions' }, { status: 500 });
  }
}
