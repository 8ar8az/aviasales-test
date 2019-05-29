import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import _ from 'lodash';

import * as actions from '../actions';

const currency = handleActions({
  [actions.fetchExchangeRatesSuccess](state, { payload: { usdExchangeRate, eurExchangeRate } }) {
    const { byId } = state;
    return {
      ...state,
      byId: {
        ...byId,
        usd: { ...byId.usd, exchangeRateToRuble: usdExchangeRate },
        eur: { ...byId.eur, exchangeRateToRuble: eurExchangeRate },
      },
    };
  },
}, {
  byId: {
    rub: { id: 'rub', exchangeRateToRuble: 1 },
    usd: { id: 'usd', exchangeRateToRuble: null },
    eur: { id: 'eur', exchangeRateToRuble: null },
  },
  allIds: ['rub', 'usd', 'eur'],
});

const currencyTogglerAccessibilityState = handleActions({
  [combineReducers(
    actions.fetchExchangeRatesRequest,
    actions.fetchExchangeRatesFailure,
  )]: _.constant('disabled'),
  [actions.fetchExchangeRatesSuccess]: _.constant('enabled'),
}, 'disabled');

export default combineReducers({
  currency,
  currencyTogglerAccessibilityState,
  form: formReducer,
});
