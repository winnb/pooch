// React
import React from "react";
//Firebase
import Fire from "../../config/Fire.js";
// Styling
import "./styles.scss";

class FileUpload extends React.Component{

    componentDidMount() {
        const db = Fire.firestore();
        setTimeout(() => { // Show all uploaded records
            db.collection("records")
            .where("email", "==", Fire.auth().currentUser.email)
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                renderRecords(doc);
              });
            });
          }, 1750);
          function renderRecords(doc) {
              document.getElementById("record-row").innerHTML += "<img id=\"record\" alt=\"record\" className=\"mx-2\" src="+doc.data().pic+" />";
          }
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
        const db = Fire.firestore(); // Save image to database
        db.collection("records").add({
            email: Fire.auth().currentUser.email,
            pic: document.getElementById("preview").src
        });
        setTimeout(() => {
            window.location.reload();
          }, 1000);
    }

    render(){
        return( 
            <div className="mt-8 mb-8">
                <div className="trak_nav-item mb-5 ml-3" id="upload-step1"><b>↙</b> First, select the document you want</div>
                <div className="trak_nav-item" id="upload-step2">Then, click to upload <b>→</b></div>
                <div className="trak_nav-item" id="upload-step3"><b>↖</b> View your documents here</div>
                <input type="file" id="file-input" onChange={this.filePreview} />
                <img id="preview"/>
                <button id="file-upload-button" onClick={this.fileUpload}>Upload Dog Record</button>
                <div className="row" id="record-row"></div>
            </div>
        );
    }
}

export default FileUpload;