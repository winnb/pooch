import React from "react";
import "./styles.scss"; // Styles
import Slide from "react-reveal";
import dog_wash from "../ServicesForm/cards"
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
    //this.setState({apikey:"jmi-PoyyCL6TczqHp0M9e5ywy7Bs8GAaEehHDP-7ktNpoflo4uvMUs-t312lgSqo8Ton8MVJ5faipw85aJGCk1O1YYZkWAPUMBy8Q8KkjvhabSflVGKZS65cDNJRXnYx"});
    this.getUpdates();
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
    outcome = JSON.parse(body).results;
    //console.log(outcome);
  });
  this.setState({results:outcome});
  console.log(this.state.results);
}

//const listItems = this.state.results.map((res) => <div key={res.name}>{res.name}</div>);
 
  render() {
    return (
      <div id="services-form">
        <Slide down>
          <div className="pooch-title">Dog Services</div>
        </Slide>
        <label for="location">Enter your city: </label>
        <input type="text" onBlur={e=>this.setState({city:e.target.value})}/>
        <button type="button" onClick={this.trackLocation}>Track your location</button>
        <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.latitude}</div>
        <div className="contact-box my-3 mx-5 px-3 py-5">{this.state.longitude}</div>
        <div className="contact-box my-3 mx-5 px-3 py-5"><cards dog_wash={this.getUpdates.outcome}/> </div>
        <div id="results-box" className="contact-box my-3 mx-5 px-3 py-5"></div>
        
        <div id="success-message" className="trak_body">
          <div>Service Booked!</div>
        </div>
        </div>
      
    );
  }
}

export default ServicesForm;