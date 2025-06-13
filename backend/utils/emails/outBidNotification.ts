import { Bid } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

interface PugEmailProps {
  send: (arg0: {
    template: string;
    message: { from: string; to: any };
    locals: { itemImage: any; itemName: any; previousTopBid: any; topBid: any; link: any };
  }) => Promise<any>;
}

interface DataProps {
  email: any;
  itemImage: any;
  itemName: any;
  previousTopBid: any;
  topBid: any;
  link: any;
  previousTopBidId: any;
}

const outBidNotification = async (pugEmail: PugEmailProps, data: DataProps) => {
  const log = await prepareLog('INITIATE OUT BID NOTIFICATION EMAIL');
  logEvent(log, 'OUT BID NOTIFICATION EMAIL', data);
  await pugEmail
    .send({
      template: 'outbidnotification',
      message: {
        from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
        to: data.email,
      },
      locals: {
        itemImage: data.itemImage,
        itemName: data.itemName,
        previousTopBid: data.previousTopBid,
        topBid: data.topBid,
        link: data.link,
      },
    })
    .then(async () => {
      await Bid.findByIdAndUpdate(data.previousTopBidId, { outBidEmailSent: true }, { new: true });
      logEvent(log, `SUCCESSFULLY SENT OUT BID EMAIL TO ${data.email}`);
    })
    .catch(async (err) => {
      await Error.create({
        functionName: 'OUT_BID_NOTIFICATION_EMAIL',
        name: err.name,
        message: err.message,
      });
    });
};

export default outBidNotification;
