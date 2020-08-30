import React, { useEffect } from "react";
import { useHttp } from "./hooks/http.hook";
import { useAuth } from "./hooks/auth.hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/auth.context";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LangContext from "./context/lang.context";

function App() {
  const { login, logout, userId } = useAuth();
  const { request } = useHttp();

  useEffect(() => {
    // TODO: Auth
    request();
  }, [request]);

  return (
    <AuthContext.Provider value={{ login, logout, userId }}>
      <LangContext.Provider>
        <Router>
          <Switch>
            <Route path="/profile">
              <Profile />
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
