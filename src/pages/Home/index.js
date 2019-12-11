// React
import React from "react";

//Firebase
import Fire from "../../config/Fire.js";

//Grahpics, Styles, Animation
import Paw from "./media/paw-icon.png";
import Walking from "./media/walking-icon.png";
import Doghouse from "./media/doghouse-icon.png";
import "./styles.scss";
import Slide from "react-reveal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      hourlyRate: "",
      city: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // New Walker Table
    const db = Fire.firestore();
    // get the data from the collection
    db.collection("walkers")
    .orderBy("timestamp", "desc")
    .limit(3)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderWalkers(doc);
      });
    });
     // Create a grid to store walker data
     const grid = document.querySelector("#walker-grid");
     function renderWalkers(doc) {
       // create a list to style the data
       let li = document.createElement("tr");
       let name = document.createElement("td");
       let phone = document.createElement("td");
       let hourlyRate = document.createElement("td");
       let city = document.createElement("td");
 
       li.setAttribute("data-id", doc.id);
 
       // Update local state to database contents
       name.textContent = doc.data().name;
       phone.textContent = doc.data().phone;
       hourlyRate.textContent = doc.data().hourlyRate;
       city.textContent = doc.data().city;
 
       // Add all contents to the list
       li.appendChild(name);
      //  li.appendChild(phone);
      //  li.appendChild(hourlyRate);
       li.appendChild(city);
 
       // Add list to grid
       grid.appendChild(li);
     }

     // New Boarder Table
     db.collection("boarders")
    .orderBy("name", "desc")
    .limit(3)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderBoarders(doc);
      });
    });
     // Create a grid to store walker data
     const boarderGrid = document.querySelector("#boarder-grid");
     function renderBoarders(doc) {
       // create a list to style the data
       let li = document.createElement("tr");
       let name = document.createElement("td");
       let phone = document.createElement("td");
       let dailyRate = document.createElement("td");
       let address = document.createElement("td");
       let city = document.createElement("td");
 
       li.setAttribute("data-id", doc.id);
 
       // Update local state to database contents
       name.textContent = doc.data().name;
       phone.textContent = doc.data().phone;
       dailyRate.textContent = doc.data().dailyRate;
       address.textContent = doc.data().address;
       city.textContent = doc.data().city;
 
       // Add all contents to the list
       li.appendChild(name);
      //  li.appendChild(phone);
      //  li.appendChild(dailyRate);
      // li.appendChild(address);
       li.appendChild(city);
 
       // Add list to grid
       boarderGrid.appendChild(li);
     }
  }

  render() {
    return (
      <div className="mt-5">
        <Slide down>
          <div className="title trak_heading-medium mt-6 mb-3">
            Your one stop shop for puppers, doggos, and good boys
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
                <div className="col mx-2 px-2 py-5 inner-box">
                  <a href="/your-pets">Go to Your Pets
                  <div>
                    <img src={Paw} alt="Paw icon"/>
                  </div>
                  </a>
                </div>
                <div className="col mx-2 px-2 py-5 inner-box">
                  <a href="/dog-walking">Go to Dog Walking
                  <div>
                    <img src={Walking} alt="Dog Walking icon"/>
                  </div>
                  </a>
                </div>
                <div className="col mx-2 px-2 py-5 inner-box">
                  <a href="/dog-boarding">Go to Dog Boarding
                  <div>
                    <img src={Doghouse} alt="Doghouse icon"/>
                  </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="row mt-2 px-3 py-3">
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">
                New Dog Walkers
                <div className="walker-title">
                  <table className="table table-light mt-4 text-left trak_body-small">
                    <thead className="trak_body-small">
                      <tr>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Phone</th>
                        <th scope="col">Hourly Rate</th> */}
                        <th scope="col">City</th>
                      </tr>
                    </thead>
                    <tbody id="walker-grid"></tbody>
                  </table>
                </div>
              </div>
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">
                New Dog Boarders
                <div className="boarder-title">
                  <table className="table table-light mt-4 text-left trak_body-small">
                    <thead className="trak_body-small">
                      <tr>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Phone</th>
                        <th scope="col">Hourly Rate</th>
                        <th scope="col">Address</th> */}
                        <th scope="col">City</th>
                      </tr>
                    </thead>
                    <tbody id="boarder-grid"></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row mt-2 px-3 py-3">
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box</div>
              <div className="col mx-2 quick-access-box px-3 py-3 news-box">News Box</div>
            </div>
          </div>
          </Slide>
        </div>
      </div>
    );
  };
}

export default Home;
