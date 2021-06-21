import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Center } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { logoutAction } from "../redux/actions";

const Landing = () => {
  const dispatch = useDispatch();
  const { auth, loading } = useSelector((state) => state.user);
  const renderLanding = () => {
    if (!auth._id) {
      return (
        <>
          <div className="mx-2">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mx-2">
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </div>
          <div className="mx-2">
            <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
          </div>
        </>
      );
    }
  };
  return <Center>{loading ? <ClipLoader /> : renderLanding()}</Center>;
};

export default Landing;
