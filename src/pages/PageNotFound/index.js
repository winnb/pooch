import React from "react";

const PageNotFound = () => {
  return (
    <div className="my-7">
      <div className="pooch-title my-5">Woops!</div>
      <div className="pooch-subtitle my-5">Page not found. Click the button below to go back home</div>
      <a className="pooch-navbar-item" href="/">Go Home</a>
    </div>
  );
};

export default PageNotFound;
