import React from 'react';
import { Slide } from 'react-slideshow-image';
import './styles.scss';

import BrownLab from './images/brown-lab.jpg';
import CattleDog from './images/cattle-dog.jpg';
import Corgi from './images/corgi.jpg';
import Daschund from './images/daschund.jpg';
import Dalmation from './images/dalmation.jpg';
import Flowers from './images/flowers.jpg';
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
  onChange: (oldIndex, newIndex) => {
  }
}
 
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
            <img className="each-slide" src={BrownLab} alt="brown labrador dog"/>
            <img className="each-slide" src={CattleDog} alt="australian cattle dog"/>
            <img className="each-slide" src={Corgi} alt="corgi dog"/>
            <img className="each-slide" src={Dalmation} alt="dalmation dog"/>
            <img className="each-slide" src={Daschund} alt="daschund dog"/>
            <img className="each-slide" src={Flowers} alt="four dogs laying in front of yellow flowers"/>
            <img className="each-slide" src={Frisbee} alt="dog catching frisbee"/>
            <img className="each-slide" src={GermanShepard} alt="german shepard"/>
            <img className="each-slide" src={Husky} alt="husky dog"/>
            <img className="each-slide" src={Running} alt="running dogs"/>        
            <img className="each-slide" src={TugOWar} alt="dogs playing tug o war"/>
        </Slide>
      </div>
    )
}

export default Slideshow;