// databaseContext.js
import React, { createContext, useContext } from "react";

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children, database }) => (
  <DatabaseContext.Provider value={database}>
    {children}
  </DatabaseContext.Provider>
);

export const useDatabase = () => useContext(DatabaseContext);
