import React from 'react';
import _ from 'lodash';

import AppContext from './AppContext';
import Ticket from './Ticket';

class TicketsList extends React.Component {
  static contextType = AppContext.Context;

  render() {
    const { tickets } = this.context;

    return (
      <ul className="tickets-list">
        {_.map(tickets, ticket => (
          <li key={ticket.id}>
            <Ticket ticket={ticket} />
          </li>
        ))}
      </ul>
    );
  }
}

export default TicketsList;
