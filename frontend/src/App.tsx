import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { themes } from './utils/theme';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import useTheme from './utils/hooks/useTheme';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  const theme = useTheme();

  const PayPalOptions = {
    'client-id':
      'AXj82_D3nbHIZzg-CaOFmAOPwb-1YcSTwRhx61HfTMhLQSLab2r5t9MULu0S079sI4NsB8zZvZRbHMOD',
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,funding-eligibility',
    'enable-funding': 'venmo',
    vault: true,
  };

  return (
    <PayPalScriptProvider options={PayPalOptions}>
      <Router>
        <ThemeProvider theme={themes[theme]}>
          <ScrollToTop />
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
