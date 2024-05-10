import Log from '../models/logSchema.js';

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

async function prepareLog(journeyIdentifier) {
  let log = await Log.findOne({ journey: journeyIdentifier });

  if (log) {
    return log;
  } else {
    log = await Log.create({ journey: `${journeyIdentifier}_${generateRandomString()}` });
    return log;
  }
}

async function logEvent(log, message, data) {
  const foundLog = await Log.findById(log._id);
  if (!foundLog) return;

  foundLog.events.push({
    timestamp: Date.now(),
    message,
    data,
  });

  await foundLog.save()
}

export { prepareLog, logEvent };
