import '@babel/polyfill';
import './assets/styles/styles.less';
import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import gon from 'gon';

import AppContext from './components/AppContext';
import App from './components/App';
import reducers from './reducers';
import { fetchExchangeRates } from './actions';

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

const normalizeInitData = (initData) => {
  const { tickets } = initData;
  return { tickets: _.map(tickets, ticket => ({ ...ticket, id: _.uniqueId() })) };
};

const transshipmentsVariants = [
  { id: 'transshipments-all' },
  { id: 'transshipments-none', count: 0 },
  { id: 'transshipments-one', count: 1 },
  { id: 'transshipments-two', count: 2 },
  { id: 'transshipments-three', count: 3 },
];

const startApp = (initData) => {
  const store = initializeStore();
  store.dispatch(fetchExchangeRates());

  const normalizedData = normalizeInitData(initData);
  const application = initializeApplication(store, { ...normalizedData, transshipmentsVariants });

  ReactDOM.render(
    application,
    document.getElementById('root'),
  );
};

startApp(gon);
