import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const calendarId = config.public.googleCalendarId;
  const apiKey = config.public.googleApiKey;
  const calendar = google.calendar({ version: 'v3', auth: apiKey });

  try {
    const res = await calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 30,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const processedEvents = processEvents(res.data.items);
    return processedEvents;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
});

function processEvents(events) {
  return events.map(event => {
    const description = event.description || ''; // descriptionがundefinedの場合に空文字列を使用
    const descriptionParts = [];

    // a要素を抽出
    const aPattern = /<a\s*href=["'](.*?)["']>(.*?)<\/a>/gs;
    const aMatches = [...description.matchAll(aPattern)];
    for (const match of aMatches) {
      const [fullMatch, link, content] = match;
      descriptionParts.push({ link });
    }

    // ul要素を抽出
    const ulPattern = /<ul>(.*?)<\/ul>/gs;
    const ulMatches = [...description.matchAll(ulPattern)];
    for (const match of ulMatches) {
      const [fullMatch, content] = match;
      descriptionParts.push({ cat: content });
    }

    return {
      ...event,
      description: descriptionParts
    };
  });
}
