import React from 'react';
import { Slide } from 'react-slideshow-image';
import './styles.scss';

import BrownLab from './images/brown-lab.jpg';
import Beagle from "./images/beagle.jpg";
import Bulldog from "./images/bulldog.jpg";
import CattleDog from './images/cattle-dog.jpg';
import Corgi from './images/corgi.jpg';
import Daschund from './images/daschund.jpg';
import Dalmation from './images/dalmation.jpg';
import Frisbee from "./images/frisbee.jpg";
import GermanShepard from "./images/german-shepard.jpg";
import Husky from './images/husky.jpg';
import Running from './images/running.jpg';
import TugOWar from './images/tug-o-war.jpg';
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    if (document.getElementById("pets-message").className === "pooch-title collapse.show") {
      document.getElementById("pets-message").className = "pooch-title collapse";
      document.getElementById("walkers-message").className = "pooch-title collapse.show";
    }
    else if (document.getElementById("walkers-message").className === "pooch-title collapse.show") {
      document.getElementById("walkers-message").className = "pooch-title collapse";
      document.getElementById("boarders-message").className = "pooch-title collapse.show";
    }
    else if (document.getElementById("boarders-message").className === "pooch-title collapse.show") {
      document.getElementById("boarders-message").className = "pooch-title collapse";
      document.getElementById("services-message").className = "pooch-title collapse.show";
    }
    else if (document.getElementById("services-message").className === "pooch-title collapse.show") {
      document.getElementById("services-message").className = "pooch-title collapse";
      document.getElementById("meetup-message").className = "pooch-title collapse.show";
    }
    else if (document.getElementById("meetup-message").className === "pooch-title collapse.show") {
      document.getElementById("meetup-message").className = "pooch-title collapse";
      document.getElementById("records-message").className = "pooch-title collapse.show";
    }
    else {
      document.getElementById("records-message").className = "pooch-title collapse";
      document.getElementById("pets-message").className = "pooch-title collapse.show";
    }
  }
}
 
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
            <img className="each-slide" src={BrownLab} alt="brown labrador dog"/>
            <img className="each-slide" src={Beagle} alt="beagle dog"/>
            <img className="each-slide" src={Daschund} alt="daschund dog"/>
            <img className="each-slide" src={Corgi} alt="corgi dog"/>
            <img className="each-slide" src={Bulldog} alt="bulldog running on beach"/>
            <img className="each-slide" src={Frisbee} alt="dog catching frisbee"/>
            <img className="each-slide" src={CattleDog} alt="australian cattle dog"/>
            <img className="each-slide" src={Dalmation} alt="dalmation dog"/>
            <img className="each-slide" src={Husky} alt="husky dog"/>
            <img className="each-slide" src={Running} alt="running dogs"/>   
            <img className="each-slide" src={GermanShepard} alt="german shepard"/>
            <img className="each-slide" src={TugOWar} alt="dogs playing tug o war"/>
        </Slide>
        <a href="/pets">
          <div className="pooch-title collapse.show" id="pets-message">Let people get to know your pooch! View Your Pets 🐶
            <div className="slide-arrow">➥</div>
          </div>
        </a>
        <a href="/dog-walking">
          <div className="pooch-title collapse" id="walkers-message">No worries! Pooch dog walkers are here! View Dog Walkers 🐕 🚶‍♂️
            <div className="slide-arrow">➥</div>
          </div>
        </a>
        <a href="/dog-boarding">
          <div className="pooch-title collapse" id="boarders-message">Going out of town? Find accomodations with Pooch! View Dog Boarders 🏠🦴
            <div className="slide-arrow">➥</div>
          </div>
        </a>
        <a href="/dog-boarding">
          <div className="pooch-title collapse" id="services-message">Find qualified vets, groomers, and more! View Dog Services 👩‍⚕️🏥
            <div className="slide-arrow">➥</div>
          </div>
        </a>
        <a href="/dog-meetup">
          <div className="pooch-title collapse" id="meetup-message">Never miss your friends with Pooch! View Dog Meetups 🏞️🐩
            <div className="slide-arrow">➥</div>
          </div>
        </a>
        <a href="/dog-records">
          <div className="pooch-title collapse" id="records-message">Adoption paperwork, vet receipts, and more are safe here! View Dog Records 📝
            <div className="slide-arrow">➥</div>
          </div>
        </a>
      </div>
    )
}

export default Slideshow;