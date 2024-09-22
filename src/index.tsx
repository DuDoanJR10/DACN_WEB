import React from 'react';
import { App } from './App';
import './i18n';
import { persistor, rootStore } from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
