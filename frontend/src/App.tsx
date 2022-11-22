import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { themes } from './utils/theme';
import { useSelector } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import useTheme from './utils/hooks/useTheme';

const App = () => {
  const { defer } = useSelector((state: any) => state.deferPayPalButton);
  const theme = useTheme();

  const PayPalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID as any,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,funding-eligibility',
    'enable-funding': 'venmo',
  };

  return (
    <PayPalScriptProvider deferLoading={defer} options={PayPalOptions}>
      <Router>
        <ThemeProvider theme={themes[theme]}>
          <GlobalStyles />
          <Suspense fallback={<></>}>
            <Routes />
          </Suspense>
        </ThemeProvider>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
