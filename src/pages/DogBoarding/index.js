import React from "react";
import BoardingForm from "../../components/BoardingForm"; // Inner Component
import Fade from "react-reveal"; // Animation

class DogBoarding extends React.Component {
  render() {
    return (
      <div className="mt-5 mx-6">
        <Fade> <BoardingForm /> </Fade>
      </div>
    );
  }
}

export default DogBoarding;