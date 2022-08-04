import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from "./redux/store"
// Call make Server
makeServer();

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
console.log(store.getState())
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);