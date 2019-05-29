/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';

const getCurrencyById = state => state.currency.byId;

export const currentCurrencySelector = createSelector(
  [getCurrencyById, getFormValues('dashboard')],
  (currencyById, { currency: currentCurrencyId }) => ({
    id: currentCurrencyId,
    exchangeRate: currencyById[currentCurrencyId].exchangeRateToRuble,
  }),
);
