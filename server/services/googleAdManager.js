import { google } from '@googleapis/admanager';

export async function getAdxReport(credentialsJson) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentialsJson),
    scopes: ['https://www.googleapis.com/auth/dfp'],
  });
  const adManager = google.admanager({ version: 'v202311', auth });

  const request = {
    reportJob: {
      reportQuery: {
        dimensions: ['DATE'],
        columns: ['AD_EXCHANGE_IMPRESSIONS', 'AD_EXCHANGE_ESTIMATED_REVENUE'],
        dateRangeType: 'TODAY',
      },
    },
  };

  const { data } = await adManager.reports.run(request);
  return data;
}
