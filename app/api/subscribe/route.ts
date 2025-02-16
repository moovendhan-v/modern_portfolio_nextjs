import { NextResponse } from 'next/server';
import { notion } from '@/lib/notion';

const NOTION_EMAIL_SUBSCRIBE_DATABASE_ID = process.env.NOTION_EMAIL_SUBSCRIBE_DATABASE_ID;

// POST: Add a new email to Notion
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!NOTION_EMAIL_SUBSCRIBE_DATABASE_ID) {
      throw new Error('Missing Notion Database ID');
    }

    const existingEmail = await notion.databases.query({
      database_id: NOTION_EMAIL_SUBSCRIBE_DATABASE_ID,
      filter: {
        property: "Email",
        email: {
          equals: email,
        },
      },
    });

    if (existingEmail.results.length > 0) {
      console.log("Email already exists:", email);
      return NextResponse.json({ success: true, message: 'Email already subscribed.' });
    }

    const payload = {
      parent: { database_id: NOTION_EMAIL_SUBSCRIBE_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `New Subscriptions : ${email}`,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        SubscriptionDate: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    };

    console.log('Adding email to Notion:', payload);

    // Add email to Notion database
    const response = await notion.pages.create(payload);

    console.log('Email added to Notion:', response);

    return NextResponse.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Error adding email subscription:', error);
    return NextResponse.json({ error: 'Failed to add email subscription' }, { status: 500 });
  }
}
