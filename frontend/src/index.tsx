import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import './fonts.css';
import './animations.css';
import './bg-images.css';
import App from './App';
import { toolkitStore } from './redux/toolkitStore';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={toolkitStore}>
    <App />
  </Provider>
);
