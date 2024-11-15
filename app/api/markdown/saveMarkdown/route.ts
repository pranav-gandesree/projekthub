import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(request: NextRequest) {
  const { markdownData, userId } = await request.json();

  try {
    const updatedUserDetails = await prisma.userDetails.update({
      where: { userId },
      data: { markdownData },
    });

    return NextResponse.json(updatedUserDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving markdown' }, { status: 500 });
  }
}
