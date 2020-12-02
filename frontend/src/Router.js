import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Home from './components/home/Home';
// import NotFound from './components/404/NotFound.js';
import {Home, NotFound, Signup, Login} from './pages'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route 
        exact path="/" 
        component={Home} 
      />
      <Route
        exact path= "/signup"
        component={Signup}
      />
      <Route
        exact path= "/login"
        component={Login}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

// import axios from 'axios'

// const baseURL = process.env.NODE_ENV === 'development' ?
//   'http://localhost:3000/' :
//   '/'

// const authService = axios.create({
//   baseURL,
//   withCredentials: true
// })

// export const signupFn = userInfo =>
//   authService.post('/signup', userInfo)

// export const loginFn = userInfo =>
// authService.post('/login', userInfo)