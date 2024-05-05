const resetPassword = (transporter, body, token, res) => {
  const mailOptions = {
    from: `LPDR@littlepawsdr.org`,
    to: `${body.email}`,
    subject: `Link to Reset Password`,
    text:
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
      `https://www.littlepawsdr.org/auth/reset-password/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      res
        .status(400)
        .send({ message: `There was an error sending that email: ${err}` });
    } else {
      res.status(200).json({
        message: `An email has been sent if an account has been located.`,
      });
    }
  });
};

export default resetPassword;
