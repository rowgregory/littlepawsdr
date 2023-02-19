import cron from 'node-cron';
import { sendEmail } from './sendEmail.js';
import { updateEventStatus } from './updateEventStatus.js';

export const cronJobs = () => ({
  sendEcard: cron.schedule('*/10 * * * *', () =>
    sendEmail({}, {}, 'ecard', '', false)
  ),
  updateEventStatus: cron.schedule('*/45 * * * *', async () =>
    updateEventStatus()
  ),
});
