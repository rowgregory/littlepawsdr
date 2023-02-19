import { encrypt } from '../../utils/crypto.js';

const registerConfirmation = (pugEmail, body, res) => {
  return pugEmail
    .send({
      template: 'registerconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: body.email,
      },
      locals: {
        email: body.email,
        name: body.name,
        token: body.token,
        id: JSON.stringify(encrypt(body.password)),
      },
    })
    .then(() => res.status(200).json({ message: 'Confirmation email sent' }))
    .catch(err => console.log('ERROR: ', err));
};

export default registerConfirmation;
