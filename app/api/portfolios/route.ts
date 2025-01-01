
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  try {
    const portfolios = await prisma.portfolios.findMany({
      include: {
        uploadedBy: {
          select: { name: true },
        },
      },
    });

    const formattedPortfolios = portfolios.map((portfolio) => ({
      ...portfolio,
      uploadedBy: portfolio.uploadedBy?.name || 'Anonymous',
    }));

    return NextResponse.json({ portfolios: formattedPortfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error); // Log the actual error for debugging
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { githubLink, portfolioLink } = await req.json();

    // Retrieve the session to get the authenticated user's ID
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and get the user ID, otherwise set it to null
    //@ts-ignore
    const finalUserId = session?.user?.id ?? null;

    // Create the portfolio entry
    const portfolio = await prisma.portfolios.create({
      data: {
        githubLink,
        portfolioLink,
        userId: finalUserId, // Can be null for anonymous users
      },
    });

    return NextResponse.json({ portfolio });
  } catch (error: any) {
    console.error('Error creating portfolio:', error);
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}
