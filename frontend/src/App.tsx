import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './routes';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { themes } from './utils/theme';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import useTheme from './utils/hooks/useTheme';
import { ParallaxProvider } from 'react-scroll-parallax';

const App = () => {
  const theme = useTheme();

  const PayPalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,funding-eligibility',
    'enable-funding': 'venmo',
  } as any;

  return (
    <PayPalScriptProvider options={PayPalOptions}>
      <ParallaxProvider>
      <Router>
        <ThemeProvider theme={themes[theme]}>
          <GlobalStyles />
          <Suspense fallback={<></>}>
            <MainRoutes />
          </Suspense>
        </ThemeProvider>
      </Router>
      </ParallaxProvider>
    </PayPalScriptProvider>
  );
};

export default App;
