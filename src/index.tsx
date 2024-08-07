import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./services";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
