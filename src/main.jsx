import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { SocketConextProvider } from "./Context/SocketContext.jsx";


createRoot(document.getElementById("root")).render(
  <>
  <SocketConextProvider>
    <BrowserRouter>

        <Provider store={store}>
          <App />
        </Provider>
    
     
    </BrowserRouter>

  </SocketConextProvider>
  </>
);
