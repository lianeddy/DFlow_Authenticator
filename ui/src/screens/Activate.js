import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center } from "../components";
import { verifyAccountAction } from "../redux/actions";
import { ClipLoader } from "react-spinners";
import { Redirect } from "react-router-dom";

const Activate = () => {
  const token = window.location.pathname.split("/")[2];
  console.log(token);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyAccountAction(token));
  }, []);
  return <Center>{loading ? <ClipLoader /> : <Redirect to="/login" />}</Center>;
};

export default Activate;
