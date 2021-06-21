import React from "react";
import { useSelector } from "react-redux";
import { Center } from "../components";

const Profile = () => {
  const { auth } = useSelector((state) => state.user);

  return (
    <Center>
      <div>
        <div>email: {auth.email}</div>
        <div>password: {auth.password}</div>
        <div>id: {auth._id}</div>
      </div>
    </Center>
  );
};

export default Profile;
