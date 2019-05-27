import React from 'react';

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

  render() {
    const { ticket } = this.props;

    return (
      <figure className="ticket">
        <section className="buy">
          <div className="carrier" data-carrier-name={ticket.carrier} />
          <button type="button" className="buy-button">
            Купить
            <br />
            {`за ${ticket.price}`}
          </button>
        </section>
        <section className="info">
          {this.renderTicketWaypoint(ticket, 'departure')}
          <div className="transshipments-info">{`${ticket.stops} пересадок`}</div>
          {this.renderTicketWaypoint(ticket, 'arrival')}
        </section>
      </figure>
    );
  }
}

export default Ticket;
