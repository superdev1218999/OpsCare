import React from "react";
import { Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./auth";
import Login from "../../pages/Account/Login";
//import Dashboard from "../../pages/Home/Home";
//import Dashboard from "../../pages/700T/SevenHundredTHome";
import { useIsAuthenticated } from "@azure/msal-react";
function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useIsAuthenticated();
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ user, setUser }) => {
          return (
            <Route
              {...rest}
              render={
                (props) => (
                  // <Component {...props} />
                  // isAuthenticated === true && user.authKey !== null ? (
                  <Component {...props} />
                )
                // ) :
                // (
                // <Login />
                // )
              }
            />
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default PrivateRoute;
