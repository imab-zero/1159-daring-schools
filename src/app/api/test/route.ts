import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API test route is working' });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received POST request to /api/test');
    
    // Log request method and headers for debugging
    console.log('Request method:', request.method);
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Test POST successful', receivedData: body },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in test route:', error);
    return NextResponse.json(
      { error: 'Test route failed' },
      { status: 500 }
    );
  }
}