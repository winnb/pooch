import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
import Loader from "react-loader-spinner"; // Loader
import Fade from "react-reveal"; // Animation
import DogPark from "./dogpark.png"

class MeetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: "",
      address: "",
      city: "",
      sta: "",
      zipcode: "",
      description: "",
      search: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateSearch(e) { this.setState({search: e.target.value.substr(0,50) }); }

  componentDidMount() {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("loader").style.display = "block";
    document.getElementById("add-meetup-button").style.display = "none";
  }

  componentDidUpdate() {
    document.getElementById("bubble-home").innerHTML = null; // Clear old data before updating
    
    // Get meetups from Firebase
    Fire.firestore().collection("meetups")
      .orderBy(document.getElementById("meetup-search-category").value).get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderMeetup(doc);
        });
      });

    function renderMeetup(doc) {
      // Bubble render
      var newBox = document.createElement("div");
      newBox.className = "meetup-box row mx-3";
      //newBox.addEventListener("click", ()=>{viewMeetup(doc.data().date, doc.data().time, doc.data().address)});
      var leftCol = document.createElement("div");
      leftCol.className = "box-left-col";
      newBox.appendChild(leftCol);
      // Left column
      var newPic = document.createElement("img");
      newPic.className = "box-meetup-pic";
      newPic.src = doc.data().pic;
      newPic.alt = "Meetup Picture";
      leftCol.appendChild(newPic);
      // Right column
      var rightCol = document.createElement("div");
      rightCol.className = "box-right-col";
      newBox.appendChild(rightCol);
      
      var address = document.createElement("div");
      address.className = "box-row";
      address.textContent = doc.data().address;
      rightCol.appendChild(address);

      var city = document.createElement("div");
      city.className = "box-row";
      city.textContent = doc.data().city;
      city.textContent += ", "+doc.data().state;
      rightCol.appendChild(city);

      var zipcode = document.createElement("div");
      zipcode.className = "box-row";
      zipcode.textContent = doc.data().zipcode;
      rightCol.appendChild(zipcode);

      var date = document.createElement("div");
      date.className = "box-row";
      date.textContent = doc.data().date;
      date.textContent += " "+doc.data().time;
      rightCol.appendChild(date);

      // Search functionality
      var matchSearch = true;
      var searchCategory = document.getElementById("meetup-search-category").value;
      var searchBar = document.getElementById("meetup-search").value;
      if (searchCategory === "city") { // Searching by city
        if (searchBar.length > city.textContent.length) // Check if search bar is longer than city
          matchSearch = false;
        else
          for (var j=0; j<searchBar.length; j++) // Loop through each letter in search bar
            if (searchBar[j].toLowerCase() !== city.innerText[j].toLowerCase())
              matchSearch = false;
      }
      if (searchCategory === "zipcode") { // Searching by zipcode
        if (searchBar.length > zipcode.textContent.length) // Check if search bar is longer than zipcode
          matchSearch = false;
        else
          for (var j=0; j<searchBar.length; j++) // Loop through each letter in search bar
            if (searchBar[j].toLowerCase() !== zipcode.innerText[j].toLowerCase())
              matchSearch = false;
      }
      if (searchCategory === "address") { // Searching by address
        if (searchBar.length > address.textContent.length) // Check if search bar is longer than address
          matchSearch = false;
        else
          for (var j=0; j<searchBar.length; j++) // Loop through each letter in search bar
            if (searchBar[j].toLowerCase() !== address.innerText[j].toLowerCase())
              matchSearch = false;
      }
      // Only add bubble if it matches search
      if (matchSearch === true)
        document.getElementById("bubble-home").appendChild(newBox);
      document.getElementById("loader").style.display = "none";
      document.getElementById("add-meetup-button").style.display = "block";
    }
    
    function viewMeetup(date, time, address) { 
    }
  }

  submitMeetup() {
      Fire.firestore().collection("meetups").where('email', '==', Fire.auth().currentUser.email)
      .where("address", "==", document.getElementById("new-meetup-address").value)
      .where("date", "==", document.getElementById("new-meetup-date").value)
      .where("time", "==", document.getElementById("new-meetup-time").value)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
      setTimeout(() => {
        Fire.firestore().collection("meetups").add({
          email: Fire.auth().currentUser.email,
          pic: document.getElementById("new-meetup-pic").src,
          address: document.getElementById("new-meetup-address").value,
          city: document.getElementById("new-meetup-city").value,
          zipcode: document.getElementById("new-meetup-zipcode").value,
          state: document.getElementById("new-meetup-state").value.toUpperCase(),
          date: document.getElementById("new-meetup-date").value,
          time: document.getElementById("new-meetup-time").value
      }).catch(error => {
      document.getElementById("error-message").style.display = "block";
    });
    }, 1000);
      setTimeout(() => {
        if (document.getElementById("error-message").style.display !== "block")
          window.location.reload();
      }, 2000);
  }

  previewPic(event) {
    var input = event.target; // Get image that changed state of input element
    var reader = new FileReader();
    reader.onload = function() {
    document.getElementById(input.id.split("-input")[0]+"-pic").src = reader.result;
    };
    reader.readAsDataURL(input.files[0]); // Show preview of image
  }

  openNewMeetup() { document.getElementById("meetup-popup").className = "collapse.show" }

  closeNewMeetup() { document.getElementById("meetup-popup").className = "collapse" }

  closeError() { document.getElementById("error-message").style.display = "none" }

  render() {
    return (
      <div className="mt-7 mx-6">
        <div className="row">
          <input id="meetup-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select id="meetup-search-category" onChange={this.handleChange}>
            <option value="city">City</option>
            <option value="zipcode">Zipcode</option>
            <option value="address">Address</option>
          </select>
        </div>
        <div className="pooch-title my-2">Dog Meetups</div>
        <div id="loader" className="mb-4"><Loader type="ThreeDots" color="black" height={75} width={75}/></div>
        <div id="bubble-home" className="row"></div>
        <div className="pooch-navbar-item mb-4" id="add-meetup-button" onClick={this.openNewMeetup}>Add Meetup</div>

        <div className="collapse" id="meetup-popup">
          <div className="row">
            <div className="box-left-col">
              <img className="meetup-pic" id="new-meetup-pic" src={DogPark} alt="New Meetup Picture"/>
              <input type="file" id="new-meetup-input" onChange={this.previewPic}/>
            </div>
            <div className="box-right-col">
              <input className="box-row" id="new-meetup-address" placeholder="Address" maxLength="32"/>
              <input className="box-row" id="new-meetup-city" placeholder="City" maxLength="32"/>
              <input className="box-row" id="new-meetup-state" placeholder="State" maxLength="2"/>
              <input className="box-row" id="new-meetup-zipcode" placeholder="Zipcode" maxLength="5"/>
              <input className="box-row" id="new-meetup-date" type="date" min="2020-01-01" max="2030-01-01"/>
              <input className="box-row" id="new-meetup-time" type="time" min="5:00" max="20:00"/>
            </div>
          </div>
          <button id="submit-meetup" className="btn my-2" onClick={this.submitMeetup}>Submit Meetup</button>
          <button type="submit" className="btn btn-danger" id="close-meetup-button" onClick={this.closeNewMeetup}>X</button>
        </div>
        <div className="fixed-top" id="error-message">
          <div>Image size too large</div>
          <button className="m2-3 mr-4 btn-danger popup-button" onClick={this.closeError}>Close</button>
        </div>
      </div>
    );
  }
}

export default MeetupForm;
