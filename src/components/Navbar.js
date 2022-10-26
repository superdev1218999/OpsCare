import React from "react";
import { Link } from "react-router-dom";
import assetMain from "../assets/icons/OpsCare_Icon.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = ({ navbarCheck }) => {
  return (
    <>
      <div
        className={`hamburger-wrapper ${navbarCheck ? "hamburger-open" : ""}`}
      >
        <Navbar variant="transparent" expand={true}>
          <Container fluid>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="flex-column">
                <div className="nav-items">
                  <div className="nav-module">
                    <div className="nav-content">
                      <div className="nav-content-img">
                        <img
                          className="img-fluid"
                          src={assetMain}
                          alt="Nav Icons"
                        />
                      </div>
                      <NavDropdown
                        title="Smart Yard"
                        id="hamburgerNavYard"
                        className="navbar-wrapper"
                      >
                        <Link to="/energy" className="dropdown-item disabled">
                          Energy
                        </Link>
                        <Link to="/opsview" className="dropdown-item disabled">
                          OpsView
                        </Link>
                        <Link
                          to="/substation"
                          className="dropdown-item disabled"
                        >
                          Substation
                        </Link>
                      </NavDropdown>
                    </div>
                  </div>
                </div>
                {/* End Nav Items */}
                <div className="nav-items">
                  <div className="nav-module selected">
                    <div className="nav-content">
                      <div className="nav-content-img">
                        <img
                          className="img-fluid"
                          src={assetMain}
                          alt="Nav Icons"
                        />
                      </div>
                      <NavDropdown
                        title="Smart Asset"
                        id="hamburgerNavAsset"
                        className="navbar-wrapper"
                      >
                        <Link to="/" className="dropdown-item">
                          OpsCare
                        </Link>
                      </NavDropdown>
                    </div>
                  </div>
                </div>
                {/* End Nav Items */}
                <div className="nav-items">
                  <div className="nav-module">
                    <div className="nav-content">
                      <div className="nav-content-img">
                        <img
                          className="img-fluid"
                          src={assetMain}
                          alt="Nav Icons"
                        />
                      </div>
                      <NavDropdown
                        title="Tech-enabled Workforce"
                        id="hamburgerNavTech"
                        className="navbar-wrapper"
                      >
                        <Link to="/people" className="dropdown-item disabled">
                          People
                        </Link>
                        <Link to="/kompi" className="dropdown-item disabled">
                          KomPI
                        </Link>
                      </NavDropdown>
                    </div>
                  </div>
                </div>
                {/* End Nav Items */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavigationBar;
