import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFullScreen } from "react-hooks-full-screen";
import brandLogo from "./assets/brand-logo/OpsCareLogo.png";
import brandLogoMarine from "./assets/brand-logo/KeppelOffshoreAndMarineLogo.png";
import assetUser from "./assets/icons/userAccount-img.png";
import { Row, Col, Container, Navbar, Dropdown } from "react-bootstrap";
import NavigationBar from "./components/Navbar";
import FullScreen from "./components/FullScreen";
import { logout } from "./Helper/Auth/auth";

import "./scss/styles.scss";
import "./scss/header.scss";

import { withLayoutManager } from "./Helper/Layout/layout";

import { withAuthManager } from "./Helper/Auth/auth";

//import { withMsal } from "@azure/msal-react";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    //const msalInstance = this.props.msalContext.instance;
    return (
      <header>
        <div className="menu-bar">
          <Container fluid>
            <Row>
              <Col xs={7} sm={7}>
                <Row>
                  <Col>
                    <div className="brand-logo">
                      <img
                        src={brandLogoMarine}
                        className="d-inline-block align-middle img-fluid brand-marine"
                        alt="Brand logo Keppel Offshore and Marine"
                      />
                      <img
                        src={brandLogo}
                        className="d-inline-block align-middle img-fluid brand-ops"
                        alt="Brand logo OpsCare"
                      />
                      <Link to="/" className="nav-link homepage-link">
                        Home
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={5} sm={5}>
                <div className="user-wrapper">
                  <FullScreen />
                  <img
                    className="img-fluid user-avtar"
                    src={assetUser}
                    alt="User Icon"
                    onClick={() => {
                      logout(() => {
                        window.location.href = "/login";
                      });
                    }}
                  />
                </div>
                {/* <Dropdown>
                  <img className="img-fluid" src={assetUser} alt="User Icon" />
                  <Dropdown.Toggle id="dropdown-logout">
                    Asian Lift
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        msalInstance.logout();
                        localStorage.removeItem("authenticationToken");
                        // logout(()=> {
                        //     window.location.href = "/login"
                        // })
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    );
  }
}

export default withLayoutManager(withRouter(Header));
