import cron from 'node-cron';
import { sendEmail } from './sendEmail.js';
import { updateEventStatus } from './updateEventStatus.js';
import { getInitialData } from './getInitialData.js';

export const cronJobs = (io) => {
  const initialDataJob = cron.schedule('*/5 * * * *', async () => {
    const data = await getInitialData();
    io.of('/load-initial-data').emit('load-initial-data', data);
  });

  return {
    sendEcard: cron.schedule('*/5 * * * *', () =>
      sendEmail({}, {}, 'ecard', '', false)
    ),
    updateEventStatus: cron.schedule('*/45 * * * *', async () =>
      updateEventStatus()
    ),
    getInitialData: initialDataJob,
  };
};
