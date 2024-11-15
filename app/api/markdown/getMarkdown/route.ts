import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(request: NextRequest) {
        // Get the userId from query parameters
        const userId = request.nextUrl.searchParams.get('userId');

        if (!userId) {
          return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
        }
    

  try {
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
      select: { markdownData: true }
    });

    if (!userDetails) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ markdownData: userDetails?.markdownData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching markdown' }, { status: 500 });
  }
}
