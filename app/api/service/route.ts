import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

export async function GET() {
    const NOTION_SERVICE_DATABASE_ID = process.env.NOTION_SERVICE_DATABASE_ID;

    if (!NOTION_SERVICE_DATABASE_ID) {
        return NextResponse.json(
            { error: 'Missing Notion Database ID' },
            { status: 500 }
        );
    }

    try {
        const response = await notion.databases.query({
            database_id: NOTION_SERVICE_DATABASE_ID
        });

        console.log("Service response", response);

        const testimonials = response.results.map((page: any) => ({
            title: page.properties.serviceName?.title[0]?.plain_text || 'Anonymous',
            description: page.properties.descritions?.rich_text[0]?.plain_text || '',
            icon: page.properties.iconName?.rich_text[0]?.plain_text || '',
            image: page.properties.Image?.url || '',
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