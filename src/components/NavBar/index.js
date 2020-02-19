// React
import React from "react";

// Firebase
import Fire from "../../config/Fire";

// Styles
import "./styles.scss";
import GenericProfile from "./generic-profile.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const db = Fire.firestore();
    Fire.auth().onAuthStateChanged(function(user) {
      if (user) { // User is signed in
        db.collection("profile-pictures") // Check if user has profile picture
        .where("email", "==", Fire.auth().currentUser.email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            document.getElementById("profile-pic").src = doc.data().pic;
          });
        });
      }
    });
    
  }

  logout(e) {
    e.preventDefault();
    Fire.auth().signOut();
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
          <img className="mx-3 ml-5" id="profile-pic" src={GenericProfile} alt="Profile" onMouseEnter={this.openDropdown} onClick={this.toggleCollapse}/>
          <div className="collapse col" id="profile-dropdown">
            <a className="row pl-2 trak_body-small" id="dropdown-item" href="/profile">Profile</a>
            <a className="row pl-2 trak_body-small" id="dropdown-middle" href="/" onClick={this.logout}>Logout</a>
          </div>
          <div id="brand">
            <a className="navbar-brand trak_nav-title"  href="/">
            POOCH
            </a>
          </div>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">Menu</span>
          </button> */}
          <div> 
            <div className="row trak_nav-item" id="nav-pages">
              <div className="col nav-item">
                <a className="nav-link your-pets" href="/your-pets">
                Your Pets
                </a>
              </div>
              <div className="col nav-item">
                <a className="nav-link dog-walking" href="/dog-walking">
                  Dog Walking
                </a>
              </div>
              <div className="col nav-item">
                <a className="nav-link dog-boarding" href="/dog-boarding">
                  Dog Boarding
                </a>
              </div>
              <div className="col nav-item">
                <a className="nav-link dog-services" href="/dog-services">
                  Dog Services
                </a>
              </div>
              <div className="col nav-item">
                <a className="nav-link dog-meetup" href="/dog-meetup">
                  Dog Meetup
                </a>
              </div>
              <div className="col nav-item">
                <a className="nav-link dog-records" href="/dog-records">
                  Dog Records
                </a>
              </div> 
            </div>
          </div>
        </nav>     
      </div>
    );
  }
}

export default NavBar;
