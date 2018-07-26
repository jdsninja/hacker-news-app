import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ConnectedThemeProvider from './utils/ConnectedThemeProvider';
import store from './store';
import App from './App';

injectTapEventPlugin();
addLocaleData([...en]);

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedThemeProvider>
      <App />
    </ConnectedThemeProvider>
  </Provider>, root);
