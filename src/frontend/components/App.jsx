import React from 'react';

import Dashboard from './Dashboard';
import TicketsList from './TicketsList';

const App = () => (
  <>
    <aside>
      <Dashboard />
    </aside>
    <section>
      <TicketsList />
    </section>
  </>
);

export default App;
