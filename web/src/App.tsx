import React from "react";

import { Provider } from "react-redux";
import store from "./store";

import { GlobalStyle } from "./styles/GlobalStyles";
import Contexts from "./contexts";

import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import Session from "./components/SessionUser";

import Routes from "./routes";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Contexts>
          <GlobalStyle />
          <SuccessMessage />
          <ErrorMessage />
          <Session />
          <Routes />
        </Contexts>
      </Provider>
    </>
  );
};

export default App;
