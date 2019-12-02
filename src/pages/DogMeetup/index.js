import React from "react";
import MeetupForm from "../../components/MeetupForm";
//import { Link } from "@reach/router";

// Styles
import "./styles.scss";

class DogMeetup extends React.Component {
  render() {
    return (
      <div className="mt-6 mx-6">
        <div className="trak_heading-medium mb-5">Schedule a New Meetup</div>
        <MeetupForm />
        <div id="success-message" className="trak_body">
          <div>Meetup Scheduled!</div>
        </div>
      </div>
    );
  }
}

export default DogMeetup;