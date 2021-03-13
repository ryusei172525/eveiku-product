import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import registerBlocks from "./helper/registerBlocks";
import actions from "./action/actions";

registerBlocks();
store.dispatch(actions.loadDataAsync());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
