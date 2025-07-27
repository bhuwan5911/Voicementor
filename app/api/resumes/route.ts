import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = "force-dynamic";

// GET resume for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  try {
    const resume = await prisma.resume.findFirst({
      where: { userId: Number(userId) }
    });
    
    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

// POST create a new resume
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      userId, 
      fullName, 
      title, 
      email, 
      phone, 
      location,
      degree,
      field,
      university,
      graduationYear,
      skills,
      achievements,
      projects,
      certifications,
      isComplete
    } = body;

    if (!userId || !fullName || !title || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if resume already exists for this user
    const existingResume = await prisma.resume.findFirst({
      where: { userId: Number(userId) }
    });

    if (existingResume) {
      // Update existing resume
      const updatedResume = await prisma.resume.update({
        where: { id: existingResume.id },
        data: {
          fullName,
          title,
          email,
          phone: phone || '',
          location: location || '',
          degree: degree || '',
          field: field || '',
          university: university || '',
          graduationYear: graduationYear || '',
          skills: skills || [],
          achievements: achievements || [],
          projects: projects || [],
          certifications: certifications || [],
          isComplete: isComplete || false
        }
      });
      return NextResponse.json(updatedResume);
    } else {
      // Create new resume
      const newResume = await prisma.resume.create({
        data: {
          userId: Number(userId),
          fullName,
          title,
          email,
          phone: phone || '',
          location: location || '',
          degree: degree || '',
          field: field || '',
          university: university || '',
          graduationYear: graduationYear || '',
          skills: skills || [],
          achievements: achievements || [],
          projects: projects || [],
          certifications: certifications || [],
          isComplete: isComplete || false
        }
      });
      return NextResponse.json(newResume);
    }
  } catch (error) {
    console.error('Error creating/updating resume:', error);
    return NextResponse.json({ error: 'Failed to create/update resume' }, { status: 500 });
  }
}

// PUT update resume
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      id,
      fullName, 
      title, 
      email, 
      phone, 
      location,
      degree,
      field,
      university,
      graduationYear,
      skills,
      achievements,
      projects,
      certifications,
      isComplete
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Resume ID required' }, { status: 400 });
    }

    const updatedResume = await prisma.resume.update({
      where: { id: Number(id) },
      data: {
        fullName,
        title,
        email,
        phone: phone || '',
        location: location || '',
        degree: degree || '',
        field: field || '',
        university: university || '',
        graduationYear: graduationYear || '',
        skills: skills || [],
        achievements: achievements || [],
        projects: projects || [],
        certifications: certifications || [],
        isComplete: isComplete || false
      }
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
} 