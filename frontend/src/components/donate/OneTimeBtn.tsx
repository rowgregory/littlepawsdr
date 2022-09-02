import React from 'react';
import { DonateBtn } from '../../routes/Donate/DonationForm';

const OneTimeBtn = () => {
  return (
    <form action='https://www.paypal.com/donate' method='post' target='_top'>
      <input type='hidden' name='hosted_button_id' value='JGJVNGQJX7Y5W' />
      <DonateBtn>DONATE NOW</DonateBtn>
    </form>
  );
};

export default OneTimeBtn;
