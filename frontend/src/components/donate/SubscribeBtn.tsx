import React from 'react';

const SubscribeBtn = () => {
  return (
    <div>
      <form
        action='https://www.paypal.com/cgi-bin/webscr'
        method='post'
        target='_top'
      >
        <input type='hidden' name='cmd' value='_s-xclick' />
        <input type='hidden' name='hosted_button_id' value='3B9GUZ7GG5HQA' />
        <table>
          <thead>
            <tr>
              <td>
                <input type='hidden' name='on0' value='Donation options' />
                Donation options
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select name='os0'>
                  <option value='$5/month'>
                    $5/month : $5.00 USD - monthly
                  </option>
                  <option value='$10/month'>
                    $10/month : $10.00 USD - monthly
                  </option>
                  <option value='$20/month'>
                    $20/month : $20.00 USD - monthly
                  </option>
                  <option value='$25/month'>
                    $25/month : $25.00 USD - monthly
                  </option>
                  <option value='$50/month'>
                    $50/month : $50.00 USD - monthly
                  </option>
                  <option value='$100/month'>
                    $100/month : $100.00 USD - monthly
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <input type='hidden' name='currency_code' value='USD' />
        <input
          type='image'
          src='https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif'
          name='submit'
          alt='PayPal - The safer, easier   way to pay online!'
        />
        <img
          alt=''
          src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif'
          width='1'
          height='1'
        />
      </form>
    </div>
  );
};

export default SubscribeBtn;
