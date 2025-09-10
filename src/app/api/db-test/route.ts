import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use PrismaClient with global singleton pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test database connection by counting leads
    const count = await prisma.lead.count();
    console.log('Database connection successful. Lead count:', count);
    
    return NextResponse.json({
      message: 'Database connection successful',
      leadCount: count
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: String(error) },
      { status: 500 }
    );
  }
}