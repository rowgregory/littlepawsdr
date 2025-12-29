import Log from '../models/logModel.js';

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
  let log = await Log.findOne({
    journey: journeyIdentifier,
    createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // Only within last 5 mins
  });

  if (log) {
    return log;
  } else {
    log = await Log.create({
      journey: `${journeyIdentifier}_${generateRandomString()}`,
      createdAt: new Date(),
    });
    return log;
  }
}

// Better: cap the events array size
async function logEvent(log, message, data) {
  const foundLog = await Log.findById(log._id);
  if (!foundLog) return;

  foundLog.events.push({
    timestamp: Date.now(),
    message,
    data,
  });

  // Keep only last 100 events to prevent unbounded growth
  if (foundLog.events.length > 100) {
    foundLog.events = foundLog.events.slice(-100);
  }

  await foundLog.save();
}

export { prepareLog, logEvent };
