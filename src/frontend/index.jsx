import '@babel/polyfill';
import './assets/styles/styles.less';
import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AppContext from './components/AppContext';
import App from './components/App';
import reducers from './reducers';
import { fetchExchangeRates, fetchTickets } from './actions';

const initializeStore = () => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );
  return store;
};

const initializeApplication = (store, contextValue) => (
  <Provider store={store}>
    <AppContext value={contextValue}>
      <App />
    </AppContext>
  </Provider>
);

const transshipmentsVariants = [
  { id: 'transshipments-all' },
  { id: 'transshipments-none', count: 0 },
  { id: 'transshipments-one', count: 1 },
  { id: 'transshipments-two', count: 2 },
  { id: 'transshipments-three', count: 3 },
];

const startApp = () => {
  const store = initializeStore();
  store.dispatch(fetchTickets());
  store.dispatch(fetchExchangeRates());

  const application = initializeApplication(store, { transshipmentsVariants });

  ReactDOM.render(
    application,
    document.getElementById('root'),
  );
};

startApp();
