import React from "react";
import MeetupForm from "../../components/MeetupForm";
//import { Link } from "@reach/router";

// Styles
import "./styles.scss";

class DogMeetup extends React.Component {
  render() {
    return (
      <div className="mt-6 mx-6">
        <MeetupForm />
      </div>
    );
  }
}

export default DogMeetup;