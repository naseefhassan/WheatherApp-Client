import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PlaceProvider } from "./Context/City.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaceProvider>
        <App />
      </PlaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
