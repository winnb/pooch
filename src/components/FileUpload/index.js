import React from "react";
import Card from "../Card/index";
import Axios from 'axios';

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
        Axios.post('')
    }


    render(){
        return( 
            <div className="mt-7">
                <div className="trak_heading-medium mb-5">
                    Dog Records
                </div>
                <div className="Upload mb-5">
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Upload Dog Record</button>   
                </div>
            </div>
        );
    }
}

export default FileUpload;