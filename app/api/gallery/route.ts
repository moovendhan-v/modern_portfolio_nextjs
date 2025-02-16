import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

export async function GET() {
    const NOTION_GALLERY_DATABASE_ID = process.env.NOTION_GALLERY_DATABASE_ID;

    // {
    //     "filter": {
    //       "property": "Category",
    //       "select": {
    //         "equals": "Photoshop"
    //       }
    //     }
    // }

    if (!NOTION_GALLERY_DATABASE_ID) {
        return NextResponse.json(
            { error: 'Missing Notion Database ID' },
            { status: 500 }
        );
    }

    try {
        const response = await notion.databases.query({
            database_id: NOTION_GALLERY_DATABASE_ID
        });
        console.log("galleryresponse", response);

        const galleries = response.results.map((page: any) => ({
            title: page.properties['Image Title']?.title[0]?.plain_text || 'Untitled',
            description: '',
            category: page.properties.Category?.select?.name || 'Uncategorized',
            image: page.properties.Image?.url || 
                   page.properties.Image?.files?.[0]?.external?.url || 
                   page.properties.Image?.files?.[0]?.file?.url || 
                   '/placeholder.jpg', // Fallback image
            icon: page.icon?.external?.url || 'https://www.notion.so/icons/slideshow_gray.svg',
        })).filter(item => item.image && item.image !== '/placeholder.jpg'); // Only include items with valid images

        // Log the gallery data for debugging
        console.log('Processed galleries:', galleries);

        // Group by category
        const groupedGalleries = galleries.reduce((acc: any, item) => {
            const category = item.category.toLowerCase(); // Normalize category case
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});

        return NextResponse.json(groupedGalleries);
    } catch (error) {
        console.error('Error fetching galleries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch galleries' },
            { status: 500 }
        );
    }
} 