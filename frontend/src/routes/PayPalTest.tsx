import React, { useEffect, useState } from 'react';
import { Text } from '../components/styles/Styles';
import { PayPalButtons } from '@paypal/react-paypal-js';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';

const PayPalTest = () => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!sdkReady) {
      addPayPalScript();
    }
  }, [sdkReady]);
  const payPalComponents = {
    style: { layout: 'vertical' },
    createOrder: () => {},
    onApprove: () => {},
  } as any;
  return (
    <div style={{ marginTop: '128px', width: '350px' }} className='mx-auto'>
      <Text>PayPal Test</Text>
      {!sdkReady ? (
        <HexagonLoader />
      ) : (
        <PayPalButtons
          style={payPalComponents.style}
          forceReRender={payPalComponents.forceRerender}
          createOrder={payPalComponents.createOrder}
          onApprove={payPalComponents.onApprove}
        />
      )}

      <Text>Under PayPal Buttons</Text>
    </div>
  );
};

export default PayPalTest;
