import React from "react";
import axios from "axios";
import "./styles.scss"; // Styles
import Slide from "react-reveal";
import dog_wash from "../ServicesForm/cards"
import { service } from "firebase-functions/lib/providers/analytics";

class ServicesForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      results:[],
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
  }
  trackLocation(){
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

  /*
  getUpdates(){
    this.setState({ loading: true })

    //using a proxy server cors-anywhere to get rid of the CROS probblem 
    //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=LongBeach`, {
    //required authorization format from API 
    headers: {
        //to get the API from the .env file use process.env.{variable name}
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    },
    //option params passed to API call to retrieve only breakfast and lunch spots 
    params: {
        categories: 'dog_wash',
        radius:10,
        limit:4
    }
    })
    .then((res) => {
        console.log(res.data.businesses)
        //change the state of App to reflect on the result we are given from the API
        //at the same time, setting the loading state to false 
        this.setState({ results: res.data.businesses, loading: false })
    })
    .catch((err) => {
        //fire the errorState message if there is no information return from the API
        this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
    })
  }

 
 getUpdates(){
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dog_wash&location=LongBeach&range=10&limit=4',
    'headers': {
      'Authorization': ['Bearer', 'Bearer jmi-PoyyCL6TczqHp0M9e5ywy7Bs8GAaEehHDP-7ktNpoflo4uvMUs-t312lgSqo8Ton8MVJ5faipw85aJGCk1O1YYZkWAPUMBy8Q8KkjvhabSflVGKZS65cDNJRXnYx']
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
  });
  */
 /*
  getUpdates(){
    this.setState({apikey:"jmi-PoyyCL6TczqHp0M9e5ywy7Bs8GAaEehHDP-7ktNpoflo4uvMUs-t312lgSqo8Ton8MVJ5faipw85aJGCk1O1YYZkWAPUMBy8Q8KkjvhabSflVGKZS65cDNJRXnYx"});
    
      
    }
  }
 }
 getUpdates(){
  Yelp.search("dog_wash", "Long Beach", "10").then(businesses => {
    this.setState({
      businesses: businesses
    });
  });
 }
 getUpdates(){
   try{
    const response=await Places.nearbysearch({
      location:("%d,%d",this.state.latitude,this.state.longitude),
      type:[],
      radius:"distance",
      keyword:"dog_wash",
    });

    const {status,results,nect_page_token,html_sttributions}=response;
   }catch(error){
     console.log(error);
   }
 }*/
 getUpdates(){
   var request = require('request');
   var outcome;
   var options = {
     'method': 'GET',
     'url': 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+LongBeach&key=AIzaSyAr-Fd30VXDDoStitEIztHwyyYLVvjBIl4',
     'headers': {
     }
   };
   request(options, function (error, response,body) { 
     if (error) throw new Error(error);
     //console.log(response.body);
     //document.getElementById("results-box").innerHTML = response.body;
     //outcome = JSON.parse(body).results;
     //console.log(outcome);
     outcome = JSON.parse(response.body).results;
   });
   //this.setState({results:outcome});
   console.log(this.state.results);
 }

// getUpdates(){
//   var search = document.getElementById("services-search").value.split(" ");
//   //var googlePlacesRef = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="; (returns coordinate error)
//   var googlePlacesRef = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
// //   for (var i=0; i<search.length; i++) { // for google only
// //     if (i < search.length-1)
// //       googlePlacesRef += search[i]+"%20";
// //     else
// //       googlePlacesRef += search[i]+"&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=";
// //   }
//   for (var i=0; i<search.length; i++) { // for heroku
//    if (i < search.length-1)
//      googlePlacesRef += search[i]+"+";
//    else
//      googlePlacesRef += search[i]+"&key=";
//  }
//   var apiKey = "AIzaSyAFLooFShJB9IpAK8Rb_nyhNi8PuhthPt8";
//   googlePlacesRef += apiKey;
//   var request = require('request');
//   var options = {
//     'method': 'GET',
//     'url': googlePlacesRef,
//     'headers': {
//     }
//   };
//   request(options, function (error, response,body) { 
//     if (error) throw new Error(error);
//     console.log(response.body);
//     var nameBody = response.body.split('"name" : "');
//     var addressBody = response.body.split('"formatted_address" : "');
//     var latitudeBody = response.body.split('"lat" : ');
//     var longitudeBody = response.body.split('"lng" : ');
//     var count = (body.match(/formatted_address/g) || []).length; // Count number of results
//     for (var i=1; i<count; i++) {
//       var serviceBox = document.createElement("div");
//       serviceBox.style.backgroundColor = "rgb(215, 215, 215)";
//       serviceBox.style.borderRadius = "15px";
//       var name = document.createElement("div");
//       name.textContent = nameBody[i].split('",')[0];
//       name.className = "box-row";
//       serviceBox.appendChild(name);
//       var address = document.createElement("div");
//       address.textContent = addressBody[i].split('",')[0];
//       address.className = "box-row";
//       serviceBox.appendChild(address);
//       // var latitude = document.createElement("div");
//       // latitude.textContent = latitudeBody.split(",")[0];
//       // latitude.className = "input-box";
//       // serviceBox.appendChild(latitude);
//       // var longitude = document.createElement("div");
//       // longitude.textContent = longitudeBody.split(",")[0];
//       // longitude.className = "input-box";
//       // serviceBox.appendChild(longitude);
//       document.getElementById("bubble-home").appendChild(serviceBox);
//     }

//   });
// }
 
  formatResults() {

  }
  render() {
    return (
      <div id="services-form">
        {/* <label>Enter your city: </label>
        <input type="text" onBlur={e=>this.setState({city:e.target.value})}/> */}
        <button className="mb-5" type="button" onClick={this.trackLocation}>Detect your location</button>
        <div className="row">
          <input className="search-bar mr-3" id="services-search" placeholder="Search..." maxLength="50" onChange={this.updateSearch} value={this.state.search}></input>
          <button onClick={this.getUpdates}>Search</button>
        </div>
        <div id="bubble-home"></div>
        {/* <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.latitude}</div>
        <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.longitude}</div> */}
        {/* <div className="contact-box my-3 mx-5 px-3 py-5"><cards dog_wash={this.getUpdates.outcome}/> </div> */}
        {/* <div id="results-box" className="contact-box my-3 mx-5 px-3 py-5"></div> */}
        {/* <iframe width="600" height="450" frameBorder="0" style={{border: "0"}} src="https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAFLooFShJB9IpAK8Rb_nyhNi8PuhthPt8" allowFullScreen></iframe> */}
        {/* <img style={{height: "600px", width: "600px"}}alt="maps" src="https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAFLooFShJB9IpAK8Rb_nyhNi8PuhthPt8"></img> */}
        {/* <div style={{height: "100%"}} id="map"></div> */}
        {/* <script style={{height: "100%"}} src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFLooFShJB9IpAK8Rb_nyhNi8PuhthPt8&libraries=places&callback=initMap" async defer></script> */}
        {/* <div id="success-message" className="trak_body">
          <div>Service Booked!</div>
        </div> */}
        
        </div>
      
    );
  }
}

export default ServicesForm;