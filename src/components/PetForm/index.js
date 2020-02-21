import React from "react";

// Components
// import Button from "../Button";
// import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.scss";

// Graphics and Animation
// import Slide from "react-reveal";
import DogBust from "./dog-bust.png";

class PetForm extends React.Component {

  componentDidMount() {
    const db = Fire.firestore();
    setTimeout(() => { // Check if user has dog profiles
      db.collection("pets")
      .where("email", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          document.getElementById("database-dog-name").innerHTML = doc.data().name;
          document.getElementById("database-dog-gender").innerHTML = doc.data().gender;
          document.getElementById("database-dog-breed").innerHTML = doc.data().breed;
          document.getElementById("database-primary-color").innerHTML = doc.data().colorPrimary;
          document.getElementById("database-secondary-color").innerHTML = doc.data().colorSecondary;
          document.getElementById("database-tertiary-color").innerHTML = doc.data().colorTertiary;
          document.getElementById("database-dog-birthday").innerHTML = doc.data().birthday;
          document.getElementById("database-dog-bio").innerHTML = doc.data().bio;
          document.getElementById("database-profile-pic-large").src = doc.data().pic;
          document.getElementById("profile-select").innerHTML += "<option value='"+doc.data().name+"'>"+doc.data().name+"</option>";
        });
      });
    }, 1000);
    setTimeout(() => {
      if (document.getElementById("database-dog-name").value === null)
        document.getElementById("database-profile").className += " collapse";
    }, 500);
  }

  toggleCollapse() {
    if (document.getElementById("profile-pic-buttons").className === "col ml-5 my-3 collapse")
        document.getElementById("profile-pic-buttons").className = "col ml-5 my-3 collapse.show";
    else if (document.getElementById("profile-pic-buttons").className === "col ml-5 my-3 collapse.show")
        document.getElementById("profile-pic-buttons").className = "col ml-5 my-3 collapse"; 
  }

  fileUploadHandler = event => {
    var input = event.target; // Get image that changed state of input element
    var reader = new FileReader();
    reader.onload = function() {
    var dataURL = reader.result;
    var output = document.getElementById('profile-pic-large');
    output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]); // Show preview of image
}

updateDog() {
  const db = Fire.firestore();
  var query = db.collection("pets").where('email', '==', Fire.auth().currentUser.email)
  .where("name", "==", document.getElementById("dog-name").value);
  query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  setTimeout(() => {
  db.collection("pets").add({
    email: Fire.auth().currentUser.email,
    name: document.getElementById("dog-name").value,
    gender: document.getElementById("dog-gender").value,
    breed: document.getElementById("dog-breed-simple").value,
    colorPrimary: document.getElementById("primary-color").value,
    colorSecondary: document.getElementById("secondary-color").value,
    colorTertiary: document.getElementById("tertiary-color").value,
    birthday: document.getElementById("dog-birthday").value,
    bio: document.getElementById("dog-bio").value,
    pic: document.getElementById("profile-pic-large").src
  });
}, 1000);
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

triggerAction() {
  const db = Fire.firestore();
  if (document.getElementById("action-select").value === "view")
  {
    db.collection("pets")
      .where("email", "==", Fire.auth().currentUser.email)
      .where("name", "==", document.getElementById("profile-select").value)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          document.getElementById("database-dog-name").innerHTML = doc.data().name;
          document.getElementById("database-dog-gender").innerHTML = doc.data().gender;
          document.getElementById("database-dog-breed").innerHTML = doc.data().breed;
          document.getElementById("database-primary-color").innerHTML = doc.data().colorPrimary;
          document.getElementById("database-secondary-color").innerHTML = doc.data().colorSecondary;
          document.getElementById("database-tertiary-color").innerHTML = doc.data().colorTertiary;
          document.getElementById("database-dog-birthday").innerHTML = doc.data().birthday;
          document.getElementById("database-dog-bio").innerHTML = doc.data().bio;
          document.getElementById("database-profile-pic-large").src = doc.data().pic;
        });
      });
      document.getElementById("new-dog-profile-title").innerHTML = "New Dog Profile";
      document.getElementById("dog-profile-button").innerHTML = "Add New Dog";
  }
  else if (document.getElementById("action-select").value === "edit")
  {
    db.collection("pets")
      .where("email", "==", Fire.auth().currentUser.email)
      .where("name", "==", document.getElementById("profile-select").value)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          document.getElementById("dog-name").value = doc.data().name;
          document.getElementById("dog-gender").value = doc.data().gender;
          document.getElementById("dog-breed").value = doc.data().breed;
          document.getElementById("primary-color").value = doc.data().colorPrimary;
          document.getElementById("secondary-color").value = doc.data().colorSecondary;
          document.getElementById("tertiary-color").value = doc.data().colorTertiary;
          document.getElementById("dog-birthday").value = doc.data().birthday;
          document.getElementById("dog-bio").value = doc.data().bio;
          document.getElementById("profile-pic-large").src = doc.data().pic;
          document.getElementById("new-dog-profile-title").innerHTML = "Edit Dog Profile";
          document.getElementById("dog-profile-button").innerHTML = "Update Profile";
        });
      });
  }
  else if (document.getElementById("action-select").value === "delete")
  {
    db.collection("pets")
      .where("email", "==", Fire.auth().currentUser.email)
      .where("name", "==", document.getElementById("profile-select").value)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          document.getElementById("profile-select").options[document.getElementById("profile-select").selectedIndex].remove();
          doc.ref.delete();
        });
      });
      document.getElementById("new-dog-profile-title").innerHTML = "New Dog Profile";
      document.getElementById("dog-profile-button").innerHTML = "Add New Dog";
  }
}

  render() {
    return (
      <div className="mt-7 mx-6 mb-8">
        <div className="row" id="action-row">
            <div className="my-3 mr-2">I want to</div>
            <select className="my-3 mx-2 pl-3 py-1" id="action-select" onChange={this.triggerAction}>
            <option value="">Select an action</option>
              <option value="view">view</option>
              <option value="edit">edit</option>
              <option value="delete">delete</option>
            </select>
            <select className="my-3 mx-2 px-3 py-1" id="profile-select" onChange={this.triggerAction}>
              <option value="">Select a dog</option>
            </select>
            <div className="my-3 ml-2">'s profile</div>
          </div>
          <div className="row mt-2 mb-6" id="database-profile">
              <div className="col profile-box mx-2 py-4">
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="trak_nav-item ml-6">Dog Profile</div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-dog-name" type="text"></div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-dog-gender"></div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-dog-breed">Breed</div>  
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-primary-color"></div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-secondary-color"></div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-tertiary-color"></div>
                  </span>
                  <span className="trak_body row my-2 mx-4 mr-8">
                      <div className="col database-profile-field" id="database-dog-birthday" type="date"></div>
                  </span>
              </div>
              <div className="col profile-box mx-2 py-4">
                  <div className="row mx-5">
                      <img id="database-profile-pic-large" src={DogBust} alt="Profile"/>
                  </div>
                  <div className="row mx-3">
                      <div className="my-3 px-2 py-1 database-profile-field" id="database-dog-bio" cols="30" rows="4" maxlength="120"></div>                 
                  </div>
              </div>
          </div>
        <div id="new-dog-profile" className="collapse.show">
               <div className="row">
                  <div className="col profile-box mx-2 py-4">
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <div className="trak_nav-item ml-6" id="new-dog-profile-title">New Dog Profile</div>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                          <input className="col profile-field" id="dog-name" type="text" placeholder="Dog Name" maxlength="50"/>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <select className="col profile-field" id="dog-gender">
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <select className="col collapse.show" id="dog-breed-simple" name="Dog Breed:">
                          <option value="">Select dog breed</option>
                          <option value="Australian Shepard">Australian Shepard</option>
                          <option value="Beagle">Beagle</option>
                          <option value="Boxer">Boxer</option>
                          <option value="Bulldog">Bulldog</option>
                          <option value="Chihuahua">Chihuahua</option>
                          <option value="Collie">Collie</option>
                          <option value="Corgie">Corgie</option>
                          <option value="Daschund">Daschund</option>
                          <option value="Dalmation">Dalmation</option>
                          <option value="German Shepard">German Shepard</option>
                          <option value="Golden Retreiver">Golden Retreiver</option>
                          <option value="Great Dane">Great Dane</option>
                          <option value="Hound">Hound</option>
                          <option value="Labrador Retreiver">Labrador Retreiver</option>
                          <option value="Mastiff">Mastiff</option>
                          <option value="Pinscher">Pinscher</option>
                          <option value="Pointer">Pointer</option>
                          <option value="Pomeranian">Pomeranian</option>
                          <option value="Poodle">Poodle</option>
                          <option value="Pug">Pug</option>
                          <option value="Rottweiler">Rottweiler</option>
                          <option value="Setter">Setter</option>
                          <option value="Siberian Husky">Siberian Husky</option>
                          <option value="Schnauzer">Schnauzer</option>
                          <option value="Sheepdog">Sheepdog</option>
                          <option value="Shih Tzu">Shih Tzu</option>
                          <option value="Spaniel">Spaniel</option>
                          <option value="Terrier">Terrier</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8 collapse">
                        <select className="col" id="dog-breed">
                          <option value="">Select dog breed</option>
                          <option value="Affenpinscher">Affenpinscher</option>
                          <option value="Afghan Hound">Afghan Hound</option>
                          <option value="Airedale Terrier">Airedale Terrier</option>
                          <option value="Akita">Akita</option>
                          <option value="Alaskan Malamute">Alaskan Malamute</option>
                          <option value="American English Coonhound">American English Coonhound</option>
                          <option value="American Eskimo Dog">American Eskimo Dog</option>
                          <option value="American Foxhound">American Foxhound</option>
                          <option value="American Hairless Terrier">American Hairless Terrier</option>
                          <option value="American Leopard Hound">American Leopard Hound</option>
                          <option value="American Staffordshire Terrier">American Staffordshire Terrier</option>
                          <option value="American Water Spaniel">American Water Spaniel</option>
                          <option value="Anatolian Shepard Dog">Anatolian Shepard Dog</option>
                          <option value="Appenzeller Sennenhund">Appenzeller Sennenhund</option>
                          <option value="Australian Cattle Dog">Australian Cattle Dog</option>
                          <option value="Australian Kelpie">Australian Kelpie</option>
                          <option value="Australian Shepard">Australian Shepard</option>
                          <option value="Australian Terrier">Australian Terrier</option>
                          <option value="Azawakh">Azawakh</option>
                          <option value="Barbet">Barbet</option>
                          <option value="Basenji">Basenji</option>
                          <option value="Basset Hound">Basset Hound</option>
                          <option value="Bavarian Mountain Scent Hound">Bavarian Mountain Scent Hound</option>
                          <option value="Beagle">Beagle</option>
                          <option value="Bearded Collie">Bearded Collie</option>
                          <option value="Beauceron">Beauceron</option>
                          <option value="Bedlington Terrier">Bedlington Terrier</option>
                          <option value="Belgian Laekenois">Belgian Laekenois</option>
                          <option value="Belgian Malinois">Belgian Malinois</option>
                          <option value="Belgian Sheepdog">Belgian Sheepdog</option>
                          <option value="Beligan Tervuren">Beligan Tervuren</option>
                          <option value="Bergamasco Sheepdog">Bergamasco Sheepdog</option>
                          <option value="Berger Picard">Berger Picard</option>
                          <option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
                          <option value="Bichon Frise">Bichon Frise</option>
                          <option value="Biewer Terrier">Biewer Terrier</option>
                          <option value="Black and Tan Coonhound">Black and Tan Coonhound</option>
                          <option value="Black Russian Terrier">Black Russian Terrier</option>
                          <option value="Bloodhound">Bloodhound</option>
                          <option value="Bluetick Coonhound">Bluetick Coonhound</option>
                          <option value="Boerboel">Boerboel</option>
                          <option value="Bohemian Shepard">Bohemian Shepard</option>
                          <option value="Bolognese">Bolognese</option>
                          <option value="Border Collie">Border Collie</option>
                          <option value="Border Terrier">Border Terrier</option>
                          <option value="Borzoi">Borzoi</option>
                          <option value="Boston Terrier">Boston Terrier</option>
                          <option value="Boxer">Boxer</option>
                          <option value="Boykin Spaniel">Boykin Spaniel</option>
                          <option value="Bracco Italiano">Bracco Italiano</option>
                          <option value="Briard">Briard</option>
                          <option value="Brittany">Brittany</option>
                          <option value="Broholmer">Broholmer</option>
                          <option value="Brussels Griffon">Brussels Griffon</option>
                          <option value="Bull Terrier">Bull Terrier</option>
                          <option value="Bulldog">Bulldog</option>
                          <option value="Bullmastiff">Bullmastiff</option>
                          <option value="Cairn Terrier">Cairn Terrier</option>
                          <option value="Cannan Dog">Cannan Dog</option>
                          <option value="Cane Corso">Cane Corso</option>
                          <option value="Cardigan Welsh Corgi">Cardigan Welsh Corgi</option>
                          <option value="Carolina Dog">Carolina Dog</option>
                          <option value="Catahoula Leopard Dog">Catahoula Leopard Dog</option>
                          <option value="Caucasian Shepard Dog">Caucasian Shepard Dog</option>
                          <option value="Central Asian Shepard Dog">Central Asian Shepard Dog</option>
                          <option value="Cesky Terrier">Cesky Terrier</option>
                          <option value="Chesapeake Bay Retreiver">Chesapeake Bay Retreiver</option>
                          <option value="Chihuahua">Chihuahua</option>
                          <option value="Chinese Crested">Chinese Crested</option>
                          <option value="Chinese Sharpei">Chinese Sharpei</option>
                          <option value="Chinook">Chinook</option>
                          <option value="Chow Chow">Chow Chow</option>
                          <option value="Clumber Spaniel">Clumber Spaniel</option>
                          <option value="Cocker Spaniel">Cocker Spaniel</option>
                          <option value="Collie">Collie</option>
                          <option value="Croatian Sheepdog">Croatian Sheepdog</option>
                          <option value="Curly Coated Retreiver">Curly Coated Retreiver</option>
                          <option value="Daschund">Daschund</option>
                          <option value="Dalmation">Dalmation</option>
                          <option value="Dandie Dinmont Terrier">Dandie Dinmont Terrier</option>
                          <option value="Danish Swedish Farmdog">Danish Swedish Farmdog</option>
                          <option value="Deutcher Watchelhund">Deutcher Watchelhund</option>
                          <option value="Doberman Pinscher">Doberman Pinscher</option>
                          <option value="Dogo Argentino">Dogo Argentino</option>
                          <option value="Dogue de Bordeaux">Dogue de Bordeaux</option>
                          <option value="Drever">Drever</option>
                          <option value="Dutch Shepard">Dutch Shepard</option>
                          <option value="English Cocker Spaniel">English Cocker Spaniel</option>
                          <option value="English Foxhound">English Foxhound</option>
                          <option value="English Setter">English Setter</option>
                          <option value="English Springer Spaniel">English Springer Spaniel</option>
                          <option value="English Toy Spaniel">English Toy Spaniel</option>
                          <option value="Entlebucher Mountain Dog">Entlebucher Mountain Dog</option>
                          <option value="Estrela Mountain Dog">Estrela Mountain Dog</option>
                          <option value="Eurasier">Eurasier</option>
                          <option value="Field Spaniel">Field Spaniel</option>
                          <option value="Finnish Lapphund">Finnish Lapphund</option>
                          <option value="Finnish Spitz">Finnish Spitz</option>
                          <option value="Flat Coated Retreiver">Flat Coated Retreiver</option>
                          <option value="French Bulldog">French Bulldog</option>
                          <option value="French Spaniel">French Spaniel</option>
                          <option value="German Longhaired Pointer">German Longhaired Pointer</option>
                          <option value="German Pinscher">German Pinscher</option>
                          <option value="German Shepard">German Shepard</option>
                          <option value="German Shorthaired Pointer">German Shorthaired Pointer</option>
                          <option value="German Spitz">German Spitz</option>
                          <option value="German Wirehaired Pointer">German Wirehaired Pointer</option>
                          <option value="Giant Schnauzer">Giant Schnauzer</option>
                          <option value="Golden Retreiver">Golden Retreiver</option>
                          <option value="Gordon Setter">Gordon Setter</option>
                          <option value="Great Dane">Great Dane</option>
                          <option value="Great Pyrenees">Great Pyrenees</option>
                          <option value="Greater Swiss Mountain Dog">Greater Swiss Mountain Dog</option>
                          <option value="Greyhound">Greyhound</option>
                          <option value="Hamltonstovare">Hamltonstovare</option>
                          <option value="Hanoverian Scenthound">Hanoverian Scenthound</option>
                          <option value="Harrier">Harrier</option>
                          <option value="Havanese">Havanese</option>
                          <option value="Hokkaido">Hokkaido</option>
                          <option value="Hovawart">Hovawart</option>
                          <option value="Ibizian Hound">Ibizian Hound</option>
                          <option value="Icelandic Sheepdog">Icelandic Sheepdog</option>
                          <option value="Irish Red and White Setter">Irish Red and White Setter</option>
                          <option value="Irish Setter">Irish Setter</option>
                          <option value="Irish Terrier">Irish Terrier</option>
                          <option value="Irish Water Spaniel">Irish Water Spaniel</option>
                          <option value="Irish Wolfhound">Irish Wolfhound</option>
                          <option value="Italian Greyhound">Italian Greyhound</option>
                          <option value="Jagdterrier">Jagdterrier</option>
                          <option value="Japanese Chin">Japanese Chin</option>
                          <option value="Japanese Spitz">Japanese Spitz</option>
                          <option value="Jindo">Jindo</option>
                          <option value="Kai Ken">Kai Ken</option>
                          <option value="Karelian Bear Dog">Karelian Bear Dog</option>
                          <option value="Keeshond">Keeshond</option>
                          <option value="Kerry Blue Terrier">Kerry Blue Terrier</option>
                          <option value="Kishu Ken">Kishu Ken</option>
                          <option value="Komondor">Komondor</option>
                          <option value="Kuvasz">Kuvasz</option>
                          <option value="Labrador Retreiver">Labrador Retreiver</option>
                          <option value="Lakeland Terrier">Lakeland Terrier</option>
                          <option value="Lanchashire Heeler">Lanchashire Heeler</option>
                          <option value="Laponian Herder">Laponian Herder</option>
                          <option value="Leonberger">Leonberger</option>
                          <option value="Lhasa Apso">Lhasa Apso</option>
                          <option value="Lowchen">Lowchen</option>
                          <option value="Maltese">Maltese</option>
                          <option value="Manchester Terrier">Manchester Terrier</option>
                          <option value="Mastiff">Mastiff</option>
                          <option value="Miniature American Shepard">Miniature American Shepard</option>
                          <option value="Miniature Bull Terrier">Miniature Bull Terrier</option>
                          <option value="Miniature Pinscher">Miniature Pinscher</option>
                          <option value="Miniature Schnauzer">Miniature Schnauzer</option>
                          <option value="Mountain Cur">Mountain Cur</option>
                          <option value="Mudi">Mudi</option>
                          <option value="Neopolitan Mastiff">Neopolitan Mastiff</option>
                          <option value="Newfoundland">Newfoundland</option>
                          <option value="Norfolk Terrier">Norfolk Terrier</option>
                          <option value="Norweigan Buhund">Norweigan Buhund</option>
                          <option value="Norweigan Elkhound">Norweigan Elkhound</option>
                          <option value="Norweigan Lundehund">Norweigan Lundehund</option>
                          <option value="Norwich Terrier">Norwich Terrier</option>
                          <option value="Old English Sheepdog">Old English Sheepdog</option>
                          <option value="Otterhound">Otterhound</option>
                          <option value="Papillon">Papillon</option>
                          <option value="Parson Russel Terrier">Parson Russel Terrier</option>
                          <option value="Pekingese">Pekingese</option>
                          <option value="Pembroke Welsh Corgi">Pembroke Welsh Corgi</option>
                          <option value="Peruvian Inca Orchid">Peruvian Inca Orchid</option>
                          <option value="Pharoah Hound">Pharoah Hound</option>
                          <option value="Plott Hound">Plott Hound</option>
                          <option value="Pointer">Pointer</option>
                          <option value="Polish Lowland Sheepdog">Polish Lowland Sheepdog</option>
                          <option value="Pomeranian">Pomeranian</option>
                          <option value="Poodle">Poodle</option>
                          <option value="Porcelaine">Porcelaine</option>
                          <option value="Portugese Podengo">Portugese Podengo</option>
                          <option value="Portugese Pointer">Portugese Pointer</option>
                          <option value="Portugese Sheep Dog">Portugese Sheep Dog</option>
                          <option value="Portugese Water Dog">Portugese Water Dog</option>
                          <option value="Pudelpointer">Pudelpointer</option>
                          <option value="Pug">Pug</option>
                          <option value="Puli">Puli</option>
                          <option value="Pumi">Pumi</option>
                          <option value="Pyrenean Mastiff">Pyrenean Mastiff</option>
                          <option value="Pyrenean Shepard">Pyrenean Shepard</option>
                          <option value="Rat Terrier">Rat Terrier</option>
                          <option value="Redbone Coonhound">Redbone Coonhound</option>
                          <option value="Rhodesian Ridgeback">Rhodesian Ridgeback</option>
                          <option value="Rottweiler">Rottweiler</option>
                          <option value="Russel Terrier">Russel Terrier</option>
                          <option value="Russian Toy">Russian Toy</option>
                          <option value="Saint Bernard">Saint Bernard</option>
                          <option value="Saluki">Saluki</option>
                          <option value="Samoyed">Samoyed</option>
                          <option value="Schapendoes">Schapendoes</option>
                          <option value="Shipperke">Shipperke</option>
                          <option value="Scottish Deerhound">Scottish Deerhound</option>
                          <option value="Scottish Terrier">Scottish Terrier</option>
                          <option value="Sealyham Terrier">Sealyham Terrier</option>
                          <option value="Segugio Italiano">Segugio Italiano</option>
                          <option value="Shetland Sheepdog">Shetland Sheepdog</option>
                          <option value="Shiba Inu">Shiba Inu</option>
                          <option value="Shih Tzu">Shih Tzu</option>
                          <option value="Shikoku">Shikoku</option>
                          <option value="Siberian Husky">Siberian Husky</option>
                          <option value="Silky Terrier">Silky Terrier</option>
                          <option value="Skye Terrier">Skye Terrier</option>
                          <option value="Sloughi">Sloughi</option>
                          <option value="Slovakian Wirehaired Pointer">Slovakian Wirehaired Pointer</option>
                          <option value="Small Munsterlander Pointer">Small Munsterlander Pointer</option>
                          <option value="Smooth Fox Terrier">Smooth Fox Terrier</option>
                          <option value="Soft Coated Wheaton Terrier">Soft Coated Wheaton Terrier</option>
                          <option value="Spanish Mastiff">Spanish Mastiff</option>
                          <option value="Spanish Water Dog">Spanish Water Dog</option>
                          <option value="Spinone Italiano">Spinone Italiano</option>
                          <option value="Stabyhoun">Stabyhoun</option>
                          <option value="Staffordshire Bull Terrier">Staffordshire Bull Terrier</option>
                          <option value="Standard Schnauzer">Standard Schnauzer</option>
                          <option value="Sussex Spaniel">Sussex Spaniel</option>
                          <option value="Swedish Lapphund">Swedish Lapphund</option>
                          <option value="Swedish Vallhund">Swedish Vallhund</option>
                          <option value="Taiwan Dog">Taiwan Dog</option>
                          <option value="Teddy Roosevelt Terrier">Teddy Roosevelt Terrier</option>
                          <option value="Thai Ridgeback">Thai Ridgeback</option>
                          <option value="Tibetan Mastiff">Tibetan Mastiff</option>
                          <option value="Tibetan Spaniel">Tibetan Spaniel</option>
                          <option value="Tibetan Terrier">Tibetan Terrier</option>
                          <option value="Tornjak">Tornjak</option>
                          <option value="Tosa">Tosa</option>
                          <option value="Toy Fox Terrier">Toy Fox Terrier</option>
                          <option value="Translyvanian Hound">Translyvanian Hound</option>
                          <option value="Treeing Tennessee Brindle">Treeing Tennessee Brindle</option>
                          <option value="Treeing Walker Coonhound">Treeing Walker Coonhound</option>
                          <option value="Vizsla">Vizsla</option>
                          <option value="Weimaraner">Weimaraner</option>
                          <option value="Welsh Springer Spaniel">Welsh Springer Spaniel</option>
                          <option value="Welsh Terrier">Welsh Terrier</option>
                          <option value="Whippet">Whippet</option>
                          <option value="Wire Fox Terrier">Wire Fox Terrier</option>
                          <option value="Wirehaired Pointing Griffon">Wirehaired Pointing Griffon</option>
                          <option value="Wirehaired Vizsla">Wirehaired Vizsla</option>
                          <option value="Working Kelpie">Working Kelpie</option>
                          <option value="Xoloitzcuintli">Xoloitzcuintli</option>
                          <option value="Yakutian Laika">Yakutian Laika</option>
                          <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <select className="col profile-field" id="primary-color">
                          <option value="">Select main color</option>
                          <option value="Black">Black</option>
                          <option value="Grey">Grey</option>
                          <option value="Blue">Blue</option>
                          <option value="White">White</option>
                          <option value="Yellow">Yellow</option>
                          <option value="Orange">Orange</option>
                          <option value="Red">Red</option>
                          <option value="Brown">Brown</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <select className="col profile-field" id="secondary-color">
                          <option value="">Select second color</option>
                          <option value="Black">Black</option>
                          <option value="Grey">Grey</option>
                          <option value="Blue">Blue</option>
                          <option value="White">White</option>
                          <option value="Yellow">Yellow</option>
                          <option value="Orange">Orange</option>
                          <option value="Red">Red</option>
                          <option value="Brown">Brown</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <select className="col profile-field" id="tertiary-color">
                          <option value="">Select third color</option>
                          <option value="Black">Black</option>
                          <option value="Grey">Grey</option>
                          <option value="Blue">Blue</option>
                          <option value="White">White</option>
                          <option value="Yellow">Yellow</option>
                          <option value="Orange">Orange</option>
                          <option value="Red">Red</option>
                          <option value="Brown">Brown</option>
                        </select>
                      </span>
                      <span className="trak_body row my-2 mx-4 mr-8">
                        <label>Birthday:</label>
                        <input className="col profile-field" id="dog-birthday" type="date" title="Date of Birth" min="1990-01-01" max="2030-12-31"/>
                      </span>
                  </div>
                  <div className="col profile-box mx-2 py-4">
                    <div className="row mx-5">
                      <img id="profile-pic-large" src={DogBust} alt="Profile" onClick={this.toggleCollapse}/>
                      <div className="col ml-5 my-3 collapse" id="profile-pic-buttons">
                        <div className="row"><input type="file" id="edit-profile-pic-input" onChange={this.fileUploadHandler}/></div>
                        <div className="row"><button id="edit-profile-pic-button" onClick={this.updateProfilePic}>Update Picture</button></div>
                        <div className="row"><div className="ml-2" id="tooltip">Ensure image is square</div></div>
                      </div>
                    </div>
                    <div className="row mx-3">
                      <textarea id="dog-bio" className="my-3" cols="30" rows="4" maxlength="120" placeholder="Biography..."></textarea>                 
                    </div>
                  </div>
              </div>
              <button type="submit" className="btn btn-primary mx-9 my-4" id="dog-profile-button" onClick={this.updateDog}>Add New Dog</button>
          </div>
      </div>
    );
  }
}

export default PetForm;
