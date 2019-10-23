import React from "react";

const YourPets = () => {
  return (
    <div>
      <div className="title trak_heading-medium mt-5" name="title">Your Pets</div>
      <div className="pull-left trak_heading-small mt-3 ml-5">Dogs:</div>
      <div className="trak_body mt-5 pull-left">
        <div className="mt-3">Name:
          <input className="ml-3" placeholder="Zeus"></input>
        </div>
        <div className="mt-3">Age:
          <input className="ml-3" placeholder="3"></input></div>
        <div className="profile-pic mt-3">Puppy Pic</div>
        <div className="mt-3">Breed:
          <input className="ml-3" placeholder="Yellow Lab, Boxer"></input>
        </div>
        <div className="mt-3">
          <button type="submit">Update Dog Profile</button>
        </div>
      </div>
      </div>
  );
};

export default YourPets;
