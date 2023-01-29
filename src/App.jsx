import { Route, Routes, Navigate } from "react-router-dom";
import React, {useState} from 'react';
import "./App.css";
import 'semantic-ui-css/semantic.min.css'

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage"

import userService from "./utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
        <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      </Routes>
    );
  } 
  return (
    <Routes>
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
