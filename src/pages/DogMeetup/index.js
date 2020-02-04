import React from "react";
import MeetupForm from "../../components/MeetupForm";
//import { Link } from "@reach/router";

// Styles
import "./styles.scss";

class DogMeetup extends React.Component {

  handleChange(e) {
  }
  render() {
    return (
      <div>
        <MeetupForm />
      </div>
    );
  }
}

export default DogMeetup;