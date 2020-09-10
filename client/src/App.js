import React, { useEffect, useState } from "react";
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
  const [userId, setUserId] = useState(null);

  const checkAuth = async () => {
    if (isAuthentificated) return;

    let data;
    try {
      data = await request("/api/user/");
      // data = await fetch("/api/user", { credentials: "include" });
    } catch (e) {
      data = null;
    }

    if (data) {
      setIsAuthentificated(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isAuthentificated }}>
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
