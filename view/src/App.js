import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import Header from './components/header';
import Account from './components/account';
import Projects from './components/projects';
import Sidebar from './components/sidebar';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Sidebar />
          <Switch>
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/" component={home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;