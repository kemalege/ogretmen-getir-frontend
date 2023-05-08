import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux/es/exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./app/api/apiSlice";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>    
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    
  </Provider>
);
