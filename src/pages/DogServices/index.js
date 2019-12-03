import React from "react";
// Styles
import "./styles.scss";

class DogServices extends React.Component {
  render() {
    return (
      <div className="mt-6 mx-6">
        <div className="trak_heading-small section mt-3 mb-10">Local Dog Supply Stores:</div>
        <div className="trak_heading-small section mt-3 mb-10">Local Dog Grooming Services:</div>
        <div className="trak_heading-small section mt-3 mb-10">Local Adoption Centers:</div>
        <div className="trak_heading-small section mt-3 mb-10">Local Vets:</div>
        <div id="success-message" className="trak_body">
          <div>Service Booked!</div>
        </div>
      </div>
    );
  }
}

export default DogServices;