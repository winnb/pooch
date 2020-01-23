// React
import React from "react";

// Components
import ProfileForm from "../../components/ProfileForm";

// Animations
import Flip from "react-reveal";

const Profile = () => {
  return (
    <div>
        <Flip right>
          <ProfileForm/>
        </Flip>
    </div>
  );
};

export default Profile;
