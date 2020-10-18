import React, { useContext } from "react";

import "./App.css";
import UserProvider from "./providers/UserProvider";
import UserContext from "./providers/UserProvider";
import Dashboard from "./components/dashboard";

const App = () => {
  const user = useContext(UserContext);

  return user ? (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  ) : (
    <UserProvider>
      <AuthPage />
    </UserProvider>
  );
};

export default App;
