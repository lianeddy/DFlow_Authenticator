import React, { useEffect, useState } from "react";
import { Center, ErrorNotification } from "../components";
import { Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { resetPasswordAction, stateResetAction } from "../redux/actions";
import { Redirect } from "react-router-dom";

const ResetPassword = () => {
  const token = window.location.pathname.split("/")[2];
  console.log(token);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { loading, redirect } = useSelector((state) => state.user);

  useEffect(() => {
    return () => dispatch(stateResetAction());
  }, []);
  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Center>
        <div className="container">
          <div className="my-2">
            <Input
              placeholder="Password"
              type="password"
              id="password"
              //   value={email}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Input
              placeholder="Confirm Password"
              type="password"
              id="confirm-password"
              //   value={password}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Button
              onClick={() =>
                password === confirm
                  ? dispatch(resetPasswordAction(password, token))
                  : ErrorNotification("Invalid password")
              }
              disabled={loading}
            >
              {loading ? <ClipLoader /> : "Register"}
            </Button>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default ResetPassword;
