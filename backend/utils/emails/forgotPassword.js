import Error from '../../models/errorModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

const forgotPassword = async (pugEmail, user) => {
  const log = await prepareLog('FORGOT PASSWORD EMAIL');

  if (!user?.email || !user?.resetUrl) {
    logEvent(log, 'MISSING EMAIL OR RESET URL');
    throw new Error('Missing email or reset URL');
  }

  await pugEmail.send({
    template: 'forgotpassword',
    message: {
      from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org>',
      to: user.email,
    },
    locals: {
      resetUrl: user.resetUrl,
    },
  });

  logEvent(log, 'FORGOT PASSWORD EMAIL SUCCESSFULLY SENT');
};

export default forgotPassword;
