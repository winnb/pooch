import React from "react";

// Firebase
import fire from "../../config/Fire";

// // Media
// import Hologram from "./media/hologram.svg";

// Styles
import "./styles.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            POOCH
            {/* <img src={Hologram} alt="Hologram" /> */}
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
            <ul className="navbar-nav mr-auto trak_body-small">
              <li className="nav-item">
                <a className="nav-link" href="/your-pets">
                  Your Pets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dog-walking">
                  Dog Walking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dog-boarding">
                  Dog Boarding
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dog-services">
                  Dog Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dog-meetup">
                  Dog Meetup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dog-records">
                  Dog Records
                </a>
              </li>
              
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                onClick={this.logout}
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Log out
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
