import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AOS from "aos";

import "./styles/colors.css";
import "./styles/global.css";
import "aos/dist/aos.css";
import { AuthProvider } from "./context/AuthContext";

AOS.init({
  duration: 900,
  once: true,
  offset: 100,
  easing: "ease-in-out",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
