import React from 'react';
import { Route, Routes } from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard.js";
import Auth from "./components/Auth.js";

function App(props) {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;