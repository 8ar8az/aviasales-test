import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const fetchExchangeRatesRequest = createAction('EXCHANGE_RATES_FETCH_REQUEST');
export const fetchExchangeRatesSuccess = createAction('EXCHANGE_RATES_FETCH_SUCCESS');
export const fetchExchangeRatesFailure = createAction('EXCHANGE_RATES_FETCH_FAILURE');

export const fetchExchangeRates = () => async (dispatch) => {
  dispatch(fetchExchangeRatesRequest());

  try {
    const { data } = await axios.get(routes.exchangeRates());
    dispatch(fetchExchangeRatesSuccess(data));
  } catch (err) {
    dispatch(fetchExchangeRatesFailure());
  }
};
