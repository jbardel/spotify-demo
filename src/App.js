import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from './Menu';
import Callback from './login/Callback';
import UserProfile from './UserProfile';
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_REFRESH, LoginContext } from './login/LoginContext';
import Playlist from './Playlist';

function App() {

  const [tokens, _setTokens] = useState({
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    accessTokenExpires: localStorage.getItem(ACCESS_TOKEN_EXPIRES),
    accessTokenRefresh: localStorage.getItem(ACCESS_TOKEN_REFRESH)
  })

  const setTokens = (tokens) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(ACCESS_TOKEN_EXPIRES, tokens.expiresIn)
    localStorage.setItem(ACCESS_TOKEN_REFRESH, tokens.refreshToken)
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
            <Route path="/playlist" component={Playlist} />
            <Route path="/me" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </LoginContext.Provider>

  );
}

export default App;
