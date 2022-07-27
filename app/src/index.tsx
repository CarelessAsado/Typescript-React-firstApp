import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TareaContextProvider } from "Context/context";

import GlobalStyle from "Global styles/Globalstyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <TareaContextProvider>
        <App />
      </TareaContextProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
