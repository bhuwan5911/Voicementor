export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all users or filter by query params
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const where: any = {};
    if (searchParams.get('email')) where.email = searchParams.get('email');
    if (searchParams.get('name')) where.name = searchParams.get('name');
    if (searchParams.get('id')) where.id = Number(searchParams.get('id'));
    const users = await prisma.user.findMany({
      where,
      include: { profile: true, quizzes: true, achievements: true, voiceRecords: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new user
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        profile: data.profile ? { create: data.profile } : undefined
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
} 