import React from 'react';
import { Slide } from 'react-slideshow-image';

import doggy1 from './images/slide_2.jpg';
import doggy2 from './images/slide_3.jpg';
import doggy3 from './images/slide_4.jpg';
 
const slideImages = [
    './images/slide_2.jpg',
    './images/slide_3.jpg',
    './images/slide_4.jpg'
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
              <img src={doggy1} alt="doggy1"/>
              <div>Slide 1</div>
          </div>
          <div className="each-slide">
          <img src={doggy2} alt="doggy2"/>
              <div>Slide 2</div>
          </div>
          <div className="each-slide">
              <img src={doggy3} alt="doggy3"/>
              <div>Slide 3</div>
            </div>
        </Slide>
      </div>
    )
}

export default Slideshow;