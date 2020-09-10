import React, { useEffect, useState, useCallback } from "react";
import { useHttp } from "./hooks/http.hook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext from "./context/auth.context";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  const { request } = useHttp();
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [username, setUsername] = useState('');

  const checkAuth = useCallback(async () => {
    if (isAuthentificated) return;

    let data;
    try {
      data = await request("/api/user/");

      setUsername(data.username);

    } catch (e) {
      data = null;
    }

    if (data) {
      setIsAuthentificated(true);
    }
  }, [isAuthentificated, request]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ username, isAuthentificated }}>
      <Router>
        <Switch>
          <Route path="/profile">
            {!isAuthentificated && <Redirect to="/auth" />}
            <Profile />
          </Route>
          <Route path="/auth">
            {isAuthentificated && <Redirect to="/profile" />}
            <Auth />
          </Route>
          <Route path="/:id?" component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
