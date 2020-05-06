import React from "react";
import axios from "axios";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styles
import Slide from "react-reveal";
import dog_wash from "../ServicesForm/cards"
import { service } from "firebase-functions/lib/providers/analytics";
import Loader from "react-loader-spinner";

class ServicesForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      results:"",
      errorStste:null,
      loading:false,
      city:"",
      apikey:"",
    };
    this.trackLocation=this.trackLocation.bind(this);
    this.getUpdates=this.getUpdates.bind(this);
  }

  updatePostion(position) {
    var latitude = position.coords.latitude;
    var longitude=position.coords.longitude;
    this.setState({latitude:latitude,longitude:longitude});
    document.getElementById("coordinates").className = "collapse.show";
  }

  trackLocation() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.updatePostion(position);
      },
       (error) => {},
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
      );
    });
    //this.getUpdates();
  }

  componentDidMount() {
    document.getElementById("loader").style.display = "none";
  }

 getUpdates() {
  document.getElementById("loader").style.display = "block";
   // Get user's city
  var city = document.getElementById("services-city").value;
    // Get user's search
    var search = document.getElementById("service").value.split(" ");
    var googlePlacesRef = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    for (var i=0; i<search.length; i++) { // for heroku
    if (i < search.length-1)
      googlePlacesRef += search[i]+"+";
    else
      googlePlacesRef += search[i]+" in "+city+"&key=";
  }
    var apiKey = "AIzaSyAFLooFShJB9IpAK8Rb_nyhNi8PuhthPt8";
    googlePlacesRef += apiKey;
    //console.log(googlePlacesRef);
    var request = require('request');
    var options = { // 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+LongBeach&key=AIzaSyAr-Fd30VXDDoStitEIztHwyyYLVvjBIl4'
      'method': 'GET',
      'url': googlePlacesRef,
      'headers': {
      }
    };
    request(options, function (error, response) { 
      if (error) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("results").innerHTML = null;
        document.getElementById("results").textContent = "Oops! We're experiencing an unsual amount of traffic right now 🚗 Try again later.";
        throw new Error(error);
      }
      document.getElementById("results").innerHTML = null;
      var results = response.body.split('"formatted_address"'); // Every business has an address so split when you find an address
      for (var i=1; i<results.length; i++) { // For every business result
          var resultBox = document.createElement("div"); // Box to hold business info
          resultBox.className = "service-box"
          var current = results[i].split("\n"); // Break result into lines
          
          var businessLocation = current[0].substring(4, current[0].length-2);
          var businessName = current[19].substring(19, current[19].length-2);
          var businessOpen = current[21].substring(25, current[21].length);
          current = results[i].split("rating")[1];
          current = current.split("\n");
          var businessRating = current[0].substring(4, current[0].length-1)+" ⭐";
          current = results[i].split("types")[1];
          current = current.split("\n");
          var businessTags = current[0].substring(6, current[0].length-3);
          businessTags = businessTags.replace(/"/g,"");
          businessTags = businessTags.replace(/_/g," ");
          businessTags = businessTags.replace(/:/g,"");
          businessTags = businessTags.replace(/\[/g,"");
          current = results[i].split("user_ratings_total")[1];
          current = current.split("\n");
          var businessRatingCount = current[0].substring(4, current[1].length);
          console.log(current);
          console.log("Total Ratings: "+businessRatingCount);

          var name = document.createElement("div");
          name.className = "box-rating";
          name.textContent = businessName;
          resultBox.appendChild(name);
          var location = document.createElement("div");
          location.className = "box-row";
          location.textContent = businessLocation;
          resultBox.appendChild(location);
          var ResultRow = document.createElement("div");
          ResultRow.className = "row";
          var rating = document.createElement("div");
          rating.className = "box-tag";
          rating.textContent = businessRating;
          ResultRow.appendChild(rating);
          var ratingCount = document.createElement("div");
          ratingCount.className = "box-tag";
          ratingCount.textContent = businessRatingCount+" ratings";
          ResultRow.appendChild(ratingCount);
          var open = document.createElement("div");
          open.className = "box-tag";
          if (businessOpen == "true")
            open.textContent = "Open Now 🟢";
          else if (businessOpen == "false")
            open.textContent = "Currently Closed 🔴";
          else
            open.textContent = "Call for Hours 📱";
          ResultRow.appendChild(open);
          var tags = document.createElement("div");
          tags.className = "box-tag";
          tags.textContent = "Tags:";
          ResultRow.appendChild(tags);
          businessTags = businessTags.split(", ");
          for (var k=0; k<businessTags.length; k++) {
            var nextTag = document.createElement("div");
            nextTag.className = "box-tag";
            nextTag.textContent = businessTags[k][0].toUpperCase()+businessTags[k].substring(1, businessTags[k].length);
            ResultRow.appendChild(nextTag);
          }
          resultBox.appendChild(ResultRow);
          document.getElementById("results").appendChild(resultBox);
      }
      document.getElementById("loader").style.display = "none";
    });
 }

  render() {
    return (
      <div id="services-form">
        {/* <button className="mb-3" type="button" onClick={this.trackLocation}>Detect your location</button>
        <div id="coordinates">({this.state.latitude}, {this.state.longitude})</div> */}
        <div className="pooch-navbar-item" style={{marginBottom: "3vh"}}>Here you can search for dog-related businesses ⤦</div>
        <div className="row" id="services-search-row">
          <label className="search-label" style={{marginRight: "0.5vw"}}>Service Name</label>
          <input className="search-bar mr-3 services-search" id="service" style={{marginLeft: "0%"}} placeholder="e.g. Vet, Animal Shelter, Dog Grooming, etc..." maxLength="50"></input>
        </div>
        <div className="row" id="services-search-row">
          <label className="search-label" style={{marginRight: "0.5vw"}}>City</label>
          <input className="search-bar mr-3 services-search" id="services-city" style={{marginLeft: "0%"}} placeholder="e.g. Los Angeles, New York, etc..." maxLength="50"></input>
        </div>
        <button style={{margin: "1vw", padding: "0.5vw"}}onClick={this.getUpdates}>Search</button>
        <div id="loader" className="mb-4"><Loader type="TailSpin" color="black" height={75} width={75}/></div>
        <div id="results"/>
        </div>
      
    );
  }
}

export default ServicesForm;