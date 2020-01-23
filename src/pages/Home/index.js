// React
import React from "react";

//Grahpics, Styles, Animation
// import Paw from "./media/paw-icon.png";
// import Walking from "./media/walking-icon.png";
// import Doghouse from "./media/doghouse-icon.png";
import "./styles.scss";
import Slide from "react-reveal";
import FamilyPets from './media/familypets.jpg';
import DogWalking from './media/dogwalking.jpg';
import DogBoarding from './media/dogboarding.jpg';
import DogGrooming from './media/grooming.jpg';
import DogPark from './media/dogpark.jpg';
import Vet from './media/vet.jpg';

// Components
import Slideshow from "../../components/Slideshow";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="mt-7" id="section1">
        <Slide down>
          <Slideshow/> 
        </Slide>
        <div className="row mb-5 mt-3">
          <Slide left>
            <div className="row my-5" id="section2">
              <div className="col mx-5 mb-7">
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
                Paragraph 1 will go here. This paragraph will talk about the features of the Your Pets page. 
              </div>
              <div className="col mx-5 my-5">
                <img src={FamilyPets} alt="Family pets"/>
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section3">
              <div className="col mx-5 my-5">
                <img src={DogWalking} alt="Walking dogs"/>
              </div>
              <div className="col mx-5 mb-7">
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.  
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.  
                Paragraph 2 will go here. This paragraph will talk about the features of the Dog Walking page.   
              </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section4">
              <div className="col mx-5 mb-7">
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
                Paragraph 3 will go here. This paragraph will talk about the features of the Dog Boarding page.  
              </div>
              <div className="col mx-5 my-5">
                <img src={DogBoarding} alt="Dog boarding"/>
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section5">
              <div className="col mx-5 my-5">
                <img src={DogGrooming} alt="Dog grooming"/>
              </div>
              <div className="col mx-5 mb-7">
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
                Paragraph 4 will go here. This paragraph will talk about the features of the Dog Services page.  
              </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section6">
              <div className="col mx-5 mb-7">
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
                Paragraph 5 will go here. This paragraph will talk about the features of the Dog Meetup page.  
              </div>
              <div className="col mx-5 my-5">
                <img src={DogPark} alt="Dog park"/>
              </div>
            </div>
            </Slide>
            <Slide right>
            <div className="row my-5" id="section7">
              <div className="col mx-5 my-5">
                <img src={Vet} alt="Vet visit"/>
              </div>
              <div className="col mx-5 mb-7">
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
                Paragraph 6 will go here. This paragraph will talk about the features of the Dog Records page. 
              </div>
            </div>
            </Slide>
        </div>
      </div>
    );
  };
}

export default Home;
