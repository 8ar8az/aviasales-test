import { createAction } from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

import routes from '../routes';

export const fetchExchangeRatesRequest = createAction('EXCHANGE_RATES_FETCH_REQUEST');
export const fetchExchangeRatesSuccess = createAction('EXCHANGE_RATES_FETCH_SUCCESS');
export const fetchExchangeRatesFailure = createAction('EXCHANGE_RATES_FETCH_FAILURE');

export const fetchTicketsRequest = createAction('TICKETS_FETCH_REQUEST');
export const fetchTicketsSuccess = createAction('TICKETS_FETCH_SUCCESS');
export const fetchTicketsFailure = createAction('TICKETS_FETCH_FAILURE');

export const fetchTickets = () => async (dispatch) => {
  const normalizetData = (data) => {
    const { tickets } = data;
    return { tickets: _.map(tickets, ticket => ({ ...ticket, id: _.uniqueId() })) };
  };

  dispatch(fetchTicketsRequest());
  try {
    const { data } = await axios.get(routes.tickets());
    dispatch(fetchTicketsSuccess(normalizetData(data)));
  } catch (err) {
    dispatch(fetchTicketsFailure());
  }
};

export const fetchExchangeRates = () => async (dispatch) => {
  dispatch(fetchExchangeRatesRequest());

  try {
    const { data } = await axios.get(routes.exchangeRates());
    dispatch(fetchExchangeRatesSuccess(data));
  } catch (err) {
    dispatch(fetchExchangeRatesFailure());
  }
};
