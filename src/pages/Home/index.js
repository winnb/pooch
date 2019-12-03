// React
import React from "react";

// Styles
import "./styles.scss";
import Logo from "../../pooch-logo-small.png";
import Slide from "react-reveal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="mt-5">
        <Slide down>
          <div className="title trak_heading-medium mt-6 mb-3">
            Your one stop shop for puppers, doggos, and good boys
            <img src={Logo} alt="Pooch logo" className="logo pull-right mr-5"></img>
          </div>
        </Slide>
        <div className="row mb-5 mt-2">
          <Slide left>
          <div className="col mx-5">
            <div className="trak_heading-small mb-3">
              Profile
            </div>
            <form>
              <span className="form-group">
                <label>Display Name</label>
                <input type="text" className="form-control" placeholder="Enter name"/>
                <small className="form-text text-muted">This is what the community will see you as!</small>
              </span>
              <span className="form-group">
                <label>Metropolitan Area</label>
                <select
                name="city"
                className="form-control"
                value={this.state.city}
                onChange={this.handleChange}
                required
                title="Select a city"
              >
                <option value="New-York">New York, NY</option>
                <option value="Los-Angeles">Los Angeles, CA</option>
                <option value="Chicago">Chicago, IL</option>
                <option value="Dallas">Dallas, TX</option>
                <option value="Houston">Houston, TX</option>
                <option value="Washington-DC">Washington D.C.</option>
                <option value="Miami">Miami, FL</option>
                <option value="Philadelphia">Philadelphia, PA</option>
                <option value="Atlanta">Atlanta, GA</option>
                <option value="Boston">Chicago, MA</option>
                <option value="Phoenix">Phoenix, AZ</option>
                <option value="San-Francisco">San Francisco, CA</option>
                <option value="Riverside">Riverside, CA</option>
                <option value="Seattle">Seattle, WA</option>
                <option value="Minneapolis">Minneapolis, MN</option>
                <option value="San-Diego">San Diego, CA</option>
                <option value="Tampa">Tampa, FL</option>
                <option value="Denver">Denver, CO</option>
                <option value="St-Louis">St. Louis, MO</option>
                <option value="Baltimore">Baltimore, MD</option>
                <option value="Orlando">Orlando, FL</option>
                <option value="Charlotte">Charlotte, NC</option>
                <option value="San-Antonio">San Antonio, TX</option>
                <option value="Portland">Portland, OR</option>
                <option value="Sacramento">Sacramento, CA</option>
                <option value="Pittsburg">Pittsburg, PA</option>
                <option value="Las-Vegas">Las Vegas, NV</option>
                <option value="Cincinnati">Cincinnati, OH</option>
                <option value="Austin">Austin, TX</option>
              </select>
              </span>
              <span className="form-check">
                <input className="form-check-input" type="checkbox" value="" defaultChecked/>
                <label className="form-control-sm">
                  Display city publically?
                </label>
              </span>
              <span className="form-group">
                <label for="exampleFormControlTextarea1">Bio</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </span>
              <div className="row mt-3">
                <div className="col trak_body-medium"># of Pets</div>
                <div className="col"><input class="form-control" type="text" value="# of pets"/></div>
              </div>
              <div className="mt-4 mx-7">
                <button type="submit" className="btn btn-primary pull-left ml-6">Update Profile</button>
              </div>
            </form>
          </div>
          </Slide>
          <Slide right>
          <div className="col">
            <div className="trak_heading-small mb-3">
              News Feed
            </div>
            <div className="quick-access-box px-5 py-5 mx-2 my-3">
              <div className="row">
                <div className="col mx-2 px-2 py-5 inner-box">Shortcut #1</div>
                <div className="col mx-2 px-2 py-5 inner-box">Shortcut #2</div>
                <div className="col mx-2 px-2 py-5 inner-box">Shortcut #3</div>
              </div>
            </div>
            <div className="row mt-2 px-3 py-3">
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box #1</div>
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box #2</div>
            </div>
            <div className="row mt-2 px-3 py-3">
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box #3</div>
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box #4</div>
            </div>
          </div>
          </Slide>
        </div>
        
        
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
}

export default Home;
