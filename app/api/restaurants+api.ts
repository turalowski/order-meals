import { mocks } from './mock';

export async function GET(req: Request): Promise<Response> {
  try {
    const { location } = await req.json();
    
    // Return mock data for the requested location, or fallback to first location
    const mockData = location ? mocks[location as keyof typeof mocks] : null;
    return Response.json(mockData || Object.values(mocks)[0]);
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
