/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';
import _ from 'lodash';

const getCurrencyById = state => state.currency.byId;

const getTicketsById = state => state.tickets.byId;
const getTicketsIds = state => state.tickets.allIds;

export const currentCurrencySelector = createSelector(
  [getCurrencyById, getFormValues('dashboard')],
  (currencyById, { currency: currentCurrencyId }) => ({
    id: currentCurrencyId,
    exchangeRate: currencyById[currentCurrencyId].exchangeRateToRuble,
  }),
);

export const ticketsSelector = createSelector(
  [getTicketsById, getTicketsIds],
  (ticketsById, ticketsIds) => _.map(ticketsIds, id => ticketsById[id]),
);
