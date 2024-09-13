import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function POST(request: Request) {
  try {
    const { userId, projectId } = await request.json()

    await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          disconnect: { id: projectId },
        },
      },
    })

    return NextResponse.json({ message: 'Bookmark removed successfully' })
  } catch (error) {
    console.error('Error removing bookmark:', error)
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 })
  }
}
