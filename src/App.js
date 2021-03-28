import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from './Menu';
import Callback from './spotify-connect/Callback';
import UserProfile from './UserProfile';
import LoginContext from './context/LoginContext';
import { ACCESS_TOKEN_EXPIRES_KEY, ACCESS_TOKEN_KEY, ACCESS_TOKEN_REFRESH_KEY } from './spotify-connect/spotify-connect';

function App() {

  const [tokens, _setTokens] = useState({
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    accessTokenExpires: localStorage.getItem(ACCESS_TOKEN_EXPIRES_KEY),
    accessRefreshKey: localStorage.getItem(ACCESS_TOKEN_REFRESH_KEY)
  })

  const setTokens = (tokens) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, tokens.expiresIn)
    localStorage.setItem(ACCESS_TOKEN_REFRESH_KEY, tokens.refreshToken)
    _setTokens(tokens)
  }

  const value = { tokens, setTokens }

  return (
    <LoginContext.Provider value={value}>
      <Router>
        <Menu />
        <div className="content">
          <Switch>
            <Route path="/callback" component={Callback} />
            <Route path="/me" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </LoginContext.Provider>

  );
}

export default App;
