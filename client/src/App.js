import React, { useEffect } from "react";
import { useHttp } from "./hooks/http.hook";
import { useAuth } from "./hooks/auth.hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/auth.context";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LangContext from "./context/lang.context";
import Auth from './pages/Auth';

function App() {
  const { login, logout, userId } = useAuth();
  const { request } = useHttp();

  let isAuthentificated = false;

  useEffect(() => {
    async function requestUser() {
      let data;
      try {
        data = await request("/api/user/");
      } catch (e) {
        data = null;
      }
      return data;
    }

    requestUser().then((data) => {
      if (data) {
        isAuthentificated = true;
      }
    });
  }, [request]);

  return (
    <AuthContext.Provider value={{ login, logout, userId, isAuthentificated }}>
      <LangContext.Provider>
        <Router>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </LangContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
