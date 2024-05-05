import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './bootstrap.min-5.css';
import './index.css';
import App from './App';
import smoothscroll from 'smoothscroll-polyfill';
import { toolkitStore } from './redux/toolkitStore';

smoothscroll.polyfill();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={toolkitStore}>
    <App />
  </Provider>
);
