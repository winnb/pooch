import React from "react";
import BoardingForm from "../../components/BoardingForm";
//import { Link } from "@reach/router";

// Styles
//import "./styles.scss";

class DogBoarding extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <BoardingForm />
        <div id="success-message" className="trak_body">
          <div>Boarding Scheduled!</div>
        </div>
      </div>
    );
  }
}

export default DogBoarding;