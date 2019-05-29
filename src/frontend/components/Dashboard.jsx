import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import connect from '../../lib/connect';
import AppContext from './AppContext';

const mapStateToProps = ({ currency, currencyTogglerAccessibilityState }) => ({
  currencyIds: currency.allIds,
  currencyTogglerAccessibilityState,
});

@connect(mapStateToProps)
@reduxForm({
  form: 'dashboard',
  initialValues: { currency: 'rub' },
})
class Dashboard extends React.Component {
  static contextType = AppContext.Context;

  renderCurrencyToggler() {
    const { currencyIds, currencyTogglerAccessibilityState } = this.props;

    return (
      <ul>
        {_.map(currencyIds, currencyId => (
          <li key={currencyId}>
            <Field
              component="input"
              type="radio"
              name="currency"
              value={currencyId}
              id={`currency-${currencyId}`}
              disabled={currencyTogglerAccessibilityState === 'disabled'}
            />
            <label htmlFor={`currency-${currencyId}`}>{currencyId}</label>
          </li>
        ))}
      </ul>
    );
  }

  renderTransshipmentsChoiceList() {
    const { transshipmentsVariants } = this.context;

    return (
      <ul>
        {_.map(transshipmentsVariants, ({ id }) => (
          <li key={id}>
            <Field component="input" name={id} id={id} type="checkbox" />
            <label htmlFor={id}>
              {id}
              <button className="only-button" type="button">/ONLY/</button>
            </label>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <form className="dashboard">
        <fieldset className="currency">
          <legend>/ВАЛЮТА/</legend>
          {this.renderCurrencyToggler()}
        </fieldset>
        <fieldset className="transshipments-count">
          <legend>/КОЛИЧЕСТВО ПЕРЕСАДОК/</legend>
          {this.renderTransshipmentsChoiceList()}
        </fieldset>
      </form>
    );
  }
}

export default Dashboard;
