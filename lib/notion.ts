import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing Notion API Key');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
}); 