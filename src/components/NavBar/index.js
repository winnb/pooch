import React from "react";
import Fire from "../../config/Fire"; // Firebase
import "./styles.scss"; // Styles
import GenericProfile from "./generic-profile.png";
import MessageTab from "../MessageTab";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    
    Fire.auth().onAuthStateChanged(function(user) {
      if (user) { // User is signed in
        Fire.firestore().collection("profile-types") // Check if user has profile picture
        .where("email", "==", Fire.auth().currentUser.email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.data().type === "parent")
            renderParentPic();
          if (doc.data().type === "walker")
            renderWalkerPic();
          if (doc.data().type === "boarder")
            renderBoarderPic();
          });
        });
      }
    });
    function renderParentPic(doc) {
      Fire.firestore().collection("parents")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
        document.getElementById("profile-pic").src = doc.data().pic; 
        });
      });
    }
    function renderWalkerPic(doc) {
      Fire.firestore().collection("walkers")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
        document.getElementById("profile-pic").src = doc.data().pic; 
        });
      });
    }
    function renderBoarderPic(doc) {
      Fire.firestore().collection("boarders")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
        document.getElementById("profile-pic").src = doc.data().pic; 
        });
      });
    }
  }

  logout(e) {
    e.preventDefault();
    Fire.auth().signOut();
    // Redirect to login page so user doesn't get 404 error
    setTimeout(() => {
      window.location.replace("/");
    }, 100);
  }

  goToProfile() {
    window.location.replace("/profile");
  }

  toggleCollapse() {
    if (document.getElementById("profile-dropdown").className === "collapse fixed-top") {
        document.getElementById("profile-dropdown").className = "collapse.show fixed-top";
    }
    else if (document.getElementById("profile-dropdown").className === "collapse.show fixed-top") {
        document.getElementById("profile-dropdown").className = "collapse fixed-top"; 
    }
  }

  collapseDropdown() {
        document.getElementById("profile-dropdown").className = "collapse fixed-top";
  }

  openDropdown() {
    document.getElementById("profile-dropdown").className = "collapse.show fixed-top";
  }

  openMessages() {
    if (document.getElementById("message-tab").className === "pl-5 collapse")
      document.getElementById("message-tab").className = "pl-5 collapse.show";
    else
      document.getElementById("message-tab").className = "pl-5 collapse";
  }

  render() {
    return (
      <div>
        <MessageTab/>
        <div className="collapse fixed-top" id="profile-dropdown" onMouseLeave={this.collapseDropdown}>
            <div className="pooch-navbar-item mb-3" id="dropdown-row"><button id="dropdown-button" onClick={this.goToProfile}>Profile</button></div>
            <div className="pooch-navbar-item mb-3" id="dropdown-row"><button id="dropdown-button" onClick={this.openMessages}>Messages</button></div>
            <div className="pooch-navbar-item mt-3" id="dropdown-row"><button id="dropdown-button" onClick={this.logout}>Logout</button></div>
        </div>
        <nav className="navbar navbar-expand-lg fixed-top py-5" >
          <img className="ml-2" id="profile-pic" src={GenericProfile} alt="Profile" onClick={this.goToProfile} onMouseEnter={this.openDropdown}/>
          
          <div id="brand">
            <a className="navbar-brand pooch-brand"  href="/">
            POOCH
            </a>
          </div>
          <div> 
            <div className="row pooch-navbar-item" id="nav-pages">
              <div className="nav-item">
                <a className="nav-link your-pets" href="/your-pets">
                Your Pets
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link dog-walking" href="/dog-walking">
                  Dog Walking
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link dog-boarding" href="/dog-boarding">
                  Dog Boarding
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link dog-services" href="/dog-services">
                  Dog Services
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link dog-meetup" href="/dog-meetup">
                  Dog Meetup
                </a>
              </div>
              <div className="nav-item">
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
