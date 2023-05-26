import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux/es/exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./app/api/apiSlice";
import { persistor, store } from "./app/store";
import {Toaster} from "react-hot-toast"
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <Toaster/>    
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
  </Provider>
);
