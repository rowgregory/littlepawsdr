import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './bootstrap.min-5.css';
import './index.css';
import App from './App';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
