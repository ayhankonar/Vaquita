import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {CreateRifa, Home, NotFound, Signup, Login, Profile, MyRifas, RifaDetails } from './pages'
import LayoutApp from "./components/LayoutApp";



const Router = () => (
  <BrowserRouter>
  <LayoutApp>
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
      <Route
        exact path= "/profile"
        component={Profile}
      />
       <Route
        exact path= "/new/rifas"
        component={CreateRifa}
      />
      <Route
        exact path= "/rifas/myrifas"
        component={MyRifas}
      />
       <Route
        exact path= "/rifas/:rifaId"
        component={RifaDetails}
      />
      
      <Route component={NotFound} />
    </Switch>
    </LayoutApp>
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