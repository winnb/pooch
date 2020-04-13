// React
import React from "react";

// Styles
import "./styles.scss";

class NavBarLoggedOut extends React.Component {

  openSignup() {
    document.getElementById("login-box").className = "collapse";
    document.getElementById("password-box").className = "collapse";
    document.getElementById("signup-box").className = "collapse.show";
  }

  openLogin() {
    document.getElementById("signup-box").className = "collapse";
    document.getElementById("password-box").className = "collapse";
    document.getElementById("login-box").className = "collapse.show";
  }

  render() {
    return (
      <div className="navbar">
        <div className="pooch-navbar-item fixed-top" id="new-tip">New to Pooch? Start here <b>↑</b></div>
        <nav className="nav-bar row fixed-top" >
          <a className="pooch-brand" id="pooch"  href="/">POOCH</a>
          <div className="pooch-navbar-item row" id="nav-pages">
            <a classname="col" id="your-pets" href="/">Your Pets</a>
            <a classname="col" id="dog-walking" href="/">Dog Walking</a>
            <a classname="col" id="dog-boarding" href="/">Dog Boarding</a>
            <a classname="col" id="dog-services" href="/">Dog Services</a>
            <a classname="col" id="dog-meetup" href="/">Dog Meetups</a>
            <a classname="col" id="dog-records" href="/">Dog Records</a> 
          </div>
          <div id="login-options">
            <div className="pooch-navbar-item">
              <div className="nav-button" onClick={this.openLogin}>Login</div>
              <div className="nav-button"onClick={this.openSignup}>Create Account</div>
            </div>
          </div>
        </nav>          
      </div>
    );
  }
}

export default NavBarLoggedOut;
