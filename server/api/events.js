import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const calendarId = config.public.googleCalendarId; // 環境変数からカレンダーIDを取得
  const apiKey = config.public.googleApiKey; // 環境変数からAPIキーを取得

  const calendar = google.calendar({ version: 'v3', auth: apiKey });

  try {
    const res = await calendar.events.list({
      calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return res.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
});
