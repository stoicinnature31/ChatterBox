import React from "react";
import ReactDOM from 'react-dom/client';
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </HelmetProvider>
  </React.StrictMode>,
);
