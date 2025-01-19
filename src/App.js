import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserDetailPage from "./components/UserDetailPage";

const App = () =>  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<UserDetailPage />} />
        </Routes>
    </BrowserRouter>
  );

export default App;
