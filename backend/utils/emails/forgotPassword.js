import Error from '../../models/errorModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

const forgotPassword = async (pugEmail, user) => {
  const log = await prepareLog('FORGOT PASSWORD EMAIL');
  logEvent(log, 'INITIATE FORGOT PASSWORD EMAIL', user);

  await pugEmail
    .send({
      template: 'forgotpassword',
      message: {
        from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
        to: user.email,
      },
      locals: {
        token: user.token,
      },
    })
    .then(async () => {
      logEvent(log, 'FORGOT PASSWORD EMAIL SUCESSFULLY SENT');
    })
    .catch(
      async (err) => {
        logEvent(log, 'FORGOT PASSWORD EMAIL ERROR', err);
        await Error.create({
          functionName: 'FORGOT_PASSWORD_EMAIL_ERROR',
          name: err.name,
          message: err.message,
        })
      }
    );
};

export default forgotPassword;
