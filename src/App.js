import React from "react";

import "./App.css";
import UserProvider from "./providers/UserProvider";

import AdminDashboard from "./components/sign-in";

const App = () => (
  <UserProvider>
    <AdminDashboard />
  </UserProvider>
);

export default App;
