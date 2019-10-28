import React from "react";

import "./styles.scss";

const Home = () => {
  return (
    <div>
      <div className="title trak_heading-large mt-4 mb-5">Your one stop shop for puppers, doggos, and good boys</div>
      <form>
        <div className="form-group col-4">
          <label>Display Name</label>
          <input type="text" className="form-control" placeholder="Enter name"/>
          <small className="form-text text-muted">This is what the community will see you as!</small>
        </div>
        <div className="form-group col-4">
          <label>Age</label>
          <input type="number" className="form-control"/>
        </div>
        <div className="form-check col-4">
          <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-control-sm">
            Display age publicly?
          </label>
        </div>
        <div className="form-group col-4">
          <label for="exampleFormControlTextarea1">Bio</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="col-1">
          <input class="form-control" type="text" value="# of pets"/>
        </div>
        <button type="submit" className="btn btn-primary pull-left ml-6">Update Profile</button>
      </form>
    </div>
    /* <div>
      <div classNameName="title trak_heading-medium mt-5" name="title">Your one stop shop for puppers, doggos, and good boys</div>
      <div classNameName="pull-left trak_heading-small mt-3">Your Profile:</div>
      <div classNameName="trak_body mt-5 pull-left">
      <div classNameName="profile-pic mt-3">Profile Pic</div>
        <div classNameName="mt-3">Name:
          <input  placeholder="Doug Ohnar"></input>
        </div>
        <div classNameName="mt-3">Age:
          <input placeholder="30"></input>
        </div>
        <div classNameName="mt-3">Number of Pets:
          <input placeholder="3"></input>
        </div>
        <div>
          <textarea cols="40" rows="8" classNameName="trak_body-small mt-3" placeholder="Tell fellow dog owners about yourself. Add a bio!"></textarea>
        </div>
        <div classNameName="mt-3">
          <button type="submit">Update Profile</button>
        </div>
      </div>
      
      
    </div> */
  );
};

export default Home;
