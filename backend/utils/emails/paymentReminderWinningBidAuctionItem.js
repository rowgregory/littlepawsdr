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
        template: 'auctionItemWinningBidder',
        message: {
          from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
          to: winningBidder.user.email,
        },
        locals: {
          itemCount: winningBidder.auctionItems.length,
          shipping: winningBidder.shipping,
          subtotal: winningBidder.subtotal,
          totalPrice: winningBidder.totalPrice,
          auctionItems: winningBidder.auctionItems,
          id: winningBidder._id,
          name: winningBidder.user.name,
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
