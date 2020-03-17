import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
import Loader from "react-loader-spinner"; // Loader
import Fade from "react-reveal"; // Animation
import DogPark from "./dogpark.png"
import Close from "./close.jpg";

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
    document.getElementById("add-meetup-button").style.display = "none";
  }

  componentDidUpdate() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("meetup-bubble-home").innerHTML = null; // Clear old data before updating
    
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
      newBox.className = "meetup-box row mx-3 pooch-body";
      //newBox.addEventListener("click", ()=>{viewMeetup(doc.data().date, doc.data().time, doc.data().address)});
      var leftCol = document.createElement("div");
      leftCol.className = "box-left-col";
      newBox.appendChild(leftCol);
      // Left column
      var newPic = document.createElement("img");
      newPic.className = "box-meetup-pic";
      newPic.style.left = "0%";
      newPic.style.marginTop = (leftCol.scrollHeight/4 - newPic.height/2).toString()+"px";
      //newPic.style.top = min(25,;
      newPic.src = doc.data().pic;
      newPic.alt = "Meetup Picture";
      leftCol.appendChild(newPic);
      // Right column
      var rightCol = document.createElement("div");
      rightCol.className = "box-right-col";
      newBox.appendChild(rightCol);
      
      var nameDiv = document.createElement("div");
      nameDiv.className = "box-row";
      var nameStart = "";
      Fire.firestore().collection("parents").where("email", "==", doc.data().email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          nameStart = doc.data().name;
        })
      });
      Fire.firestore().collection("boarders").where("email", "==", doc.data().email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          nameStart = doc.data().name;
        })
      });
      Fire.firestore().collection("boarders").where("email", "==", doc.data().email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          nameStart = doc.data().name;
        })
      });
      setTimeout(() => {
        // Make name camelcase (must wait for firebase to return)
        var nameWords = nameStart.toLowerCase().split(" ");
        var adjustedName = "";
        for (var i=0; i<nameWords.length; i++)
          adjustedName += nameWords[i].substr(0,1).toUpperCase() + nameWords[i].substr(1, nameWords[i].length-1) + " ";
        nameDiv.textContent = "Host: "+adjustedName;
        rightCol.appendChild(nameDiv);
      }, 500);
      
      var address = document.createElement("div");
      address.className = "box-row";
      // Make address camelcase
      var addressWords = doc.data().address.toLowerCase().split(" ");
      var adjustedAddress = "";
      for (var i=0; i<addressWords.length; i++)
        adjustedAddress += addressWords[i].substr(0,1).toUpperCase() + addressWords[i].substr(1, addressWords[i].length-1) + " ";
      address.textContent = adjustedAddress;
      rightCol.appendChild(address);

      var city = document.createElement("div");
      city.className = "box-row";
      // Make city camelcase
      var cityWords = doc.data().city.toLowerCase().split(" ");
      var adjustedCity = "";
      for (var i=0; i<cityWords.length; i++)
        adjustedCity += cityWords[i].substr(0,1).toUpperCase() + cityWords[i].substr(1, cityWords[i].length-1) + " ";
      city.textContent = adjustedCity;
      rightCol.appendChild(city);

      var zipcode = document.createElement("div");
      zipcode.className = "box-row";
      zipcode.textContent = doc.data().state+", "+doc.data().zipcode;
      rightCol.appendChild(zipcode);

      var date = document.createElement("div");
      date.className = "box-row";
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var adjustedMonth = months[parseInt(doc.data().date.substr(5,2))-1];
      var adjustedTime;
      if (parseInt(doc.data().time.substr(0,2)) < 12)
        adjustedTime = doc.data().time.substr(1,1)+doc.data().time.substr(2,3)+"AM";
      else if (parseInt(doc.data().time.substr(0,2)) == 12)
        adjustedTime = doc.data().time.substr(0,2)+doc.data().time.substr(2,3)+"PM";
      else
        adjustedTime = (parseInt(doc.data().time.substr(0,2))-12).toString()+doc.data().time.substr(2,3)+"PM";
      date.textContent = doc.data().date.substr(8,2)+" "+adjustedMonth+" "+doc.data().date.substr(0,4)+" @ "+adjustedTime;
      rightCol.appendChild(date);

      var buttonRow = document.createElement("div");
      buttonRow.style.width = "100%";
      buttonRow.style.fontSize = ".7vw";
      buttonRow.style.marginTop = "2%";
      newBox.appendChild(buttonRow);

      var maybeButton = document.createElement("button");
      maybeButton.textContent = "Maybe";
      maybeButton.style.marginLeft = "20%";
      maybeButton.style.width = "20%";
      maybeButton.style.marginRight = "10%";
      maybeButton.style.borderRadius = "10px";
      maybeButton.style.backgroundColor = "rgb(245, 245, 245)";
      maybeButton.style.color = "black";
      maybeButton.addEventListener("click", ()=>{toggleMaybe(maybeButton, yesButton)});
      buttonRow.appendChild(maybeButton);

      var yesButton = document.createElement("button");
      yesButton.textContent = "I'm Going";
      yesButton.style.marginLeft = "10%";
      yesButton.style.width = "20%";
      yesButton.style.marginRight = "20%";
      yesButton.style.borderRadius = "10px";
      yesButton.style.backgroundColor = "rgb(245, 245, 245)";
      yesButton.style.color = "black";
      yesButton.addEventListener("click", ()=>{toggleYes(maybeButton, yesButton)});
      buttonRow.appendChild(yesButton);

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
      setTimeout(() => {
        // Only add bubble if it matches search
        //console.log(document.getElementById("meetup-bubble-home").childNodes[document.getElementById("meetup-bubble-home").childNodes.length-1]);
        if (matchSearch === true)
          document.getElementById("meetup-bubble-home").appendChild(newBox);
        document.getElementById("loader").style.display = "none";
        document.getElementById("add-meetup-button").style.display = "block";
      }, 250);
    }
    
    function toggleYes(maybeButton, yesButton) { 
      maybeButton.style.backgroundColor = "rgb(245, 245, 245)";
      maybeButton.style.color = "black";
      if (yesButton.style.backgroundColor === "rgb(245, 245, 245)") {
        yesButton.style.backgroundColor = "rgb(65, 65, 65)";
        yesButton.style.color = "white";
      }
      else {
        yesButton.style.backgroundColor = "rgb(245, 245, 245)";
        yesButton.style.color = "black";
      }
    }

    function toggleMaybe(maybeButton, yesButton) { 
      yesButton.style.backgroundColor = "rgb(245, 245, 245)";
      yesButton.style.color = "black";
      if (maybeButton.style.backgroundColor === "rgb(245, 245, 245)") {
      maybeButton.style.backgroundColor = "rgb(65, 65, 65)";
      maybeButton.style.color = "white";
    }
    else {
      maybeButton.style.backgroundColor = "rgb(245, 245, 245)";
      maybeButton.style.color = "black";
    }
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
          city: document.getElementById("new-meetup-city").value.toLowerCase(),
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
        <div className="row meetup-search-row">
          <div style={{paddingTop: "0.5%"}}>From</div><input className="date-input" id="start-date" type="date" min="2020-01-01" max="2030-01-01"/>
          <div style={{paddingTop: "0.5%"}}>To</div><input className="date-input" id="end-date" type="date" min="document.getElementById('start-date').value" max="2030-01-01"/>
          <input className="meetup-search-bar" id="meetup-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <select className="meetup-search-dropdown" id="meetup-search-category" onChange={this.handleChange}>
            <option value="city">City</option>
            <option value="zipcode">Zipcode</option>
            <option value="address">Address</option>
          </select>
        </div>
        <div className="pooch-title">Dog Meetups</div>
        <div id="loader" className="mb-4"><Loader type="ThreeDots" color="black" height={75} width={75}/></div>
        <div id="meetup-bubble-home" className="row"></div>
        <button className="pooch-navbar-item mb-4" id="add-meetup-button" onClick={this.openNewMeetup}>Add Meetup</button>

        <div className="collapse" id="meetup-popup">
          <div className="row">
            <div className="box-left-col">
              <img className="popup-meetup-pic" id="new-meetup-pic" src={DogPark} alt="New Meetup Picture"/> 
            </div>
            <div className="box-right-col">
              <img src={Close} className="pull-right" id="close-popup-button" onClick={this.closeNewMeetup}/>
              <input className="box-row" id="new-meetup-address" placeholder="Address" maxLength="32"/>
              <input className="box-row" id="new-meetup-city" placeholder="City" maxLength="32"/>
              <input className="box-row" id="new-meetup-state" placeholder="State" maxLength="2"/>
              <input className="box-row" id="new-meetup-zipcode" placeholder="Zipcode" maxLength="5"/>
              <input className="box-row" id="new-meetup-date" type="date" min="2020-01-01" max="2030-01-01"/>
              <input className="box-row" id="new-meetup-time" type="time" min="5:00" max="20:00"/>
            </div>
          </div>
          <input className="row" type="file" id="new-meetup-input" onChange={this.previewPic}/>
          <button id="submit-meetup" className="btn my-2" onClick={this.submitMeetup}>Submit Meetup</button>
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
 