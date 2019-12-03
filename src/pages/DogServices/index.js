import React from "react";
// Styles
import "./styles.scss";
import Slide from "react-reveal";

class DogServices extends React.Component {
  render() {
    return (
      <div className="mt-6 mx-6">
        <Slide down>
          <div className="trak_heading-medium mb-4">
          Dog Services
          </div>
        </Slide>
        <div className="trak_heading-small section mt-3 mb-3">Local Dog Supply Stores:</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
        <div className="contact-box my-3 mx-5 px-3 py-5"></div>
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

export default DogServices;