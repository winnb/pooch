// React
import React from "react";

//Graphics, Styles, Animation
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
                <font color = "#FFC375"> <center><b>YOUR PETS</b></center> </font>
                The users are privileged to get a perfect opportunity to show off their poochies and dogs.  
                The page has a form type for you to add your pups' profile and keep a check on your dogs and
                save all the essentials on your profile page.  
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
              <font color = "#FFE675"> <center><b>DOG WALKING</b></center> </font>
                The web page gives you an elaborate list of all the nearby dog walkers and their contact information.
                All the listed dog walkers would be verified, so you and your pups feel safe, when being walked around.
                You can choose to be a dog walker yourself if that is what interests you. 
                                </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section4">
              <div className="col mx-5 mb-7">
              <font color = "#ACFF75"> <center><b>DOG BOARDING</b></center> </font>
                The web page gives you an elaborate list of all the nearby dog boarders and boarding service providers.
                Feel free to provide your poochie with their favorite choice of a nearby dog boarder 
                and let them enjoy their time to the fullest. 
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
              <font color = "#B1F7CF"> <center><b>DOG SERVICES</b></center> </font>
                The web page is sectionalised into various segments, each section giving out accurate information 
                about the particular dog servie you are looking forward to. First section is supply stores, followed by 
                lovely groomers around the area. Even adoption centres, if you are looking to go around and get some more 
                beauties and finally vets around the area, since your pups need proper care. 
              </div>
            </div>
            </Slide>
            <Slide left>
            <div className="row my-5" id="section6">
              <div className="col mx-5 mb-7"> 
              <font color = "#75DFFF"> <center><b>DOG MEETUP</b></center> </font> 
              Meetups make people come together for new possible opportunities. Let your Pooch enjoy the time with other dogs 
              in a safe community being surrounded by magnificent dog lovers. Don’t wait for the event, make your own. 
              A ride with the Pooch!  
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
              <font color = "#BC75FF"> <center><b>DOG RECORDS</b></center> </font> 
              To keep track with all the veterinary records for your dog is important. But we all know how we can easily 
              lose a document that may determine what type of care and treatment your Pooch may need. 
              Do not need to waste time looking for records, upload your pets documents and other essentials. 
              Pooch will have them handy when they are needed, at your convenience. Go paperless with Pooch!
              </div>
            </div>
            </Slide>
        </div>
      </div>
    );
  };
}

export default Home;
