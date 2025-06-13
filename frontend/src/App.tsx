import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './routes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/toolkitStore';

const PayPalOptions = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,funding-eligibility',
  'enable-funding': 'venmo',
} as any;

const App = () => (
  <PayPalScriptProvider options={PayPalOptions}>
    <PersistGate loading={null} persistor={persistor}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<></>}>
          <MainRoutes />
        </Suspense>
      </Router>
    </PersistGate>
  </PayPalScriptProvider>
);

export default App;
