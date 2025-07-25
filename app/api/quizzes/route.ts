import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all quizzes
export async function GET() {
  const quizzes = await prisma.quiz.findMany({ include: { user: true } });
  return NextResponse.json(quizzes);
}

// POST create a new quiz
export async function POST(request: Request) {
  const data = await request.json();
  const quiz = await prisma.quiz.create({
    data: {
      question: data.question,
      answer: data.answer,
      userId: data.userId
    }
  });
  return NextResponse.json(quiz);
} 