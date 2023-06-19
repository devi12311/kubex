import React from 'react';
import App from '@core/App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@assets/css/tailwind.css';
import '@assets/css/index.css';
import '@i18n/index';
import { persistor, store } from '@redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
