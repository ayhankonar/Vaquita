import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound';
import {Home, NotFound, Signup, Login} from './pages'

// const Signup = () => <h1>Signup</h1>
// const Login = () => <h1>Login</h1>

const Router = () => {
  return (
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
  )
  
  }

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