import './App.css';
import React from 'react';
import ConnectSpotify from './spotify-connect/ConnectSpotify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from './Menu';
import Callback from './spotify-connect/Callback';
import UserProfile from './UserProfile';


function App() {
  return (
    <Router>
      <Menu />
      <div className="content">
        <Switch>
          <Route path="/login" component={ConnectSpotify} />
          <Route path="/callback" component={Callback} />
          <Route path="/me" component={UserProfile} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
