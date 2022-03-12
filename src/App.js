import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertsContextProvider } from "./context/alerts-context";
import { Navbar } from "./components/Navbar/Navbar";

import MapView from "./pages//Map/MapView";
import Alert from "./pages/Alert/Alert";
import Alerts from "./pages/Alerts/Alerts";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <AlertsContextProvider>
        <Navbar />
        <div className="container my-5">
          <Routes>
            <Route path="/map" element={<MapView />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/:id" element={<Alert />} />
            <Route path="/" element={<Alert />} />
          </Routes>
        </div>
      </AlertsContextProvider>
    </BrowserRouter>
  );
}

export default App;
