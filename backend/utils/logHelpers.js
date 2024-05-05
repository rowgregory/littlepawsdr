import Log from '../models/logSchema.js';

async function prepareLog(journey) {
  let log = await Log.findOne().sort({ updatedAt: -1 });

  const currentTime = Date.now();
  const THRESHOLD_TIME = 45 * 1000; // 45 seconds

  // Check if the most recent log exists and if it was created within the threshold time
  if (log && currentTime - log.updatedAt.getTime() < THRESHOLD_TIME) {
    return log; // Return the existing log
  }

  // Create a new log if the most recent one is older than the threshold time or doesn't exist
  return Log.create({ journey });
}

function logEvent(log, message, data) {
  log.events.push({
    timestamp: Date.now(),
    message,
    data
  });
}

export {
  prepareLog,
  logEvent
}