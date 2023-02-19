import Event from '../models/eventModel.js';

export const updateEventStatus = async () => {
  const events = await Event.find({});
  if (events) {
    events?.map(async event => {
      const start = event?.startDate;
      const end = event?.endDate;
      const current = new Date()
        .toLocaleString()
        .split(',')[0]
        ?.replace(/["/"]/g, '-');

      const d1 = start?.split('-');
      const d2 = end?.split('-');
      const c = current?.split('-');

      const from = new Date(parseInt(d1[0]), parseInt(d1[1]), parseInt(d1[2]));
      const to = new Date(parseInt(d2[0]), parseInt(d2[1]), parseInt(d2[2]));
      const check = new Date(parseInt(c[2]), parseInt(c[0]), parseInt(c[1]));

      const isWithinDateRange = check > from && check < to;
      const isAfterDateRange = check > to;

      const status = [
        { status: 'ACTIVE' },
        { status: 'PAST' },
        { status: 'UPCOMING' },
      ];

      if (isWithinDateRange) {
        try {
          await Event.updateOne({ _id: event._id }, status[0]);
        } catch (err) {
          console.log('Active Status Error: ', err);
        }
      } else if (isAfterDateRange) {
        try {
          await Event.updateOne({ _id: event._id }, status[1]);
        } catch (err) {
          console.log('Past Status Error: ', err);
        }
      } else {
        try {
          await Event.updateOne({ _id: event._id }, status[2]);
        } catch (err) {
          console.log('Upcoming Status Error: ', err);
        }
      }
    });
  }
};
