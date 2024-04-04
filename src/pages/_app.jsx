import "../globals.css";

// pages/_app.jsx

import { useEffect, useState } from "react";

import { DatabaseProvider } from "../components/DatabaseContext";

function MyApp({ Component, pageProps }) {
  const [dataBase, setDataBase] = useState({
    reservations: [],
    tables: [],
  });

  useEffect(() => {
    const initDb = async () => {
      try {
        // Initialize the database
        const initResponse = await fetch("./api/initialize-db");
        if (!initResponse.ok) {
          throw new Error("Error initializing database");
        }
        const initResult = await initResponse.json();
        console.log(initResult.message);

        // Fetch tables
        const tablesResponse = await fetch("./api/table");
        if (!tablesResponse.ok) {
          throw new Error("Error fetching tables");
        }
        const tablesResult = await tablesResponse.json();
        console.log(tablesResult.message);
        console.log(tablesResult.data);
        setDataBase((prevData) => ({ ...prevData, tables: tablesResult.data }));

        // Fetch reservations
        const reservationsResponse = await fetch("./api/reservation");
        if (!reservationsResponse.ok) {
          throw new Error("Error fetching reservations");
        }
        const reservationsResult = await reservationsResponse.json();
        console.log(reservationsResult.message);
        console.log(reservationsResult.data);

        setDataBase((prevData) => ({
          ...prevData,
          reservations: reservationsResult.data,
        }));
      } catch (error) {
        console.error("Error initializing database:", error.message);
      }
    };

    initDb();
  }, []);

  return (
    <DatabaseProvider database={dataBase}>
      <Component {...pageProps} />
    </DatabaseProvider>
  );
}

export default MyApp;
