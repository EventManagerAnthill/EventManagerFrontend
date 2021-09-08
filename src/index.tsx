import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfirmProvider } from 'material-ui-confirm';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from './app/state/store';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfirmProvider >
          <App />
        </ConfirmProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

