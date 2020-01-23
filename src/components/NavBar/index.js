// React
import React from "react";

// Firebase
import fire from "../../config/Fire";

// Styles
import "./styles.scss";
import LadyAndDog from "./LadyAndDog.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    fire.auth().signOut();
    // Redirect to login page so user doesn't get 404 error
    setTimeout(() => {
      window.location.replace("/");
    }, 100);
  }

  toggleCollapse() {
    if (document.getElementById("profile-dropdown").className === "collapse col") {
        document.getElementById("profile-dropdown").className = "collapse.show col";
    }
    else if (document.getElementById("profile-dropdown").className === "collapse.show col") {
        document.getElementById("profile-dropdown").className = "collapse col"; 
    }
  }

  collapseDropdown() {
        document.getElementById("profile-dropdown").className = "collapse col";
  }

  openDropdown() {
    document.getElementById("profile-dropdown").className = "collapse.show col";
  }

  render() {
    return (
      <div className="navbar">
        <nav className="navbar navbar-expand-lg fixed-top py-5" onMouseLeave={this.collapseDropdown}>
          <img className="mx-3 ml-5" id="profile-pic" src={LadyAndDog} alt="Profile" onMouseEnter={this.openDropdown} onClick={this.toggleCollapse}/>
          <div className="collapse col" id="profile-dropdown">
            <a className="row pl-2 trak_body-small" id="dropdown-item" href="/profile">Profile</a>
            <a className="row pl-2 trak_body-small" id="dropdown-middle" href="/" onClick={this.logout}>Logout</a>
          </div>
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
                <a className="nav-link your-pets" href="/your-pets">
                Your Pets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-walking" href="/dog-walking">
                  Dog Walking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-boarding" href="/dog-boarding">
                  Dog Boarding
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-services" href="/dog-services">
                  Dog Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-meetup" href="/dog-meetup">
                  Dog Meetup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link dog-records" href="/dog-records">
                  Dog Records
                </a>
              </li> 
            </ul>
            <form className="form-inline my-2 my-lg-0">
            </form>
          </div>
        </nav>     
      </div>
    );
  }
}

export default NavBar;
