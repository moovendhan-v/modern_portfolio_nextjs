import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

export async function GET() {
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  
  if (!NOTION_DATABASE_ID) {
    return NextResponse.json(
      { error: 'Missing Notion Database ID' },
      { status: 500 }
    );
  }
  
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          property: 'Created time',
          direction: 'descending',
        },
      ],
    });

    const testimonials = response.results.map((page: any) => ({
      id: page.id,
      name: page.properties.Name?.title[0]?.plain_text || 'Anonymous',
      image: page.properties.Image?.files[0]?.file?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      rating: page.properties.Rating?.number || 5,
      text: page.properties.Description?.rich_text[0]?.plain_text || '',
      additionalInfo: {
        projectDuration: page.properties.Duration?.rich_text[0]?.plain_text || '3 months',
        servicesUsed: page.properties.Services?.rich_text[0]?.plain_text || 'Web Engineering',
        completionDate: page.properties['Completion Date']?.date?.start || 'March 2024',
      },
    }));

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
} 