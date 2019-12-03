import React from "react";
import Card from "../Card/index";
import axios from 'axios';

import fire from "../../config/Fire";

import { Link }  from  "@reach/router";

class FileUpload extends React.Component{
    state={
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHndler = () => {
        axios.post('')
    }


    render(){
        return( 
            <div className="Upload">
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload Dog Record</button>
            </div>
        );
    }
}

export default FileUpload;