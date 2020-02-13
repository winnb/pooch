import React from "react";

// Components
import Button from "../Button";
import Loader from "react-loader-spinner";

//Firebase
import Fire from "../../config/Fire.js";

//styles
import "../AllMeetups/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../PetForm/styles.scss";

// Graphics and Animation
import Slide from "react-reveal";
import DogBust from "./dog-bust.png";

class PetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      breed: "",
      color: "",
      dateOfBirth: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addPet = this.addPet.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.updateGrid();
    // Show loading icon for 2 seconds while grid loads
    document.getElementById("loader").style.display = "block";
    document.getElementById("result-table").style.display = "none";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result-table").style.display = "block";
    }, 500);
  }

  updateGrid() {
    // Clear grid before updating
    document.getElementById("pet-grid").innerHTML = null;

    const db = Fire.firestore();

    setTimeout(() => {
      // Get dogs from Firebase
      db.collection("pets")
      .where("ownerEmail", "==", Fire.auth().currentUser.email)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderPets(doc);
        });
      });
    }, 500);

      // Create a grid to store meetup data
    const grid = document.querySelector("#pet-grid");
    function renderPets(doc) {
      // create a list to style the data
      let li = document.createElement("tr");
      let pic = document.createElement("img");
      let name = document.createElement("td");
      let gender = document.createElement("td");
      let breed = document.createElement("td");
      let color = document.createElement("td");
      let dateOfBirth = document.createElement("td");
      li.setAttribute("data-id", doc.id);

      // Update local state to database contents
      pic.src = DogBust;
      pic.alt = "Default dog icon";
      pic.className = "dog-icon"
      name.textContent = doc.data().name;
      gender.textContent = doc.data().gender;
      breed.textContent = doc.data().breed;
      color.textContent = doc.data().color;
      dateOfBirth.textContent = doc.data().dateOfBirth;

      // Add all contents to the list
      li.appendChild(pic);
      li.appendChild(name);
      li.appendChild(gender);
      li.appendChild(breed);
      li.appendChild(color);
      li.appendChild(dateOfBirth);

      // Add list to grid
      grid.appendChild(li);
    }
  }

  addPet = e => {
    this.updateGrid();
    //Pop-up Confirmation message
    document.getElementById("success-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 2000);

    e.preventDefault();
    const db = Fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("pets").add({
      name: this.state.name,
      gender: document.getElementsByTagName("select")[0].value,
      breed: this.state.breed,
      color: this.state.color,
      dateOfBirth: this.state.dateOfBirth,
      ownerEmail: Fire.auth().currentUser.email
    });

    // Reset state
    this.setState({
      name: "",
      gender: "",
      breed: "",
      color: "",
      dateOfBirth: ""
    });

  };

  render() {
    return (
      <div className="mt-7 ml-5 input-group-prepend">
        <form onSubmit={this.addPet}>
          <Slide down>
            <div className="trak_heading-medium">
              Your Pets
            </div>
          </Slide>
          <div id="loader" className="mb-4">
            <Loader
              type="Grid"
              // type="MutatingDots"
              color="black"
              height={75}
              width={75}
              // timeout={3000} //3 secs
            />
          </div>
          {/* Render contents of database */}
          <div id="result-table">
            <table className="table mt-5 text-left">
              <thead className="thead-light trak_heading-small">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Pet Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Color</th>
                  <th scope="col">Date of Birth</th>
                </tr>
              </thead>
              <tbody id="pet-grid"></tbody>
            </table>
          </div>
          <div id = "success-message">
                Pet Successfully Added 
          </div>
          <div className="trak_heading-medium mt-7 mb-3" id="space">Got more pups? Add them below!</div>
            <div>
            {/* Name */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Pet Name
              </span>
            <input
              name="name"
              type="text"
              title="Pet Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              maxlength="32"
            />
            </div>
            <div className="mb-1">
            {/* Gender */}
            <span className="input-group-text" id="inputGroup-sizing-default">
                Gender
            </span>
            <select
              name="gender"
              className="form-control"
              value={this.state.gender}
              onChange={this.handleChange}
              required
              title="Select a gender"
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            </div>
            <div className="mb-1">
            {/* Breed */}
            <span className="input-group-text" id="inputGroup-sizing-default">
                Breed
            </span>
            <select
              name="breed"
              className="form-control"
              value={this.state.breed}
              onChange={this.handleChange}
              required
              title="Select a breed"
            >
              <option value="Affenpinscher">Affenpinscher</option>
              <option value="Afghan-Hound">Afghan Hound</option>
              <option value="Airedale-Terrier">Airedale Terrier</option>
              <option value="Akita">Akita</option>
              <option value="Alaskan-Malamute">Alaskan Malamute</option>
              <option value="American-English-Coonhound">American English Coonhound</option>
              <option value="American-Eskimo-Dog">American-Eskimo-Dog</option>
              <option value="American-Foxhound">American-Foxhound</option>
              <option value="American-Hairless-Terrier">American Hairless Terrier</option>
              <option value="American-Leopard-Hound">American Leopard Hound</option>
              <option value="American-Staffordshire-Terrier">American Staffordshire Terrier</option>
              <option value="American-Water-Spaniel">American Water Spaniel</option>
              <option value="Anatolian-Shepard-Dog">Anatolian Shepard Dog</option>
              <option value="Appenzeller-Sennenhund">Appenzeller Sennenhund</option>
              <option value="Australian-Cattle-Dog">Australian Cattle Dog</option>
              <option value="Australian-Kelpie">Australian Kelpie</option>
              <option value="Australian-Shepard">Australian Shepard</option>
              <option value="Australian-Terrier">Australian Terrier</option>
              <option value="Azawakh">Azawakh</option>
              <option value="Barbet">Barbet</option>
              <option value="Basenji">Basenji</option>
              <option value="Basset-Hound">Basset Hound</option>
              <option value="Bavarian-Mountain-Scent-Hound">Bavarian Mountain Scent Hound</option>
              <option value="Beagle">Beagle</option>
              <option value="Bearded-Collie">Bearded Collie</option>
              <option value="Beauceron">Beauceron</option>
              <option value="Bedlington-Terrier">Bedlington Terrier</option>
              <option value="Belgian-Laekenois">Belgian Laekenois</option>
              <option value="Belgian-Malinois">Belgian Malinois</option>
              <option value="Belgian-Sheepdog">Belgian Sheepdog</option>
              <option value="Beligan-Tervuren">Beligan Tervuren</option>
              <option value="Bergamasco-Sheepdog">Bergamasco Sheepdog</option>
              <option value="Berger-Picard">Berger Picard</option>
              <option value="Bernese-Mountain-Dog">Bernese Mountain Dog</option>
              <option value="Bichon-Frise">Bichon Frise</option>
              <option value="Biewer-Terrier">Biewer Terrier</option>
              <option value="Black-and-Tan-Coonhound">Black and Tan Coonhound</option>
              <option value="Black-Russian-Terrier">Black Russian Terrier</option>
              <option value="Bloodhound">Bloodhound</option>
              <option value="Bluetick-Coonhound">Bluetick Coonhound</option>
              <option value="Boerboel">Boerboel</option>
              <option value="Bohemian-Shepard">Bohemian Shepard</option>
              <option value="Bolognese">Bolognese</option>
              <option value="Border-Collie">Border Collie</option>
              <option value="Border-Terrier">Border Terrier</option>
              <option value="Borzoi">Borzoi</option>
              <option value="Boston-Terrier">Boston Terrier</option>
              <option value="Boxer">Boxer</option>
              <option value="Boykin-Spaniel">Boykin Spaniel</option>
              <option value="Bracco-Italiano">Bracco Italiano</option>
              <option value="Briard">Briard</option>
              <option value="Brittany">Brittany</option>
              <option value="Broholmer">Broholmer</option>
              <option value="Brussels-Griffon">Brussels Griffon</option>
              <option value="Bull-Terrier">Bull Terrier</option>
              <option value="Bulldog">Bulldog</option>
              <option value="Bullmastiff">Bullmastiff</option>
              <option value="Cairn-Terrier">Cairn Terrier</option>
              <option value="Cannan-Dog">Cannan Dog</option>
              <option value="Cane-Corso">Cane Corso</option>
              <option value="Cardigan-Welsh-Corgi">Cardigan Welsh Corgi</option>
              <option value="Carolina-Dog">Carolina Dog</option>
              <option value="Catahoula-Leopard-Dog">Catahoula Leopard Dog</option>
              <option value="Caucasian-Shepard-Dog">Caucasian Shepard Dog</option>
              <option value="Central-Asian-Shepard-Dog">Central Asian Shepard Dog</option>
              <option value="Cesky-Terrier">Cesky Terrier</option>
              <option value="Chesapeake-Bay-Retreiver">Chesapeake Bay Retreiver</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Chinese-Crested">Chinese Crested</option>
              <option value="Chinese-Sharpei">Chinese Sharpei</option>
              <option value="Chinook">Chinook</option>
              <option value="Chow-Chow">Chow Chow</option>
              <option value="Clumber-Spaniel">Clumber Spaniel</option>
              <option value="Cocker-Spaniel">Cocker Spaniel</option>
              <option value="Collie">Collie</option>
              <option value="Croatian-Sheepdog">Croatian Sheepdog</option>
              <option value="Curly-Coated-Retreiver">Curly Coated Retreiver</option>
              <option value="Daschund">Daschund</option>
              <option value="Dalmation">Dalmation</option>
              <option value="Dandie-Dinmont-Terrier">Dandie Dinmont Terrier</option>
              <option value="Danish-Swedish-Farmdog">Danish-Swedish Farmdog</option>
              <option value="Deutcher-Watchelhund">Deutcher Watchelhund</option>
              <option value="Doberman-Pinscher">Doberman Pinscher</option>
              <option value="Dogo-Argentino">Dogo-Argentino</option>
              <option value="Dogue-de-Bordeaux">Dogue de Bordeaux</option>
              <option value="Drever">Drever</option>
              <option value="Dutch-Shepard">Dutch Shepard</option>
              <option value="English-Cocker-Spaniel">English Cocker Spaniel</option>
              <option value="English-Foxhound">English Foxhound</option>
              <option value="English-Setter">English Setter</option>
              <option value="English-Springer-Spaniel">English Springer Spaniel</option>
              <option value="English-Toy-Spaniel">English Toy Spaniel</option>
              <option value="Entlebucher-Mountain-Dog">Entlebucher Mountain Dog</option>
              <option value="Estrela-Mountain-Dog">Estrela Mountain Dog</option>
              <option value="Eurasier">Eurasier</option>
              <option value="Field-Spaniel">Field Spaniel</option>
              <option value="Finnish-Lapphund">Finnish Lapphund</option>
              <option value="Finnish-Spitz">Finnish Spitz</option>
              <option value="Flat-Coated-Retreiver">Flat Coated Retreiver</option>
              <option value="French-Bulldog">French Bulldog</option>
              <option value="French-Spaniel">French Spaniel</option>
              <option value="German-Longhaired-Pointer">German Longhaired Pointer</option>
              <option value="German-Pinscher">German Pinscher</option>
              <option value="German-Shepard">German Shepard</option>
              <option value="German-Shorthaired-Pointer">German Shorthaired Pointer</option>
              <option value="German-Spitz">German Spitz</option>
              <option value="German-Wirehaired-Pointer">German Wirehaired Pointer</option>
              <option value="Giant-Schnauzer">Giant Schnauzer</option>
              <option value="Golden-Retreiver">Golden Retreiver</option>
              <option value="Gordon-Setter">Gordon Setter</option>
              <option value="Great-Dane">Great Dane</option>
              <option value="Great-Pyrenees">Great Pyrenees</option>
              <option value="Greater-Swiss-Mountain-Dog">Greater Swiss Mountain Dog</option>
              <option value="Greyhound">Greyhound</option>
              <option value="Hamltonstovare">Hamltonstovare</option>
              <option value="Hanoverian-Scenthound">Hanoverian Scenthound</option>
              <option value="Harrier">Harrier</option>
              <option value="Havanese">Havanese</option>
              <option value="Hokkaido">Hokkaido</option>
              <option value="Hovawart">Hovawart</option>
              <option value="Ibizian-Hound">Ibizian Hound</option>
              <option value="Icelandic-Sheepdog">Icelandic Sheepdog</option>
              <option value="Irish-Red-and-White-Setter">Irish Red and White Setter</option>
              <option value="Irish-Setter">Irish Setter</option>
              <option value="Irish-Terrier">Irish-Terrier</option>
              <option value="Irish-Water-Spaniel">Irish Water Spaniel</option>
              <option value="Irish-Wolfhound">Irish Wolfhound</option>
              <option value="Italian-Greyhound">Italian Greyhound</option>
              <option value="Jagdterrier">Jagdterrier</option>
              <option value="Japanese-Chin">Japanese Chin</option>
              <option value="Japanese-Spitz">Japanese Spitz</option>
              <option value="Jindo">Jindo</option>
              <option value="Kai-Ken">Kai Ken</option>
              <option value="Karelian-Bear-Dog">Karelian Bear Dog</option>
              <option value="Keeshond">Keeshond</option>
              <option value="Kerry-Blue-Terrier">Kerry Blue Terrier</option>
              <option value="Kishu-Ken">Kishu Ken</option>
              <option value="Komondor">Komondor</option>
              <option value="Kuvasz">Kuvasz</option>
              <option value="Labrador-Retreiver">Labrador Retreiver</option>
              <option value="Lakeland-Terrier">Lakeland Terrier</option>
              <option value="Lanchashire-Heeler">Lanchashire Heeler</option>
              <option value="Laponian-Herder">Laponian Herder</option>
              <option value="Leonberger">Leonberger</option>
              <option value="Lhasa-Apso">Lhasa Apso</option>
              <option value="Lowchen">Lowchen</option>
              <option value="Maltese">Maltese</option>
              <option value="Manchester-Terrier">Manchester Terrier</option>
              <option value="Mastiff">Mastiff</option>
              <option value="Miniature-American-Shepard">Miniature American Shepard</option>
              <option value="Miniature-Bull-Terrier">Miniature Bull Terrier</option>
              <option value="Miniature-Pinscher">Miniature Pinscher</option>
              <option value="Miniature-Schnauzer">Miniature Schnauzer</option>
              <option value="Mountain-Cur">Mountain Cur</option>
              <option value="Mudi">Mudi</option>
              <option value="Neopolitan-Mastiff">Neopolitan Mastiff</option>
              <option value="Newfoundland">Newfoundland</option>
              <option value="Norfolk-Terrier">Norfolk Terrier</option>
              <option value="Norweigan-Buhund">Norweigan Buhund</option>
              <option value="Norweigan-Elkhound">Norweigan Elkhound</option>
              <option value="Norweigan-Lundehund">Norweigan Lundehund</option>
              <option value="Norwich-Terrier">Norwich Terrier</option>
              <option value="Old-English-Sheepdog">Old English Sheepdog</option>
              <option value="Otterhound">Otterhound</option>
              <option value="Papillon">Papillon</option>
              <option value="Parson-Russel-Terrier">Parson Russel Terrier</option>
              <option value="Pekingese">Pekingese</option>
              <option value="Pembroke-Welsh-Corgi">Pembroke Welsh Corgi</option>
              <option value="Peruvian-Inca-Orchid">Peruvian Inca Orchid</option>
              <option value="Pharoah-Hound">Pharoah Hound</option>
              <option value="Plott-Hound">Plott Hound</option>
              <option value="Pointer">Pointer</option>
              <option value="Polish-Lowland-Sheepdog">Polish Lowland Sheepdog</option>
              <option value="Pomeranian">Pomeranian</option>
              <option value="Poodle">Poodle</option>
              <option value="Porcelaine">Porcelaine</option>
              <option value="Portugese-Podengo">Portugese Podengo</option>
              <option value="Portugese-Pointer">Portugese Pointer</option>
              <option value="Portugese-Sheep-Dog">Portugese Sheep Dog</option>
              <option value="Portugese-Water-Dog">Portugese Water Dog</option>
              <option value="Pudelpointer">Pudelpointer</option>
              <option value="Pug">Pug</option>
              <option value="Puli">Puli</option>
              <option value="Pumi">Pumi</option>
              <option value="Pyrenean-Mastiff">Pyrenean Mastiff</option>
              <option value="Pyrenean-Shepard">Pyrenean Shepard</option>
              <option value="Rat-Terrier">Rat Terrier</option>
              <option value="Redbone-Coonhound">Redbone Coonhound</option>
              <option value="Rhodesian-Ridgeback">Rhodesian Ridgeback</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="Russel-Terrier">Russel Terrier</option>
              <option value="Russian-Toy">Russian Toy</option>
              <option value="Saint-Bernard">Saint Bernard</option>
              <option value="Saluki">Saluki</option>
              <option value="Samoyed">Samoyed</option>
              <option value="Schapendoes">Schapendoes</option>
              <option value="Shipperke">Shipperke</option>
              <option value="Scottish-Deerhound">Scottish Deerhound</option>
              <option value="Scottish-Terrier">Scottish Terrier</option>
              <option value="Sealyham-Terrier">Sealyham Terrier</option>
              <option value="Segugio-Italiano">Segugio Italiano</option>
              <option value="Shetland-Sheepdog">Shetland Sheepdog</option>
              <option value="Shiba-Inu">Shiba Inu</option>
              <option value="Shih-Tzu">Shih Tzu</option>
              <option value="Shikoku">Shikoku</option>
              <option value="Siberian-Husky">Siberian Husky</option>
              <option value="Silky-Terrier">Silky Terrier</option>
              <option value="Skye-Terrier">Skye Terrier</option>
              <option value="Sloughi">Sloughi</option>
              <option value="Slovakian-Wirehaired-Pointer">Slovakian Wirehaired Pointer</option>
              <option value="Small-Munsterlander-Pointer">Small Munsterlander Pointer</option>
              <option value="Smooth-Fox-Terrier">Smooth Fox Terrier</option>
              <option value="Soft-Coated-Wheaton-Terrier">Soft Coated Wheaton Terrier</option>
              <option value="Spanish-Mastiff">Spanish Mastiff</option>
              <option value="Spanish-Water-Dog">Spanish Water Dog</option>
              <option value="Spinone-Italiano">Spinone Italiano</option>
              <option value="Stabyhoun">Stabyhoun</option>
              <option value="Staffordshire-Bull-Terrier">Staffordshire Bull Terrier</option>
              <option value="Standard-Schnauzer">Standard Schnauzer</option>
              <option value="Sussex-Spaniel">Sussex Spaniel</option>
              <option value="Swedish-Lapphund">Swedish Lapphund</option>
              <option value="Swedish-Vallhund">Swedish Vallhund</option>
              <option value="Taiwan-Dog">Taiwan Dog</option>
              <option value="Teddy-Roosevelt-Terrier">Teddy Roosevelt Terrier</option>
              <option value="Thai-Ridgeback">Thai Ridgeback</option>
              <option value="Tibetan-Mastiff">Tibetan Mastiff</option>
              <option value="Tibetan-Spaniel">Tibetan Spaniel</option>
              <option value="Tibetan-Terrier">Tibetan Terrier</option>
              <option value="Tornjak">Tornjak</option>
              <option value="Tosa">Tosa</option>
              <option value="Toy-Fox-Terrier">Toy Fox Terrier</option>
              <option value="Translyvanian-Hound">Translyvanian Hound</option>
              <option value="Treeing-Tennessee-Brindle">Treeing Tennessee Brindle</option>
              <option value="Treeing-Walker-Coonhound">Treeing Walker Coonhound</option>
              <option value="Vizsla">Vizsla</option>
              <option value="Weimaraner">Weimaraner</option>
              <option value="Welsh-Springer-Spaniel">Welsh Springer Spaniel</option>
              <option value="Welsh-Terrier">Welsh Terrier</option>
              <option value="Whippet">Whippet</option>
              <option value="Wire-Fox-Terrier">Wire Fox Terrier</option>
              <option value="Wirehaired-Pointing-Griffon">Wirehaired Pointing Griffon</option>
              <option value="Wirehaired-Vizsla">Wirehaired Vizsla</option>
              <option value="Working-Kelpie">Working Kelpie</option>
              <option value="Xoloitzcuintli">Xoloitzcuintli</option>
              <option value="Yakutian-Laika">Yakutian Laika</option>
              <option value="Yorkshire-Terrier">Yorkshire Terrier</option>
            </select>
            <div className="row">
              <input type="checkbox" className="col" value="breedCheckbox"/>
              <div className="col">Show all breeds</div>
            </div>
            </div>
            <div className="mb-1">
            {/* Color */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Color
              </span>
            <textarea
              name="color"
              type="text"
              placeholder="i.e. Black with white spots"
              title="color"
              value={this.state.color}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              maxlength="64"
            />
            </div>
            <div className="mb-1">
            {/* Date of Birth */}
              <span className="input-group-text" id="inputGroup-sizing-default">
                Date of Birth
              </span>
            <input
              name="dateOfBirth"
              type="date"
              title="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
              className="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              min="1990-01-01"
              max="2030-12-31"
            />
            </div>
            <div className="mt-2 mb-5">
            {/* Submit Button */}
            <Button
              buttonType="submit"
              buttonText="Submit"
              buttonStyle="btn-primary ml-5"
              buttonTitle="Submit"
            />
            </div>
        </form>
      </div>
    );
  }
}

export default PetForm;
