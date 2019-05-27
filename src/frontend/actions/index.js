import { createAction } from 'redux-actions';

export const fetchExchangeRatesRequest = createAction('EXCHANGE_RATES_FETCH_REQUEST');
export const fetchExchangeRatesSuccess = createAction('EXCHANGE_RATES_FETCH_SUCCESS');
export const fetchExchangeRatesFailure = createAction('EXCHANGE_RATES_FETCH_FAILURE');

export const fetchExchangeRates = () => async (dispatch) => {};
