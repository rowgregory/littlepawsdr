import User from '../../models/userModel.js';

const registerConfirmation = (pugEmail, body) => {
  return pugEmail
    .send({
      template: 'registerconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.email,
      },
      locals: {
        token: body.token,
        name: body.name,
        userId: body.userId,
        cameFromAuction: body.cameFromAuction,
        customCampaignLink: body.customCampaignLink
      },
    })
    .then(async () => await User.findByIdAndUpdate(body.userId, { registrationConfirmationEmailSent: true }))
    .catch((err) => console.log('ERROR: ', err));
};

export default registerConfirmation;
