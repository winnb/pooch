import React from 'react';
import { Slide } from 'react-slideshow-image';
import './styles.scss';

import Beach from './images/beach.jpg';
import Flowers from './images/flowers.jpg';
import Grass from './images/grass.jpg';
import Puppies from './images/puppies.jpg';
import Snow from './images/snow.jpg';
import Running from './images/running.jpg';
 
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
      <div className="slide-container py-3">
        <Slide {...properties}>
            <img className="each-slide" src={Running} alt="running dogs"/>
            <img className="each-slide" src={Flowers} alt="four dogs laying in front of yellow flowers"/>
            <img className="each-slide" src={Beach} alt="beach dog"/>
            <img className="each-slide" src={Grass} alt="dog on grass"/>
            <img className="each-slide" src={Puppies} alt="puppies lined up"/>
            <img className="each-slide" src={Snow} alt="dog in snow"/>
        </Slide>
      </div>
    )
}

export default Slideshow;