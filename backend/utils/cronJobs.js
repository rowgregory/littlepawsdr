import cron from 'node-cron';
import { sendECard } from './sendECard.js';
import { updateEventStatus } from './updateEventStatus.js';

export const cronJobs = ONLINE => ({
  sendECard: ONLINE && cron.schedule('*/10 * * * *', () => sendECard()),
  updateEventStatus:
    ONLINE && cron.schedule('*/45 * * * *', async () => updateEventStatus()),
});
