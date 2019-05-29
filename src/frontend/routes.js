import path from 'path';

const apiRoute = '/api';

export default {
  exchangeRates: () => path.join(apiRoute, 'exch-rates'),
};
