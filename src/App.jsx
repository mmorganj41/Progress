import { Route, Routes, Navigate } from "react-router-dom";
import React, {useState} from 'react';
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import { UserContext } from "./utils/context";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HeaderLayout from './pages/HeaderLayout/HeaderLayout'

import userService from "./utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout()
    setUser(null);
  }

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<HeaderLayout handleLogout={handleLogout} />} 
          >
            
              <Route index element={<h1>Home Pageeeeeeeeeee</h1>} />
            
          </Route>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
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
