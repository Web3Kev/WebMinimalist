import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppHelp from "./AppHelp";
// Check if we have a valid room url
const urlParams = new URLSearchParams(window.location.search);
const roomUrl = urlParams.get("roomUrl");
const displayName = urlParams.get("displayName") || "guest";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {roomUrl ? <App roomUrl={roomUrl} displayName={displayName}/> : <AppHelp />}
  </React.StrictMode>
);
