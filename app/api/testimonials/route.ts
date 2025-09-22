import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

export async function GET() {
  const NOTION_CLIENT_DATABASE_ID = process.env.NOTION_CLIENT_DATABASE_ID;
  
  if (!NOTION_CLIENT_DATABASE_ID) {
    return NextResponse.json(
      { error: 'Missing Notion Database ID' },
      { status: 500 }
    );
  }
  
  try {
    const response = await notion.databases.query({
      database_id: NOTION_CLIENT_DATABASE_ID,
      sorts: [
        {
          property: "Name",
          direction: "descending"
        }
      ]
    });

    console.log("Testimonials response", response);

    const testimonials = response.results.map((page: any) => ({
      id: page.id,
      name: page.properties.client_name?.rich_text[0]?.plain_text || 'Anonymous',
      image: page.properties.client_image?.files[0]?.external?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      rating: 5,
      text: page.properties.client_review?.rich_text[0]?.plain_text || '',
      additionalInfo: {
        projectDuration: page.properties.duriations?.rich_text[0]?.text?.content || 'N/A',
        servicesUsed: page.properties.Status?.status?.name || 'N/A',
        completionDate: page.created_time?.split('T')[0] || 'N/A',
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