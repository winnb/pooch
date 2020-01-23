// React
import React from "react";

//Animation
import Slide from "react-reveal";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentPassword: "",
      newPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="mt-7 mx-6 mb-8">
        <Slide left>
          <div className="col mx-5">
            <div className="trak_heading-small mb-3">
              Edit Your Profile
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
                <button type="submit" className="btn btn-primary pull-left mx-9">Update Profile</button>
              </div>
            </form>
          </div>
          </Slide>
      </div>
    ); 
  }
};

export default ProfileForm;
