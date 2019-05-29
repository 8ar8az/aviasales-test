import React from 'react';
import cn from 'classnames';
import _ from 'lodash';

import connect from '../../lib/connect';
import { currentCurrencySelector } from '../selectors';

const gettersWaypointInfoFromTicket = {
  departure: ticket => [
    ticket.origin_name,
    ticket.origin,
    ticket.departure_date,
    ticket.departure_time,
  ],
  arrival: ticket => [
    ticket.destination_name,
    ticket.destination,
    ticket.arrival_date,
    ticket.arrival_time,
  ],
};

const mapStateToProps = state => ({
  currentCurrency: currentCurrencySelector(state),
});

@connect(mapStateToProps)
class Ticket extends React.Component {
  renderTicketWaypoint = (ticket, waypointType) => {
    const [city, airportAbbr, date, time] = gettersWaypointInfoFromTicket[waypointType](ticket);

    return (
      <div className={`waypoint ${waypointType}`}>
        <p className="time">{time}</p>
        <p className="airport">{waypointType === 'departure' ? `${airportAbbr}, ${city}` : `${city}, ${airportAbbr}`}</p>
        <p className="date">{date}</p>
      </div>
    );
  };

  renderCurrencySymbol = (currencyId) => {
    const classes = cn({
      'currency-symbol': true,
      euro: currencyId === 'eur',
      dollar: currencyId === 'usd',
      ruble: currencyId === 'rub',
    });

    const symbols = {
      eur: '&euro;',
      usd: '$',
      rub: 'P',
    };

    // eslint-disable-next-line react/no-danger
    return <span className={classes} dangerouslySetInnerHTML={{ __html: symbols[currencyId] }} />;
  };

  render() {
    const { ticket, currentCurrency } = this.props;

    return (
      <figure className="ticket">
        <section className="buy">
          <div className="carrier" data-carrier-name={ticket.carrier} />
          <button type="button" className="buy-button">
            Купить
            <br />
            {`за ${_.round(ticket.price / currentCurrency.exchangeRate, 2).toLocaleString()} `}
            {this.renderCurrencySymbol(currentCurrency.id)}
          </button>
        </section>
        <section className="info">
          {this.renderTicketWaypoint(ticket, 'departure')}
          <div className="transshipments-info">{`${ticket.stops} пересадки`}</div>
          {this.renderTicketWaypoint(ticket, 'arrival')}
        </section>
      </figure>
    );
  }
}

export default Ticket;
