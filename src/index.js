import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';

import en from 'react-intl/locale-data/en';

//import 'semantic-ui-css/semantic.min.css';
//import './index.css';

import { HotSwappingIntlProvider } from './components';
import App from './App';
import store from './store';
import Config from './utils/config';

addLocaleData([...en]);

Config.getConfig()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <HotSwappingIntlProvider>
          <App />
        </HotSwappingIntlProvider>
      </Provider>,
      document.getElementById('root'),
    );
  })
  .catch((err) => {
    console.error('Error when loading config:', err);
  });
