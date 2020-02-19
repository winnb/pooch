// React
import React from "react";
// Styles
import Slide from "react-reveal";
//import {geolocated} from "react-geolocated";
//import loc from "./location";

class ServicesForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }
  componentDidMount() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.updatePostion(position);
      },
       (error) => {},
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
      );
    });
  }
  updatePostion(position) {
    var latitude = position.coords.latitude;
    var longitude=position.coords.longitude;
    this.setState({latitude:latitude,longitude:longitude});
  }

  render() {
    return (
      <div className="mt-7 mx-6">
        <Slide down>
          <div className="trak_heading-medium mb-4">
          Dog Services
          </div>
        </Slide>
        <div className="trak_heading-small section mt-3 mb-3">Local Dog Supply Stores:</div>
        <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.latitude}</div>
        <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.longitude}</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="trak_heading-small section mt-3 mb-3">Local Dog Grooming Services:</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="trak_heading-small section mt-3 mb-3">Local Adoption Centers:</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="trak_heading-small section mt-3 mb-3">Local Vets:</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div id="success-message" className="trak_body">
          <div>Service Booked!</div>
        </div>
      </div>
    );
  }
}

export default ServicesForm;