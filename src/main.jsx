import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";


createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
     <Auth0Provider 
      domain="dev-s2o8xwiy288oq0mb.us.auth0.com"
      clientId="YvZQh6qqKxgZMZoRtdX7KLQl4aQ6kjeh"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
     >

        <Provider store={store}>
          <App />
        </Provider>
     </Auth0Provider>
     
    </BrowserRouter>
  </>
);
