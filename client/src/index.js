import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App.jsx";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/700.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
//devTools
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { logger } from "redux-logger/src";
import { getUsers } from "./actions/users.action";
import { getPosts } from "./actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
