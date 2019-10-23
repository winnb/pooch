import React from "react";

import "./styles.scss";

const Home = () => {
  return (
    <div>
      <div className="title trak_heading-medium mt-5" name="title">Your one stop shop for puppers, doggos, and good boys</div>
      <div className="pull-left trak_heading-small mt-3">Your Profile:</div>
      <div className="trak_body mt-5 pull-left">
        <div className="mt-3">Name:
          <input className="ml-3" placeholder="Doug Ohnar"></input>
        </div>
        <div className="mt-3">Age:
          <input className="ml-3" placeholder="30"></input></div>
        <div className="profile-pic mt-3">Profile Pic</div>
        <div>
          <textarea cols="50" className="trak_body-small mt-3" placeholder="Tell fellow dog owners about yourself. Add a bio!"></textarea>
        </div>
        <div className="mt-3">Number of Pets:
          <input className="ml-3" placeholder="3"></input>
        </div>
        <div className="mt-3">
          <button type="submit">Update Profile</button>
        </div>
      </div>
      
      
    </div>
  );
};

export default Home;
