import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './bootstrap.min-5.css';
import './index.css';
import App from './App';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
