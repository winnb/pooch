import React from "react";

const Card = props => {
  return (
    <div className="mx-7">
      <div class="card border-primary bg-bg-primary">
        <div class="card-body">
          <h5 class="card-title">{props.cardTitle}</h5>
          <p class="card-text">{props.cardContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
