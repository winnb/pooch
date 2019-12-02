// React
import React from "react";

// Firebase
import fire from "../../config/Fire";

// Components
import Button from "../Button";

// Styles
import "./styles.scss";
import Richard from "./richard.png";

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
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
          <img className="border" src={Richard} alt="Good ol' Richard"/>
          <a className="navbar-brand" href="/">
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
            <ul className="navbar-nav mr-auto trak_body-small">
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
            <div className="trak_body-small" onClick={this.logout}>
                <Button
                type="submit"
                buttonStyle="btn-primary"
                buttonText="Logout"
                buttonTitle="Logout">
              </Button>
            </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
