import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import { Provider } from "react-redux";
import configureStore from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Provider store={configureStore}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
