import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages//Users/Users';
import Auth from './user/pages/Auth/Auth';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import Footer from './shared/components/Footer/Footer';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId, userEmail } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        {/* if user attempts to reach non-existent path, redirect to root */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {/* if user attempts to reach private route, redirect to /auth */}
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        email: userEmail,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation currentUser={userEmail} />
        <main>{routes}</main>
        <Footer>Developed by Michael Grier &copy; 2021</Footer>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
