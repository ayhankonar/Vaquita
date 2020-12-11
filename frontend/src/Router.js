import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {CreateRifa, Home, NotFound, Signup, Login, Profile, MyRifas, ProfileEdit, RifaDetails, EditRifa, MyTickets } from './pages'

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
        exact path= "/profile/edit/:id"
        component={ProfileEdit}
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
      <Route
        exact path= "/rifas/edit/:rifaId"
        component={EditRifa}
      />
      <Route
        exact path= "/tickets/mytickets"
        component={MyTickets}
      />
      
      <Route component={NotFound} />
    </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
