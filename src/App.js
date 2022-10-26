import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PrivateRoute from "./Helper/Auth/privateRoute.js";

// Components
import NavHeader from "./Header.js";

import {
  Messages,
  MessageProvider,
  MessageContext,
} from "./Helper/Message/MessageRenderer";
import { AuthContext, AuthProvider, useAuth } from "./Helper/Auth/auth";
// import { useIsAuthenticated } from "@azure/msal-react";

// Pages
import Crane from "./pages/700T/700THome.js";
// import Home from "./pages/Home/Home";
import Sign from "./pages/Account/signin.js";
import Login from "./pages/Account/Login.js";
//import AssetManagement from "./pages/AssetManagement/Home.js";
//import Operation from "./pages/Operation/Home.js";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
} from "recharts";

const pdata = [
  {
    name: "MongoDb",
    fees: 120,
  },
  {
    name: "Javascript",
    fees: 12,
  },
  {
    name: "PHP",
    fees: 60,
  },
  {
    name: "Java",
    fees: 25,
  },
  {
    name: "C#",
    fees: 190,
  },
  {
    name: "C++",
    fees: 20,
  },
];

function App() {
  // const isAuthenticated = useIsAuthenticated();

  return (
    <AuthProvider>
      <MessageProvider>
        {/* <Router basename={`/${process.env.REACT_APP_FRONTENDSUBDIR}`}> */}
        <Router>
          <MessageContext.Consumer>
            {({ messages, setMessages }) => {
              return <Messages setMessages={setMessages}></Messages>;
            }}
          </MessageContext.Consumer>
          <AuthContext.Consumer>
            {({ user, setUser }) => {
              if (localStorage.getItem("authenticationToken") != null) {
                return (
                  <>
                    <NavHeader />
                  </>
                );
              }
              <NavHeader />
            }}
          </AuthContext.Consumer>
          <NavHeader />
          <PrivateRoute path="/700T" component={Crane} />
          <PrivateRoute path="/sign" exact component={Sign} />
          <PrivateRoute path="/login" exact component={Login} />
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
