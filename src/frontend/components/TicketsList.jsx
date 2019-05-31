import React from 'react';
import _ from 'lodash';

import Ticket from './Ticket';
import connect from '../../lib/connect';
import { ticketsSelector } from '../selectors';

const mapStateToProps = state => ({
  tickets: ticketsSelector(state),
});

@connect(mapStateToProps)
class TicketsList extends React.Component {
  render() {
    const { tickets } = this.props;

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
