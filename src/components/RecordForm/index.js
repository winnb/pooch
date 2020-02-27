import React from "react";
import Fire from "../../config/Fire.js"; // Firebase
import "./styles.scss"; // Styling
import Loader from "react-loader-spinner"; // Loader

class RecordForm extends React.Component{

    componentDidMount() {
        document.getElementById("error-message").style.display = "none";
        document.getElementById("loader").style.display = "block";
        document.getElementById("upload-loader").style.display = "none";
        const db = Fire.firestore();
        setTimeout(() => { // Show all uploaded records
            db.collection("records")
            .where("email", "==", Fire.auth().currentUser.email)
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                var newPic = document.createElement("img");
                newPic.id = "record";
                newPic.alt = "Document";
                newPic.src = doc.data().pic;
                newPic.docID = doc.id;
                newPic.addEventListener("click", ()=>{deletePopup(doc.data().pic, doc.id)});
                document.getElementById("record-row").appendChild(newPic);
              });
            });
          }, 1750);
          function deletePopup(pic, id) {
            document.getElementById("delete-record-popup").className = "fixed-top collapse.show";
            document.getElementById("delete-preview").src = pic;
            document.getElementById("delete-preview").docID = id;
          }
          setTimeout(() => {
            document.getElementById("loader").style.display = "none";
         }, 1750);
    }

    filePreview = event => {
        var input = event.target; // Get image that changed state of input element
        var reader = new FileReader();
        reader.onload = function() {
        var dataURL = reader.result;
        var output = document.getElementById('preview');
        output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]); // Show preview of image
    }

    fileUpload() {
        document.getElementById("upload-loader").style.display = "block";
        Fire.firestore().collection("records").add({ // Save image to database
            email: Fire.auth().currentUser.email,
            pic: document.getElementById("preview").src
        }).catch(error => {
            document.getElementById("error-message").style.display = "block";
          });
          setTimeout(() => { // Only reload page if no error
            document.getElementById("upload-loader").style.display = "none";
            if (document.getElementById("error-message").style.display === "none")
                window.location.reload();
        }, 2250);

    }

    deleteRecord() {
        Fire.firestore().collection("records")
        .where('email', '==', Fire.auth().currentUser.email)
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.id === document.getElementById("delete-preview").docID)
                doc.ref.delete();
        });
        });
        setTimeout(() => {
           window.location.reload();
        }, 1000);
    }

    closePopup() {
        document.getElementById("delete-record-popup").className = "fixed-top collapse";
    }

    closeError() {
        document.getElementById("error-message").style.display = "none";
    }

    render(){
        return( 
            <div className="mt-7 mb-8">
                <div className="trak_nav-item mb-4 ml-8" id="upload-step1"><b>↙</b> First, select the document you want</div>
                <div id="upload-box">
                    <input className="my-2" type="file" id="file-input" onChange={this.filePreview} />
                    <div className="my-2"><img className="record-preview" id="preview"/></div>
                    <button className="my-2" id="file-upload-button" onClick={this.fileUpload}>Upload Dog Record</button>
                    <div id="upload-loader" className="mt-4"><Loader type="TailSpin" color="black" height={75} width={75}/></div>
                </div>
                <div className="trak_nav-item mt-4 ml-7" id="upload-step2"><b>↖</b> Then, click upload</div>
                <div id="loader" className="mt-4"><Loader type="Audio" color="black" height={75} width={75}/></div>
                <div className="mt-3" id="record-row"></div>

                <div id="delete-record-popup" className="fixed-top collapse">
                    <div className="trak_nav-item">Are you sure you want to delete the current document?</div>
                    <div className="my-2"><img className="record-preview" id="delete-preview"/></div>
                    <div><button className="my-2 mr-4 btn-danger popup-button" onClick={this.deleteRecord}>Yes</button><button className="my-2 ml-4 btn-primary popup-button" onClick={this.closePopup}>No</button></div>
                    <div className="trak_body">WARNING: This is irreversable!</div>
                </div>
                <div className="fixed-top" id="error-message">
                    <div>Image size too large</div>
                    <button className="my-2 mr-4 btn-danger popup-button" onClick={this.closeError}>Close</button>
                </div>
            </div>
        );
    }
}

export default RecordForm;