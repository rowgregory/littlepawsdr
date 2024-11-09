import asyncHandler from 'express-async-handler';
import User from '../../../models/userModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import { AuctionDonation, Bid } from '../../../models/campaignModel.js';

const updateUserProfileDetails = asyncHandler(async (req, res) => {
  const log = await prepareLog('UPDATE USER PROFILE DETAILS');
  logEvent(log, 'UPDATING USER PROFILE DETAILS', req.body);

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: `${req.body.firstName} ${req.body.lastName}`,
    firstNameFirstInitial: req.body.firstName.charAt(0),
    lastNameFirstInitial: req.body.lastName.charAt(0),
  };

  try {
    const user = await User.findByIdAndUpdate(req.body._id, data, { new: true }).select(
      'firstName lastName name firstNameFirstInitial lastNameFirstInitial'
    );
    logEvent(log, 'USER PROFILE DETAILS UPDATED', user);

    if (!user) {
      logEvent(log, 'USER NOT FOUND');
      return res.status(404).json({ message: 'User not found', sliceName: 'userApi' });
    }

    await AuctionDonation.updateMany(
      { email: user.email },
      { donor: user.anonymousBidding ? 'Anonymous' : user.name }
    );
    logEvent(log, 'USER AUCTION DONATIONS UPDATED');

    await Bid.updateMany(
      { email: user.email },
      { bidder: user.anonymousBidding ? 'Anonymous' : user.name }
    );
    logEvent(log, 'USER AUCTION BIDS UPDATED');

    logEvent(log, 'END UDPATE USER PROFILE DETAILS');
    res.status(200).json({ user, sliceName: 'userApi' });
  } catch (err) {
    logEvent(log, 'ERROR UPDATING USER PROFILE DETAILS', err);
  }
});

export default updateUserProfileDetails;
