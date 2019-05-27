import React from 'react';

const Context = React.createContext();

const AppContext = ({ value, children }) => (
  <Context.Provider value={value}>
    {children}
  </Context.Provider>
);

AppContext.Context = Context;

export default AppContext;
