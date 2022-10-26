import React, { useState, useEffect } from "react";
// import { useMsal, useAccount } from "@azure/msal-react";
import Model from "../../model/Model";
import axios from 'axios';
const AuthContext = React.createContext();
const useAuth = () => React.useContext(AuthContext);
const api = new Model();
function AuthProvider(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        api.postReq('/token/verify',{
            token :  localStorage.getItem("authenticationToken")
        },(data,err) => {
            if (data && data.value && data.value.token) {
                localStorage.setItem("authenticationToken",data.value.token)
                var newUser = data.value 
                newUser.isAuthenticated = true
                setUser(newUser)
                console.log("auth_token verify", user);
            } else {
                user.isAuthenticated = false
                setUser({isAuthenticated :false})
            }
        })
    }, [user.isAuthenticated]); 
    return (
        <AuthContext.Provider value={{ user, setUser }} {...props}>
            {props.children}
        </AuthContext.Provider>
    );
}

function authenticate(username, password, isPublic, callback) {
  api.postReq('/users/login',{username : username, password : password}, (data,err) => {
      if (data != null && data.value) {
          if (data.success) {
              localStorage.setItem("authenticationToken",data.value.token)
              callback(true, data.value)
          } else {
              console.log("users login", data.error);
              localStorage.setItem("message", data.error);
              callback(false, data.value)
          }
      } else if (data != null && data.error) {
              console.log("users null", data.error);
              localStorage.setItem("message", data.error);
              callback(false, data.error)
      } else {
          callback(false, null)
      }
  })
}

function logout(callback) {
  localStorage.removeItem("authenticationToken");
  callback(true);
}
function withAuthManager(Component) {
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <Component
              {...remainingProps}
              {...context}
              user={context.user}
              ref={wrappedComponentRef}
            />
          );
        }}
      </AuthContext.Consumer>
    );
  };
  C.WrappedComponent = Component;
  return C;
}

export {
  AuthProvider,
  useAuth,
  AuthContext,
  authenticate,
  logout,
  withAuthManager,
};
