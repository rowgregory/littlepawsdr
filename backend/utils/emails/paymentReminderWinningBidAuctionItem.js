import { AuctionWinningBidder } from '../../models/campaignModel.js';

const sendEmailWithRetry = async (emailOptions, pugEmail, retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pugEmail.send(emailOptions);
      return;
    } catch (error) {
      if (attempt < retries) {
        console.warn(`Email send failed, retrying in ${delay}ms... (Attempt ${attempt} of ${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error('Email send failed after all retries:', error);
      }
    }
  }
};

const paymentRedminderWinningBidAuctionItem = async (pugEmail, auctionWinningBidders) => {
  auctionWinningBidders.forEach(async (winningBidder) => {
    await sendEmailWithRetry(
      {
        template: 'paymentreminderwinningbidauctionitem',
        message: {
          from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
          to: winningBidder.user.email,
        },
        locals: {
          photo: winningBidder.auctionItem.photos[0].url,
          itemName: winningBidder.auctionItem.name,
          desc: winningBidder.auctionItem.description,
          subtotal: winningBidder.itemSoldPrice?.toFixed(2),
          shipping: winningBidder.shipping?.toFixed(2),
          totalPrice: winningBidder.totalPrice?.toFixed(2),
          id: winningBidder._id,
        },
      },
      pugEmail
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
      emailNotificationCount: 2,
    });
  });
};

export default paymentRedminderWinningBidAuctionItem;
