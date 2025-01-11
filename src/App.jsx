import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";

import Userprofile from "./Pages/Userprofile";
import Messaging from "./Pages/Messaging";
import Friends from "./Pages/Friends";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ErrorPage from "./Pages/ErrorPage";
import Setting from "./Pages/Setting";
import { Toaster } from "react-hot-toast";
import Auth from "./utils/Auth";

import Otp from "./Pages/Otp";
import SinglePost from "./Pages/SinglePost";
import ChatMessage from "./Pages/ChatMessage";

function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/signup", "/verify"];
  return (
    <>
      {!noNavbarRoutes.includes(location?.pathname) && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Otp />} />
        <Route path="*" element={<ErrorPage />} />

        {/* protecting route here  */}
        <Route path="/" element={<Auth />}>
          <Route index element={<Home />} />
          <Route path="singlepost/:id" element={<SinglePost />} />
          <Route path="profile">
            <Route path=":id" element={<Userprofile />} />

            <Route path="singleuserdata/:id" element={<Userprofile />} />
          </Route>

          <Route path="message/">
            <Route index element={<Messaging />} />
            <Route path=":id" element={<ChatMessage />} />
          </Route>
          <Route path="friends" element={<Friends />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
