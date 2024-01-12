import cron from 'node-cron';
import { sendEmail } from './sendEmail.js';
import { updateEventStatus } from './updateEventStatus.js';
import { getInitialData } from './getInitialData.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js'

function generateCode() {
  // Function to generate a random string of specified length
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  // Function to generate a random 2-character code
  function generateRandomCode() {
    return generateRandomString(2).toUpperCase();
  }

  // Function to generate a random 3-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  // Generate the final code
  const prefix = 'DOXIE-';
  const middlePart = `${generateRandomCode()}${generateRandomNumber()}`;
  const randomChars = generateRandomString(5);

  return `${prefix}${middlePart}${randomChars}`;
}

export const cronJobs = (io) => {
  const initialDataJob = cron.schedule('*/5 * * * *', async () => {
    const data = await getInitialData();
    io.of('/load-initial-data').emit('load-initial-data', data);
  });

  return {
    sendEcard: cron.schedule('*/5 * * * *', () => {
      sendEmail({}, {}, 'ecard', '', false);
    }),
    updateEventStatus: cron.schedule('*/45 * * * *', async () => updateEventStatus()),
    getInitialData: initialDataJob,
    generateAdoptionApplicationFeeBypassCode: cron.schedule('0 0 */30 * *', async () => {
      const generatedCode = generateCode();
      let existingDocument = await AdoptionApplicationBypassCode.findOne();

      if (!existingDocument) {
        existingDocument = new AdoptionApplicationBypassCode({ bypassCode: generatedCode });
      } else {
        existingDocument.bypassCode = generatedCode;
      }

      await existingDocument.save();
      io.of('/load-initial-data').emit('adoption-application-fee-bypass-code', generatedCode);
    }),
  };
};
