import Error from '../../models/errorModel.js';

const outBidNotification = async (pugEmail, data) => {
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
    .then(() => {
      console.log('OUT BID NOTIFICATION SUCCESS');
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
