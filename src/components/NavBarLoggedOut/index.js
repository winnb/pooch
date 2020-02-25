// React
import React from "react";

// Styles
import "./styles.scss";

class NavBarLoggedOut extends React.Component {

  openSignup() {
    document.getElementById("login-outer").className = "collapse";
    document.getElementById("change-password-outer").className = "collapse";
    document.getElementById("signup-outer").className = "collapse.show";
  }

  openLogin() {
    document.getElementById("signup-outer").className = "collapse";
    document.getElementById("change-password-outer").className = "collapse";
    document.getElementById("login-outer").className = "collapse.show";
  }

  render() {
    return (
      <div className="navbar">
        <nav className="navbar navbar-expand-lg fixed-top py-5">
          <a className="navbar-brand trak_nav-title ml-2" href="/">
            POOCH
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
            <ul className="navbar-nav mr-auto ml-3 trak_nav-item">
              <li className="nav-item">
                <a className="nav-link your-pets" href="/#section1">
                Your Pets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-walking" href="/#section2">
                  Dog Walking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-boarding" href="/#section3">
                  Dog Boarding
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-services" href="/#section4">
                  Dog Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-meetup" href="/#section5">
                  Dog Meetup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-records" href="/#section6">
                  Dog Records
                </a>
              </li> 
            </ul>
            <div className="col trak_nav-item" id="profile-dropdown">
              <button className="row mb-3" id="dropdown-item" onClick={this.openLogin}>Login</button>
              <button className="row mt-3" id="dropdown-item" onClick={this.openSignup}>Create Account</button>
            </div>
          </div>
        </nav>     
      </div>
    );
  }
}

export default NavBarLoggedOut;
