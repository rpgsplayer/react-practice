import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Welcome from './Welcome';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Pagination from './Pagination';
import InfiniteScrolling from './InfiniteScrolling';
import Loading from './Loading';
import AuthenticationContext from './AuthenticationContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if(localStorage.token || sessionStorage.token) {
      let token = localStorage.token || sessionStorage.token;
      fetch('http://react-practice/verify/token/' + token, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((json) => {
          setLoggedIn(json.success);
          setAuthLoading(false);
        });
    }
    else {
      setAuthLoading(false);
    }
  });

  return (
    <BrowserRouter>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <AuthenticationContext.Provider value={{loggedIn, setLoggedIn, authLoading, setAuthLoading, firstName, setFirstName}}>
          <Switch>
            <Route path="/home/pagination" render={() => authLoading ? <Loading /> : loggedIn ? <Pagination /> : <Redirect to="/login" /> } />
            <Route path="/home/infinite-scroll" render={() => authLoading ? <Loading /> : loggedIn ? <InfiniteScrolling /> : <Redirect to="/login" /> } />
            <Route path="/home" render={() => authLoading ? <Loading /> : loggedIn ? <Home /> : <Redirect to="/login" /> } />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Welcome} />
          </Switch>
        </AuthenticationContext.Provider>
      </AnimatedSwitch>
    </BrowserRouter>
  );  
}

export default App;
